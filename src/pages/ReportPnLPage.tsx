import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ReportProfitCard from '../components/ReportProfitCard';
import PnlChartTemplate from '../components/PnlChartTemplate';

interface ApiResponse {
  status: Boolean;
  result: any[];
}

const ReportPnLPage = () => {
  const [symbolType, setSymbolType] = useState<string>('');
  const [symbolList, setSymbolList] = useState<string[]>([]);
  // const { user_id } = useSearchParams(useLocation().search);

  useEffect(() => {
    getSymbolList();
  }, []);

  const getSymbolList = async () => {
    let url = `${import.meta.env.VITE_SERVER_URL}/getsymbollist/?user_id=${
      localStorage.user_id
    }`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setSymbolList(data.result);
  };

  return (
    <>
      <Breadcrumb pageName="PNL" />
      <div className="flex flex-col gap-8">
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

        <div className="grid grid-cols-12 gap-8 mt-3">
          <ReportProfitCard />
        </div>
        <PnlChartTemplate
          user_id={localStorage.user_id}
          title={'PNL Total'}
          side={''}
          symbol={symbolType}
          color={'#012970'}
        />
        <PnlChartTemplate
          user_id={localStorage.user_id}
          title={'PNL Long'}
          side={'buy'}
          symbol={symbolType}
          color={'#198754'}
        />
        <PnlChartTemplate
          user_id={localStorage.user_id}
          title={'PNL Short'}
          side={'sell'}
          symbol={symbolType}
          color={'#dc3545'}
        />
      </div>
    </>
  );
};

export default ReportPnLPage;
