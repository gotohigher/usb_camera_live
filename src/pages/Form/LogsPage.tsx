import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import LogsTable from '../../components/LogsTable';
import moment from 'moment';

interface TvID {
  tv_id: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

interface Exchange {
  id: number;
  name: string;
  created_at: string;
  status: number;
}

interface FilterOptions {
  users: User[];
  tv_ids: TvID[];
  exchanges: Exchange[];
}

interface ApiResponse {
  status: boolean;
  result: FilterOptions;
}

const LogsPage = () => {
  const [user_id, setUserId] = useState<string>('');
  const [tv_id, setTvId] = useState<string>('');
  const [exchange, setExchange] = useState<string>('');
  const [data, setData] = useState<FilterOptions>();
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    getFilterOptions();
  }, []);

  const getFilterOptions = async () => {
    let url = `${import.meta.env.VITE_SERVER_URL}/getlogsfilteroption`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setData(data.result);
  };
  return (
    <>
      <Breadcrumb pageName="Logs" />
      <div className="flex gap-3">
        <select
          className="appearance-none w-[20%] bg-white rounded border border-stroke bg-transparent py-1 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">All</option>
          {data &&
            data?.users?.map((item, index) => (
              <option value={item?.id} key={index}>
                {item?.name + ' (' + item?.email + ')'}
              </option>
            ))}
        </select>
        <select
          className="appearance-none w-[20%] bg-white rounded border border-stroke bg-transparent py-1 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          onChange={(e) => setTvId(e.target.value)}
        >
          <option value="">All TV IDS</option>
          {data &&
            data?.tv_ids?.map((item, index) => (
              <option value={item?.tv_id} key={index}>
                {item?.tv_id}
              </option>
            ))}
        </select>
        <select
          className="appearance-none w-[20%] bg-white rounded border border-stroke bg-transparent py-1 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          onChange={(e) => setExchange(e.target.value)}
        >
          <option value="">All Exchanges</option>
          {data &&
            data?.exchanges?.map((item, index) => (
              <option value={item?.name} key={index}>
                {item?.name}
              </option>
            ))}
        </select>
        <input
          type="date"
          className="appearance-none w-[20%] bg-white rounded border border-stroke bg-transparent py-1 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
          placeholder="Date"
          onChange={(e) => setDate(moment(e.target.value).format('M/DD/YYYY'))}
        />
      </div>
      <div className="grid grid-cols-1 gap-8 mt-3">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Logs</h3>
            </div>
            <div className="p-[26px]">
              <LogsTable
                user_id={user_id}
                tv_id={tv_id}
                exchange={exchange}
                date={date}
                users={data?.users}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogsPage;
