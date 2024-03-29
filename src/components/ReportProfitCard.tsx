import { useEffect, useState } from 'react';
import { showNumber } from '../utils';
import Skeleton from 'react-loading-skeleton';
import toast from 'react-hot-toast';

interface ApiResponse {
  status: Boolean;
  result: any;
}

const ReportProfitCard = () => {
  const [data, setData] = useState<any>({});
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [userBalance, setuserBalance] = useState<any>({});
  useEffect(() => {
    if (Object.keys(data).length > 0 && Object.keys(userBalance).length > 0)
      setShowSkeleton(false);
  }, [data, userBalance]);
  useEffect(() => {
    getUserData();
    fetchMyAPI();
  }, []);
  const getUserData = async () => {
    try {
      let url = `${import.meta.env.VITE_SERVER_URL}/get_user_balance/?user_id=${
        localStorage.user_id
      }`;
      let response: Response = await fetch(url);
      let data = await response.json();
      if (data?.status == true) {
        setuserBalance(data?.result);
      }
    } catch (error) {
      toast.error('Data fetch failed.');
    }
  };
  const fetchMyAPI = async () => {
    let url = `${import.meta.env.VITE_SERVER_URL}/get_profits/?user_id=${
      localStorage.user_id
    }`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setData(data?.result);
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex flex-col">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Profit
          </h4>
        </div>
        <div className="w-full">
          <table className="text-[#1C2434] w-full">
            <thead className="font-bold w-full">
              <tr className="border-b border-[#dee2e6]">
                <th className="p-1 w-[30%] text-start">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' + showNumber(data?.cost_total)
                  )}
                </th>
                <th className="p-1 w-[30%] text-start">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    showNumber(
                      (data?.cost_total / userBalance?.total_balance) * 100,
                    ) + '%'
                  )}
                </th>
                <th className="p-1 w-[40%] text-start">Total </th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' + showNumber(data?.cost_long)
                  )}
                </td>
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    showNumber(
                      (data?.cost_long / userBalance?.total_balance) * 100,
                    ) + '%'
                  )}
                </td>
                <td className="p-1 w-[40%]">Long</td>
              </tr>
              <tr className="w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' + showNumber(data?.cost_short)
                  )}
                </td>
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    showNumber(
                      (data?.cost_short / userBalance?.total_balance) * 100,
                    ) + '%'
                  )}
                </td>
                <td className="p-1 w-[40%]">Short</td>
              </tr>
              <tr className="font-bold w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' + showNumber(data?.cost_avg)
                  )}
                </td>
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    showNumber(
                      (data?.cost_avg / userBalance?.total_balance) * 100,
                    ) + '%'
                  )}
                </td>
                <td className="p-1 w-[40%]">Daily Average</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportProfitCard;
