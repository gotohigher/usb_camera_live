import { useEffect, useState } from 'react';

const RightPanel = () => {
<<<<<<< HEAD
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	useEffect(() => {
		let user = localStorage.getItem('user');
		let pass = localStorage.getItem('password');
		if (user && pass) {
			setUsername(user);
			setPassword(pass);
		}
	}, []);

	return (
		<div className='left-panel w-full h-full flex flex-col justify-start items-center bg-[#98a8e2] rounded-lg'>
			<div className='w-full h-fit px-4 py-4 flex gap-4 bg-[#FF9505] rounded-t-lg'>
				<span className='text-[18px] font-semibold text-white  text-center mx-auto w-full break-words'>
					CID: cbca1789562bd5bbb6b9eac5aee700825ccc9bedd99202e09426f2f950ed75dc
				</span>
			</div>
			<div className='w-full h-fit px-4 py-4 flex p-4  justify-center'>
				<button className='bg-[#FF9505] rounded-lg px-4 py-3 text-white font-semibold hover:bg-[#fdb95b]'>
					Live Stream Code
				</button>
			</div>
			<div className='w-full h-fit px-4 py-4 flex hover:cursor-pointer border gap-4 border-[#98a8e2] flex-col'>
				<span className='text-4xl font-semibold text-white'>Username</span>
				<input
					type='text'
					className='w-full px-2 py-1 bg-black text-white text-13px font-normal text-end outline-none rounded-[6px]'
					value={username}
					onChange={(e) => setUsername(e.target.value)}></input>
			</div>
			<div className='w-full h-fit px-4 py-4 flex hover:cursor-pointer border gap-4 rounded-b-lg border-[#98a8e2] flex-col'>
				<span className='text-4xl font-semibold text-white'>Password</span>
				<input
					// type='password'
					className='w-full px-2 py-1 bg-black text-white text-13px font-normal text-end outline-none rounded-[6px]'
					value={password}
					onChange={(e) => setPassword(e.target.value)}></input>
			</div>
		</div>
	);
=======
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="left-panel w-full h-full flex flex-col justify-start items-center bg-[#98a8e2] rounded-lg">
      <div className="w-full h-fit px-4 py-4 flex gap-4 bg-[#FF9505] rounded-t-lg">
        <span className="text-[18px] font-semibold text-white whitespace-nowrap text-center mx-auto">
          CID: 361251608235792
        </span>
      </div>
      <div className="w-full h-fit px-4 py-4 flex p-4  justify-center">
        <button className="bg-[#FF9505] rounded-lg px-4 py-3 text-white font-semibold hover:bg-[#fdb95b]">
          Live Stream Code
        </button>
      </div>
      <div className="w-full h-fit px-4 py-4 flex hover:cursor-pointer border gap-4 border-[#98a8e2] flex-col">
        <span className="font-semibold text-white 2xl:text-4xl md:text-xl text-lg">
          Username
        </span>
        <input
          type="text"
          className="w-full px-2 py-1 bg-black text-white text-13px font-normal text-end outline-none rounded-[6px]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div className="w-full h-fit px-4 py-4 flex hover:cursor-pointer border gap-4 rounded-b-lg border-[#98a8e2] flex-col">
        <span className="font-semibold text-white 2xl:text-4xl md:text-xl text-lg">
          Password
        </span>
        <input
          type="password"
          className="w-full px-2 py-1 bg-black text-white text-13px font-normal text-end outline-none rounded-[6px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
    </div>
  );
>>>>>>> 127ea978e88c751b266d43755e316d95ba37b365
};
export default RightPanel;
