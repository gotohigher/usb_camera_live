import { ApexOptions } from 'apexcharts';
import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Breadcrumb from '../components/Breadcrumb';

interface ApiResponse {
  status: boolean;
  series: number[];
  xaxis: string[];
}
const ReportBalancePage = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [xaxis, setXaxis] = useState<string[]>([]);

  const options: ApexOptions = useMemo(
    () => ({
      series: [{ name: 'USDT', data: series }],
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      subtitle: {
        text: 'Balance',
        align: 'left',
      },
      labels: xaxis,
      xaxis: {
        type: 'category',
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: 'left',
      },
    }),
    [series, xaxis],
  );

  useEffect(() => {
    getBalanceHistory();
  }, []);

  const getBalanceHistory = async () => {
    let url = `${import.meta.env.VITE_SERVER_URL}/balance_history/?user_id=${
      localStorage.user_id
    }`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) {
      setSeries(data?.series);
      setXaxis(data?.xaxis);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Balance" />

      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
        <div className="mb-4 justify-between gap-4 sm:flex">
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Balance
            </h4>
          </div>
        </div>
        <div>
          <div id="chartOne" className="-ml-5">
            <ReactApexChart
              options={options}
              series={options?.series}
              type="area"
              height={350}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportBalancePage;
