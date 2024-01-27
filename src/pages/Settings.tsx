import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';
import { fetchUser } from '../utils';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [leverage, setLeverage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  let leverageSelectOpitions = [];
  for (let i = 1; i <= 25; i++) {
    leverageSelectOpitions.push({ value: `${i}x`, text: `${i}x` });
  }

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("New password doesn't match.");
        return;
      }
      setLoading(true);
      if (!localStorage?.getItem('user')) {
        toast.error("Can't find user data. Please signin again.");
        return;
      }
      let user_id = JSON.parse(localStorage?.user)?.id;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/change_password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user_id,
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        },
      );
      const data = await response.json();
      if (data?.status) {
        toast.success('Password successfully Changed.');
      } else {
        toast.error(data?.result);
      }
    } catch (error) {
      toast.error('Unexpected Error.');
      console.log('error', error);
    }
    setLoading(false);
  };
  const handleLeverageSave = async () => {
    try {
      setLoading(true);
      const user_id = JSON.parse(localStorage?.user)?.id;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/setleverage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user_id,
            leverage: Number(leverage.slice(0, -1)),
          }),
        },
      );
      const data = await response.json();
      if (data?.status) {
        toast.success('Leverage successfully Changed.');
      } else {
        toast.error(data?.result);
      }
    } catch (error) {
      toast.error('Leverage save failed.');
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      if (localStorage.role === 'user') {
        const userResponse = await fetchUser(localStorage.user_id);
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setLeverage(parsedUser.leverage + 'x');
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb pageName="Settings" />

          <div className="grid grid-cols-1 gap-9 ">
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Change Password
                  </h3>
                </div>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Password Verify
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <button
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                    onClick={handleChangePassword}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          {JSON.parse(localStorage?.user)?.username !==
            'info@tradingmachine.ai' && (
            <div className="grid grid-cols-1 gap-9 mt-4">
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Leverage Setting
                    </h3>
                  </div>
                  <div className="p-6.5">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Leverage
                      </label>
                      <select
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        onChange={(e) => {
                          setLeverage(e.target.value);
                        }}
                        value={leverage}
                      >
                        {leverageSelectOpitions.map((item, index) => (
                          <option value={item.text} key={index}>
                            {item.text}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                      onClick={handleLeverageSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Settings;
