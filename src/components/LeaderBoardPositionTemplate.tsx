import { useState, useEffect, ChangeEvent } from 'react';
import { NextIcon, PreviousIcon } from './Icons';
import moment from 'moment';
import { User } from '../pages/Form/LogsPage';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';
import { showNumber } from '../utils';
// Assuming the structure for a data object, adjust according to your needs

interface ApiResponse {
  status: Boolean;
  result: any[];
}

function LeaderBoardPositionTemplate(props: { side: string }) {
  // Define the state variables.
  const { side } = props;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getSymbbolRank();
  }, [side]);

  const getSymbbolRank = async () => {
    try {
      setLoading(true);
      let url = `${import.meta.env.VITE_SERVER_URL}/get_symbol_rank/?side=${
        side === 'Long' ? 'buy' : side === 'Short' ? 'sell' : ''
      }&user_id=${localStorage.user_id}`;
      let response: Response = await fetch(url);
      let data: ApiResponse = await response.json();
      if (data?.status == true) setData(data.result);
      else toast.error('Data fetch failed.');
    } catch (error) {
      toast.error('Data fetch failed.');
    }
    setLoading(false);
  };

  return (
    <div className="lg:overflow-x-hidden overflow-x-auto">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-4 rounded-lg bg-white">
          <span
            className={`text-[18px] py-3 font-bold ${
              side === 'Long'
                ? 'text-[#198754]'
                : side === 'Short'
                  ? 'text-[#dc3545]'
                  : 'text-black'
            }`}
          >
            {!side ? 'Total' : side + ' Positions'}
          </span>
          <table className="w-full mt-4">
            <thead className="w-full">
              <tr className="w-full text-[#212529]">
                <th className="w-[20%] text-start">Rank</th>
                <th className="w-[60%] text-start">Symbol</th>
                <th className="w-[20%] text-end">Profit Usdt</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className={`text-[#212529] ${
                      index % 2 == 0 ? 'bg-[#f2f2f2]' : 'bg-white'
                    } `}
                  >
                    <td className="p-1 text-start">{index + 1}</td>
                    <td className="p-1 text-start">{item?.symbol}</td>
                    <td className="p-1 text-end">
                      {showNumber(item?.profit) || ''}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LeaderBoardPositionTemplate;
