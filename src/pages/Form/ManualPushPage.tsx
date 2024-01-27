import { ChangeEvent, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import toast from 'react-hot-toast';

interface User {
  id: number;
  name: string;
  balance: number;
}

interface ApiResponse {
  status: boolean;
  result: User[];
}

const ManualPushPage = () => {
  const [status, setStatus] = useState<boolean>(false);
  const [pushValue, setPushValue] = useState<string>(`{
    "id": "1L",
    "exchange": "bybit",
    "password": "5555",
    "action": "buy",
    "market_position": "long",
    "symbol": "BTC/USDT:USDT",
    "qty": "3",
    "tp": 3
    }`);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [balancedUsers, setBalancedUsers] = useState<User[]>([]);

  const getBalancedUsersList = async () => {
    let url = `${import.meta.env.VITE_SERVER_URL}/getbalancedusers`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setBalancedUsers(data.result);
  };

  useEffect(() => {
    getBalancedUsersList();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    );
    setSelectedUsers(selectedValues);
  };

  const handlePushPositions = async () => {
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/manual_push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: JSON.parse(pushValue),
          users: selectedUsers,
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (data?.status) {
            toast.success('Positions pushed.');
            return;
          }
        })
        .catch((err) => {
          toast.error('Push position failed.');
        });
      toast.success('Manual push is in processing.');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Manual Push" />

      <div className="grid grid-cols-1 gap-8 mt-3">
        <div className="flex flex-col gap-9">
          <div className="grid grid-cols-2 gap-5 text-black">
            <textarea
              className="w-full col-span-2 md:col-span-1 h-[350px] outline-none p-4"
              value={pushValue}
              onChange={(e) => setPushValue(e.target.value)}
            ></textarea>
            <select
              multiple
              onChange={handleChange}
              className="w-full col-span-2 min-h-[290px] md:col-span-1 appearance-none bg-blend-multiply overflow-auto   bg-white rounded border border-stroke bg-transparent py-1 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            >
              {balancedUsers &&
                balancedUsers?.map((user, index) => (
                  <option value={user?.id} key={index}>
                    {user?.id + ' : ' + user?.name + ' $' + user?.balance}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="flex px-3 justify-center rounded bg-primary sm:w-fit py-2 w-full font-medium text-gray"
            onClick={handlePushPositions}
          >
            Push
          </button>
        </div>
      </div>
    </>
  );
};

export default ManualPushPage;
