import { useState, useEffect, ChangeEvent } from 'react';
import { NextIcon, PreviousIcon } from './Icons';
import moment from 'moment';
import { User } from '../pages/Form/LogsPage';
import toast from 'react-hot-toast';
import Loader from '../common/Loader';
// Assuming the structure for a data object, adjust according to your needs

interface ApiResponse {
  status: Boolean;
  result: any[];
}

function LogsTable(props: any) {
  // Define the state variables.
  const { user_id, tv_id, exchange, date, users } = props;
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10); // Default limit is set to '10'
  const [loading, setLoading] = useState<boolean>(false);
  // const [positionStatus, setPositionStatus] = useState<number>(1);
  // Fetch data from server.
  const fetchMyAPI = async () => {
    try {
      setLoading(true);
      let url = `${
        import.meta.env.VITE_SERVER_URL
      }/logs/?page=${page}&limit=${limit}&user_id=${user_id}&tv_id=${tv_id}&exchange=${exchange}&date=${date}&created_at=${date}`;
      let response: Response = await fetch(url);
      let data: ApiResponse = await response.json();
      if (data?.status == true) setData(data.result);
      else toast.error('Data fetch failed.');
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
  }, [user_id, tv_id, exchange, date]);

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
          <table className="w-full">
            <thead className="w-full">
              <tr className="w-full text-[#212529]">
                <th className="w-[10%] text-start">User</th>
                <th className="w-[5%] text-start">TV ID</th>
                <th className="w-[6%] text-start">Exchage</th>
                <th className="w-[11%] text-start">Symbol</th>
                <th className="w-[59%] text-start">Log</th>
                <th className="w-[9%] text-start">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-[#212529] ${
                      index % 2 == 0 ? 'bg-[#f2f2f2]' : 'bg-white'
                    } `}
                  >
                    <td className="p-1">
                      {item?.user_id +
                        ' - ' +
                        users?.filter(
                          (user: User) => user.id === item?.user_id,
                        )[0]?.name}
                    </td>
                    <td className="p-1">{item?.tv_id}</td>
                    <td className="p-1 text-start">{item?.exchange}</td>

                    <td className="p-1 text-start">{item?.symbol}</td>
                    <td className="p-1 text-start">{item?.log}</td>
                    <td className="p-1 text-start">
                      {moment(item?.created_at).format('YYYY-MM-DD hh:mm:ss')}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center">
            <div>
              <label>
                {(page - 1) * limit + 1} - {(page - 1) * limit + data?.length}{' '}
                of {data?.length > 0 ? data[0]?.total_logs : 0}
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
                disabled={page * limit > data[0]?.total_logs}
                className={`px-4 py-2 rounded-r text-black hover:bg-[#3c50e0] group outline-none ${
                  page * limit > data[0]?.total_logs ? 'cursor-not-allowed' : ''
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

export default LogsTable;
