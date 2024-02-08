import toast from 'react-hot-toast';
import {
	CameraIcon,
	ControlIcon,
	DimIcon,
	RecordIcon,
	PlayBackIcon,
} from './Icons';
interface LeftPanelProps {
	setStartFlag: (flag: boolean) => void;
	setPbFlag: (flag: boolean) => void;
	startFlag: boolean;
	pbFlag: boolean;
}

const LeftPanel = (props: LeftPanelProps) => {
	const toggleStartFlag = () => {
		if (!props.startFlag) toast.success('Record started.');
		else toast.success('Record stopped.');
		props.setStartFlag(!props.startFlag);
	};

	const togglePlayBack = () => {
    if(!props.pbFlag) toast.success('play start');
		props.setPbFlag(!props.pbFlag);
	};

	return (
		<div className='left-panel w-full h-full flex flex-col justify-start items-center bg-[#98a8e2] rounded-lg'>
			<div className='w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white text-white gap-4 rounded-t-lg'>
				<DimIcon />
				<span className='text-4xl font-semibold'>Dim</span>
			</div>
			<div
				className='w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white gap-4 text-white'
				onClick={toggleStartFlag}>
				<RecordIcon />
				<span className='text-4xl font-semibold'>
					{!props.startFlag ? 'Record' : 'Stop'}
				</span>
			</div>
			<div className='w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white gap-4 text-white'>
				<CameraIcon />
				<span className='text-4xl font-semibold'>Capture</span>
			</div>
			<div
				className='w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white gap-4 text-white'
				onClick={togglePlayBack}>
				<PlayBackIcon />
				<span className='text-4xl font-semibold'>
					{props.pbFlag ? 'Back' : 'Play'}
				</span>
			</div>
			<div className='w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white gap-4 text-white rounded-b-lg'>
				<ControlIcon />
				<span className='text-4xl font-semibold'>Param</span>
			</div>
		</div>
	);
};
export default LeftPanel;
