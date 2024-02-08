import { useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { getIP } from '../../utils';

const SignUp = () => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repassword, setRePassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false); //loading
	const navigate = useNavigate();

	const validateEmail = (email: string) => {
		var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	};

	const handleSignUp = async () => {
		if (
			name.trim().length > 0 &&
			email.trim().length > 0 &&
			password.trim().length > 0 &&
			repassword.trim().length > 0
		) {
			if (password !== repassword) {
				toast.error("Password doesn't match.");
				return;
			}
			if (!validateEmail(email)) {
				toast.error('Please input valid email address.');
				return;
			}
			setLoading(true);
			// const ipAddress = await getIP();
			try {
				console.log(`${import.meta.env.VITE_SERVER_URL}/auth/signup`);
				const response = await fetch(
					`${import.meta.env.VITE_SERVER_URL}/auth/signup`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							username: name,
							email: email,
							password: password,
							// ip: ipAddress || '',
						}),
					}
				);
				const data = await response.json();
				console.log('data', data);
				if (data?.status === true) {
					toast.success('Signup Success.');
					Cookies.set('token', data?.result);
					localStorage.setItem('user', JSON.stringify(data?.user));
					localStorage.setItem('user_id', data?.user?.id);
					if (email === 'info@tradingmachine.ai')
						localStorage.setItem('role', 'admin');
					else localStorage.setItem('role', 'user');
					navigate('/signin');
				} else {
					toast.error(data?.result || data?.detail);
				}
			} catch (error) {
				// toast.error(data?.result);
				console.error('Error:', error);
			}
			setLoading(false);
		} else {
			toast.error('Please input all fields.');
		}
	};

	return (
		<>
			<div className='rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark flex justify-center h-screen bg-[#f1f5f9]'>
				<div className='sm:w-fit w-full sm:p-12.5 p-12 bg-white sm:h-fit h-full my-auto mx-auto shadow-[0px_0_30px_rgba(1, 41, 112, 0.1)] rounded-md'>
					<h2 className='mb-9 text-title-lg font-bold text-black dark:text-white sm:text-title-lg'>
						Sign Up to USB Camera Live Stream
					</h2>

					<div className='mb-4'>
						<label className='mb-2.5 block font-medium text-black dark:text-white'>
							Name
						</label>
						<div className='relative'>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Enter your full name'
								className='w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
							/>

							<span className='absolute right-4 top-4'>
								<svg
									className='fill-current'
									width='22'
									height='22'
									viewBox='0 0 22 22'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<g opacity='0.5'>
										<path
											d='M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z'
											fill=''
										/>
										<path
											d='M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z'
											fill=''
										/>
									</g>
								</svg>
							</span>
						</div>
					</div>

					<div className='mb-4'>
						<label className='mb-2.5 block font-medium text-black dark:text-white'>
							Email
						</label>
						<div className='relative'>
							<input
								type='email'
								onChange={(e) => setEmail(e.target.value.toLowerCase())}
								value={email}
								placeholder='Enter your email'
								className='w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
							/>

							<span className='absolute right-4 top-4'>
								<svg
									className='fill-current'
									width='22'
									height='22'
									viewBox='0 0 22 22'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<g opacity='0.5'>
										<path
											d='M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z'
											fill=''
										/>
									</g>
								</svg>
							</span>
						</div>
					</div>

					<div className='mb-4'>
						<label className='mb-2.5 block font-medium text-black dark:text-white'>
							Password
						</label>
						<div className='relative'>
							<input
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Enter your password'
								className='w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
							/>

							<span className='absolute right-4 top-4'>
								<svg
									className='fill-current'
									width='22'
									height='22'
									viewBox='0 0 22 22'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<g opacity='0.5'>
										<path
											d='M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z'
											fill=''
										/>
										<path
											d='M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z'
											fill=''
										/>
									</g>
								</svg>
							</span>
						</div>
					</div>

					<div className='mb-6'>
						<label className='mb-2.5 block font-medium text-black dark:text-white'>
							Re-type Password
						</label>
						<div className='relative'>
							<input
								type='password'
								value={repassword}
								onKeyDown={(e) => {
									if (e.key === 'Enter') handleSignUp();
								}}
								onChange={(e) => setRePassword(e.target.value)}
								placeholder='Re-enter your password'
								className='w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
							/>

							<span className='absolute right-4 top-4'>
								<svg
									className='fill-current'
									width='22'
									height='22'
									viewBox='0 0 22 22'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<g opacity='0.5'>
										<path
											d='M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z'
											fill=''
										/>
										<path
											d='M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z'
											fill=''
										/>
									</g>
								</svg>
							</span>
						</div>
					</div>

					<div className='mb-5'>
						<button
							onClick={handleSignUp}
							value=''
							className='w-full flex justify-center cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90'>
							Create account
							{loading && (
								<svg
									width='20'
									height='20'
									fill='currentColor'
									className='mt-1 ml-1 animate-spin'
									viewBox='0 0 1792 1792'
									xmlns='http://www.w3.org/2000/svg'>
									<path d='M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z'></path>
								</svg>
							)}
						</button>
					</div>

					<div className='mt-6 text-center'>
						<p>
							Already have an account?{' '}
							<Link
								to='/signin'
								className='text-primary'>
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
