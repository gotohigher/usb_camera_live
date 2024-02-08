import { useEffect, useState } from 'react';
import LeftPanel from '../../components/LeftPanel';
import RightPanel from '../../components/RightPanel';

const Dashboard = () => {
	const [device, setDevice] = useState('');
	const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
	const [chunks, setChunks] = useState<Blob[]>([]);
	const [videoUri, setVideoUri] = useState('');
	const [startFlag, setStartFlag] = useState(false);
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
	const [pbFlag, setPbFlag] = useState(false);

	useEffect(() => {
		const getDevices = async () => {
			try {
				let deviceId;
				const devices = await navigator.mediaDevices.enumerateDevices();
				devices.forEach((deviceInfo) => {
					if (deviceInfo.kind === 'videoinput') {
						setDevice(deviceInfo.deviceId);
						deviceId = deviceInfo.deviceId;
						console.log(deviceInfo.deviceId);
					}
				});
				const constraints: MediaStreamConstraints = {
					audio: true,
					video: {
						// width: { min: 1024, ideal: 1280 },
						// height: { min: 576, ideal: 720 },
						deviceId: {
							exact: deviceId,
						},
					},
				};
				const stream = await navigator.mediaDevices.getUserMedia(constraints);
				const videoPlay = document.querySelector('video') as HTMLVideoElement;
				videoPlay.srcObject = stream;
				setMediaStream(stream);
				videoPlay.onloadedmetadata = () => {
					videoPlay.play();
				};
				// Handle the devices here
			} catch (error) {
				// Handle any errors that occurred during enumeration
				console.error('Error enumerating devices:', error);
			}
		};
		getDevices();
	}, []);

	useEffect(() => {
		if (device && startFlag) startRecord();
		else stopRecord();
	}, [startFlag]);

	useEffect(() => {
		const videoPlay = document.querySelector('video') as HTMLVideoElement;
		if (pbFlag) {
			videoPlay.srcObject = null;
			console.log('video uri', videoUri);
		} else {
			videoPlay.srcObject = mediaStream;
		}
	}, [pbFlag]);

	useEffect(() => {
		if (recorder) {
			console.log('video play');
			recorder.ondataavailable = (event: BlobEvent) => {
				console.log('size ', event.data.size);
				const newChunks = [...chunks, event.data];
				setChunks(newChunks);
				console.log(newChunks);
				const blob = new Blob(newChunks, { type: 'video/mp4' });
				const videoUrl = URL.createObjectURL(blob);
				setVideoUri(videoUrl);
				// console.log('videoUrl', videoUrl);
			};
		}
		recorder?.start();
	}, [recorder]);

	const startRecord = async () => {
		if (mediaStream) {
			setChunks([]);
			let newRecorder = new MediaRecorder(mediaStream);
			setRecorder(newRecorder);
		}
	};

	const stopRecord = async () => {
		if (recorder) {
			console.log('stop');
			recorder.stop();
			mediaStream?.getTracks()[0].stop();
		}
	};

	return (
		<>
			<div className='grid grid-cols-10 gap-3.5 w-full h-full'>
				<div className='col-span-2 h-full w-full'>
					<LeftPanel
						setStartFlag={setStartFlag}
						startFlag={startFlag}
						pbFlag={pbFlag}
						setPbFlag={setPbFlag}
					/>
				</div>
				<div className='col-span-6 h-full w-full rounded-lg bg-white'>
					{!pbFlag ? (
						<video className='w-full h-full' />
					) : (
						<video
							className='w-full h-full'
							controls>
							<source
								src={videoUri}
								type='video/mp4'
							/>
						</video>
					)}
					{/* <canvas className='w-full h-full' /> */}
				</div>
				<div className='col-span-2 h-full w-full '>
					<RightPanel />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
