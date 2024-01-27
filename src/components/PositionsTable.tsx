import { useState, useEffect, ChangeEvent } from 'react';
import { NextIcon, PreviousIcon } from './Icons';
import moment from 'moment';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';
// Assuming the structure for a data object, adjust according to your needs

interface ApiResponse {
  status: Boolean;
  result: any[];
}

function PositionsTable(props: any) {
  // Define the state variables.
  const { user_id, positionStatus, symbolType } = props;
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10); // Default limit is set to '10'
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMyAPI = async () => {
    try {
      setLoading(true);
      let url = `${
        import.meta.env.VITE_SERVER_URL
      }/positions/?page=${page}&limit=${limit}&user_id=${user_id}&status=${positionStatus}&symbol=${symbolType}`;
      let response: Response = await fetch(url);
      let data: ApiResponse = await response.json();
      if (data?.status == true) {
        setData(data.result);
      } else toast.error('Data fetch failed.');
    } catch (error) {
      toast.error('Data fetch failed.');
    }
    setLoading(false);
  };

  // useEffect to Handle page and limit change.
  useEffect(() => {
    fetchMyAPI();
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
    setLimit(10);
    fetchMyAPI();
  }, [positionStatus, user_id, symbolType]);

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

  const handPositionClose = async (positionIdx: number, tv_id: string) => {
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/close_position`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: positionIdx,
          tv_id: tv_id,
          password: '5555',
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (data?.status) {
            toast.success('Position Closed.');
            fetchMyAPI();
            return;
          }
        })
        .catch((err) => {
          toast.error('Position close failed.');
        });
      toast.success('Position Close is in processing.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Position close failed.');
    }
    try {
    } catch (error) {}
  };

  return (
    <div className="overflow-x-auto lg:overflow-x-hidden">
      {loading ? (
        <Loader />
      ) : (
        <>
          <table className="w-full text-sm lg:text-base">
            <thead className="w-full">
              <tr className="w-full text-[#212529]">
                <th className="w-[3%] text-start">ID</th>
                <th className="w-[12%] text-start">Symbol</th>
                <th className="w-[3%] text-center">Side</th>
                <th className="w-[8%] text-end">Amount</th>
                <th className="w-[8%] text-end">Order Value</th>
                <th className="w-[8%] text-end">Open Price</th>
                <th className="w-[8%] text-end">Close Price</th>
                <th className="w-[8%] text-end">Profit USDT</th>
                <th className="w-[8%] text-end">Profit %</th>
                <th className="w-[10%] text-center">Status</th>
                <th className="w-[12%] text-center">Open Date</th>
                <th className="w-[12%]">Close Date</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-[#212529] ${
                      index % 2 == 0 ? 'bg-[#f2f2f2]' : 'bg-white'
                    } `}
                  >
                    <td className="p-1">{item?.tv_id}</td>
                    <td className="p-1 text-start">
                      <a
                        href={`/dashboard/user_id=${item?.symbol}`}
                        className="text-[#717FF5]"
                      >
                        {item?.symbol}
                      </a>
                    </td>
                    <td className="p-1 text-center">
                      {item?.open_side == 'buy' ? (
                        <span className="bg-[#198754] rounded-[4px] px-1 text-white w-fit text-[12px] font-semibold leading-[17px]">
                          Long
                        </span>
                      ) : (
                        <span className="bg-[#dc3545] rounded-[4px] px-1 text-white w-fit text-[12px] font-semibold leading-[17px]">
                          Short
                        </span>
                      )}
                    </td>
                    <td className="p-1 text-end">
                      {item?.open_amount?.toFixed(2)}
                    </td>
                    <td className="p-1 text-end">
                      {item?.open_cost?.toFixed(2)}
                    </td>
                    <td className="p-1 text-end">
                      {item?.open_price?.toFixed(2)}
                    </td>
                    <td className="p-1 text-end">
                      {item?.close_price?.toFixed(2)}
                    </td>

                    <td className="p-1 text-end">
                      {item?.profit_net_usdt?.toFixed(2)}
                    </td>
                    <td className="p-1 text-end">
                      {item?.profit_percentage?.toFixed(2)}
                    </td>

                    <td className="p-1 text-center flex flex-col text-black gap-2">
                      {item?.status === 1
                        ? 'Open'
                        : item?.status === 5
                          ? 'Opening'
                          : item?.status === 2
                            ? 'Closing'
                            : 'Closed'}
                      {item?.status === 1 && (
                        <button
                          onClick={() =>
                            handPositionClose(item?.id, item?.tv_id)
                          }
                          className="bg-[#dc3545] rounded-[4px] py-1 text-[13px] hover:bg-[#ee6573] text-white font-medium p-1"
                        >
                          Close Position
                        </button>
                      )}
                    </td>
                    <td className="py-1 text-nowrap text-center">
                      {moment(item?.open_created_at).format(
                        'hh:mm:ss M/DD/YYYY',
                      )}
                    </td>
                    <td className="py-1 text-nowrap text-center">
                      {item?.close_created_at
                        ? moment(item?.close_created_at).format(
                            'hh:mm:ss M/DD/YYYY',
                          )
                        : ''}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center">
            <div>
              <label>
                {(page - 1) * limit + 1} - {(page - 1) * limit + data?.length}{' '}
                of {data?.length > 0 ? data[0]?.total_positions : 0}
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
                disabled={page * limit > data[0]?.total_positions}
                className={`px-4 py-2 rounded-r text-black hover:bg-[#3c50e0] group outline-none ${
                  page * limit > data[0]?.total_positions
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

export default PositionsTable;
