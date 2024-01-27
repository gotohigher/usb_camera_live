import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import UpnlBalanceCardTemplate from '../components/UpnlBalanceCardTemplate';
import ReportPAndLCard from '../components/ReportPAndLCard';
import toast from 'react-hot-toast';
import { showNumber } from '../utils';
import UPnlChartComponent from '../components/UPnlChartComponent';

interface ApiResponse {
  status: Boolean;
  result: any[];
}

const ReportuPnLPage = () => {
  const [data, setData] = useState<string[]>([]);
  const [headerData, setHeaderData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  // const { user_id } = useSearchParams(useLocation().search);

  useEffect(() => {
    getAllPositionsData();
    fetchDashBoardHeaderData();
  }, []);

  const getAllPositionsData = async () => {
    let url = `${
      import.meta.env.VITE_SERVER_URL
    }/get_all_positions_data/?user_id=${localStorage.user_id}&password=5555`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setData(data.result);
  };

  const fetchDashBoardHeaderData = async () => {
    try {
      setLoading(true);
      let url = `${
        import.meta.env.VITE_SERVER_URL
      }/get_dashboard_header_data/?user_id=${localStorage.user_id}`;
      let response: Response = await fetch(url);
      let data = await response.json();
      if (data?.status == true) {
        setHeaderData(data?.result);
      }
    } catch (error) {
      toast.error('Data fetch failed.');
    }
    setLoading(false);
  };
  return (
    <>
      <Breadcrumb pageName="uPNL" />
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-12 gap-8 mt-3">
          <UpnlBalanceCardTemplate
            balance={showNumber(headerData?.total_cost)}
            title="Total locked"
            percent={0}
            loading={loading}
          />
          <UpnlBalanceCardTemplate
            balance={showNumber(headerData?.cost_long)}
            title="Long"
            percent={showNumber(
              (headerData?.cost_long / headerData?.total_cost) * 100,
            )}
            loading={loading}
          />
          <UpnlBalanceCardTemplate
            balance={showNumber(headerData?.cost_short)}
            title="Short"
            percent={showNumber(
              (headerData?.cost_short / headerData?.total_cost) * 100,
            )}
            loading={loading}
          />
        </div>
        <div className="grid grid-cols-12 gap-8 mt-3">
          <ReportPAndLCard data={data} headerData={headerData} />
        </div>
        <UPnlChartComponent data={data} headerData={headerData} />
      </div>
    </>
  );
};

export default ReportuPnLPage;
