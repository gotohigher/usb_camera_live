import { ApexOptions } from 'apexcharts';
import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApiResponse {
  status: boolean;
  series: number[];
  xaxis: string[];
}
const PnlChartTemplate = (props: {
  user_id: string | number;
  title: string;
  symbol: string;
  side: string;
  color: string;
}) => {
  const [series, setSeries] = useState<number[]>([]);
  const [xaxis, setXaxis] = useState<string[]>([]);

  useEffect(() => {
    getBalanceHistory();
  }, [props.symbol]);

  const options: ApexOptions = useMemo(
    () => ({
      series: [{ name: 'USDT', data: series }],
      chart: {
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

      labels: xaxis,
      xaxis: {
        type: 'category',
      },
      legend: {
        horizontalAlign: 'right',
      },
    }),
    [series, xaxis],
  );

  const getBalanceHistory = async () => {
    let url = `${
      import.meta.env.VITE_SERVER_URL
    }/get_pnl_info/?user_id=${props?.user_id}&side=${props?.side}&symbol=${props?.symbol}`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) {
      setSeries(data?.series);
      setXaxis(data?.xaxis);
    }
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4
            className={`text-xl font-semibold dark:text-white`}
            style={{ color: props.color }}
          >
            {props.symbol + props.symbol ? '-' : '' + props?.title}
          </h4>
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={options?.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default PnlChartTemplate;
