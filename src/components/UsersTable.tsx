import { number } from 'echarts';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { NextIcon, PreviousIcon } from './Icons';
import moment from 'moment';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';
import axios from 'axios';
// Assuming the structure for a data object, adjust according to your needs
interface Data {
  id: number;
  column2: string;
  column3: string;
}

interface ApiResponse {
  status: Boolean;
  result: any[];
}

function UsersTable(props: any) {
  const { filterEmail } = props;
  // Define the state variables.
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10); // Default limit is set to '10'
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data from server.
  const fetchMyAPI = async () => {
    try {
      setLoading(true);
      let url = `${
        import.meta.env.VITE_SERVER_URL
      }/getusers/?page=${page}&limit=${limit}&email=${filterEmail}`;
      let response: Response = await fetch(url);
      let data: ApiResponse = await response.json();
      if (data?.status == true) setData(data.result);
      else toast.error('Data fetch failed.');
    } catch (error) {
      toast.error('Data fetch failed.');
    }
    setLoading(false);
  };

  const updateUserStatus = async (user_id: number, status: number) => {
    try {
      const response: any = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/update_user_status/`,
        {
          user_id: user_id, // replace with actual user_id
          status: status, // replace with actual status
        },
      );
      if (response?.data?.status === true) {
        toast.success('Successfully changed.');
        fetchMyAPI();
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  const deleteUser = async (user_id: number) => {
    try {
      const response: any = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/delete_user/`,
        {
          data: { user_id: user_id }, // replace with actual user_id
        },
      );
      if (response?.data?.status === true) {
        toast.success('Successfully deleted.');
        fetchMyAPI();
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // useEffect to Handle page and limit change.
  useEffect(() => {
    fetchMyAPI();
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
    setLimit(10);
    fetchMyAPI();
  }, [filterEmail]);

  // When the page is changed.
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  return (
    <div className="lg:overflow-x-hidden overflow-x-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <table className="w-full text-sm lg:text-base">
            <thead className="w-full">
              <tr className="w-full text-[#212529]">
                <th className="w-[4%] text-start">ID</th>
                <th className="w-[16%] text-start">Email</th>
                <th className="w-[16%] text-start">Name</th>
                <th className="w-[7%] text-center">API</th>
                <th className="w-[10%] text-end">Free</th>
                <th className="w-[10%] text-end">Used</th>
                <th className="w-[10%] text-end">Total USDt</th>
                <th className="w-[15%] text-center">Created At</th>
                <th className="w-[12%]">Manage</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-[#212529]   ${
                      index % 2 == 0 ? 'bg-[#f2f2f2]' : 'bg-white'
                    } `}
                  >
                    <td className="p-1">{item?.id}</td>
                    <td className="p-1 text-start flex flex-col gap-1">
                      <a
                        href={`/dashboard/?user_id=${item?.id}`}
                        className="text-[#717FF5]"
                      >
                        {item?.email}
                      </a>
                      {item?.email_verified == 1 ? (
                        <span className="bg-[#198754] rounded-[4px] px-1 text-white w-fit text-[12px] font-semibold leading-[17px]">
                          Email Verified
                        </span>
                      ) : (
                        <span className="bg-[#dc3545] rounded-[4px] px-1 text-white w-fit text-[12px] font-semibold leading-[17px]">
                          Email Not Verified
                        </span>
                      )}
                    </td>
                    <td className="p-1 text-start">{item?.name}</td>
                    <td className="p-1 text-center">
                      {item?.exchange || 'Not Set'}
                    </td>
                    <td className="p-1 text-end">
                      {item?.balance?.toFixed(2)}
                    </td>
                    <td className="p-1 text-end">
                      {(item?.balance_used + item?.balance)?.toFixed(2)}
                    </td>
                    <td className="p-1 text-end">
                      {item?.balance_used?.toFixed(2)}
                    </td>
                    <td className="p-1 text-center">
                      {moment(item?.created_at).format('YYYY-MM-DD')}
                    </td>
                    <td className="p-1 text-center flex flex-col text-white gap-2">
                      {item?.status === 1 ? (
                        <button
                          onClick={() => updateUserStatus(item?.id, 2)}
                          className="bg-[#ff6600] rounded-[4px] py-1 px-1"
                        >
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={() => updateUserStatus(item?.id, 1)}
                          className="bg-[#198754] rounded-[4px] py-1 px-1"
                        >
                          Active
                        </button>
                      )}
                      <a
                        href={`/dashboard/?user_id=${item?.id}`}
                        target="_blank"
                        className="bg-[#0D6EFD] rounded-[4px] py-1 px-1"
                      >
                        Stats Dashboard
                      </a>
                      <a
                        href={`/positions/?user_id=${item?.id}`}
                        className="bg-[#FFC107] rounded-[4px] py-1 px-1"
                      >
                        Positions
                      </a>
                      <button
                        onClick={() => deleteUser(item?.id)}
                        className="bg-[#dc3545] rounded-[4px] py-1 px-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center">
            <div>
              <label>
                {(page - 1) * limit + 1} - {(page - 1) * limit + data?.length}{' '}
                of
                {data?.length > 0 ? data[0]?.total_users : 0}
              </label>{' '}
              <label>Items per page</label>
              <select
                value={limit}
                onChange={handleLimitChange}
                className="ml-2 outline-none"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
            <div className="flex items-center">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={`px-4 py-2 rounded-l text-black hover:bg-[#3c50e0] group outline-none ${
                  page === 1 ? 'cursor-not-allowed' : ''
                }`}
              >
                <PreviousIcon />
              </button>
              <span className="p-3 bg-white">{page}</span>
              <button
                onClick={nextPage}
                disabled={page * limit > data[0]?.total_users}
                className={`px-4 py-2 rounded-r text-black hover:bg-[#3c50e0] group outline-none ${
                  page * limit > data[0]?.total_users
                    ? 'cursor-not-allowed'
                    : ''
                }`}
              >
                <NextIcon />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UsersTable;
