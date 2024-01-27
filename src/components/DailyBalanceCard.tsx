import React, { useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from './Icons';

interface ApiResponse {
  status: boolean;
  result: any[];
}

const DailyBalanceCard = (props: { user_id: number | string }) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    getBalanceHistory();
  }, []);

  const getBalanceHistory = async () => {
    let url = `${import.meta.env.VITE_SERVER_URL}/get_balance_pnl/?user_id=${
      props.user_id
    }`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setData(data?.result);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Daily Balance & P&L
          </h4>
        </div>
      </div>
      <div className="w-full lg:overflow-x-hidden overflow-x-auto">
        <table className="w-full">
          <thead className="w-full text-[#212529] font-bold p-1">
            <tr>
              <th className="w-[18%] p-1 ">Coin</th>
              <th className="w-[18%] p-1 text-end">Balance</th>
              <th className="w-[18%] p-1 text-end">PnL</th>
              <th className="w-[18%] p-1 text-end">PnL%</th>
              <th className="w-[28%] p-1 text-end">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr
                  className={`text-black border-b border-[#dfc2c4] ${
                    row?.profit < 0 ? 'bg-[#f8d7da]' : 'bg-[#d1e7dd]'
                  }`}
                  key={index}
                >
                  <td className="w-[18%] p-1 text-start flex flex-row">
                    <div className="my-auto">
                      {row?.profit < 0 ? <ArrowDownIcon /> : <ArrowUpIcon />}
                    </div>
                    <span>USDT</span>
                  </td>
                  <td className="w-[18%] p-1 text-end">{row?.balance}</td>
                  <td className="w-[18%] p-1 text-end">
                    {row?.profit?.toFixed(2) || '0.00'}
                  </td>
                  <td className="w-[18%] p-1 text-end">
                    {((row?.profit / row?.balance) * 100).toFixed(2)}%
                  </td>
                  <td className="w-[28%] p-1 text-end">{row?.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyBalanceCard;
