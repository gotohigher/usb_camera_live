import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import PositionsTable from '../../components/PositionsTable';
import { useLocation } from 'react-router-dom';

enum PositionType {
  open = 1,
  close = 2,
}
enum BreadcrumbType {
  open = 'Open Positions Sys',
  close = 'Closed Positions Sys',
}
interface ApiResponse {
  status: Boolean;
  result: any[];
}

const PositionsPage = () => {
  const [breadCrumb, setBreadCrumb] = useState<string>('Open Positions Sys');
  const [positionStatus, setPositionStatus] = useState<number>(1);
  const [symbolType, setSymbolType] = useState<string>('');
  const [symbolList, setSymbolList] = useState<string[]>([]);
  const query = new URLSearchParams(useLocation().search);
  const user_id = query.get('user_id');
  // const { user_id } = useSearchParams(useLocation().search);
  const userIdWithDefault =
    localStorage.role === 'user' ? localStorage.user_id : user_id ?? 0;

  useEffect(() => {
    getSymbolList();
  }, []);

  const getSymbolList = async () => {
    let url = `${
      import.meta.env.VITE_SERVER_URL
    }/getsymbollist/?user_id=${userIdWithDefault}`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setSymbolList(data.result);
  };
  const handleChangePositionType = (positionStatus: number) => {
    if (positionStatus == PositionType.open) {
      setPositionStatus(PositionType.open);
      setBreadCrumb(BreadcrumbType.open);
    } else if (positionStatus == PositionType.close) {
      setBreadCrumb(BreadcrumbType.close);
      setPositionStatus(PositionType.close);
    }
  };
  return (
    <>
      <Breadcrumb
        pageName={
          localStorage.role === 'user'
            ? breadCrumb.replace(' Sys', '')
            : breadCrumb
        }
      />
      <select
        className="appearance-none w-[300px] bg-white rounded border border-stroke bg-transparent py-1 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
        onChange={(e) => {
          setSymbolType(e.target.value);
        }}
      >
        <option value="">All</option>
        {symbolList &&
          symbolList.map((item: any, index: number) => (
            <option value={item?.symbol} key={index}>
              {item?.symbol}
            </option>
          ))}
      </select>
      <div className="grid grid-cols-1 gap-8 mt-3">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-col gap-2">
              <h3 className="font-medium text-black dark:text-white">
                {breadCrumb.replace(' Sys', '')}
              </h3>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => handleChangePositionType(PositionType.open)}
                  className="bg-[#157347] rounded-[4px] py-1 px-2 hover:bg-[#4ea57c] text-white font-medium"
                >
                  Open Position
                </button>{' '}
                <button
                  onClick={() => handleChangePositionType(PositionType.close)}
                  className="bg-[#dc3545] rounded-[4px] py-1 px-2 hover:bg-[#ee6573] text-white font-medium"
                >
                  Closed Position
                </button>
              </div>
            </div>
            <div className="p-[26px]">
              <PositionsTable
                changeBreadCrumb={(changedBread: string) =>
                  setBreadCrumb(changedBread)
                }
                user_id={userIdWithDefault}
                positionStatus={positionStatus}
                symbolType={symbolType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PositionsPage;
