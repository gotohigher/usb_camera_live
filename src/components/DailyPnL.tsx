import React, { useEffect, useMemo, useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

interface ApiResponse {
  status: boolean;
  series: number[];
  xaxis: string[];
}

const DailyPnL = (props: { user_id: number | string }) => {
  const [series, setSeries] = useState<number[]>([]);
  const [xaxis, setXaxis] = useState<string[]>([]);

  const options = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        data: xaxis,
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      series: [
        {
          data: series,
          type: 'bar',
          name: 'Usdt',
        },
      ],
    }),
    [series, xaxis],
  );
  useEffect(() => {
    getBalanceHistory();
  }, []);

  const getBalanceHistory = async () => {
    let url = `${import.meta.env.VITE_SERVER_URL}/get_daily_pnl/?user_id=${
      props.user_id
    }`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) {
      setSeries(data?.series);
      setXaxis(data?.xaxis);
    }
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Daily P&L
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="min-h-[364px]">
          <ReactEChartsCore
            echarts={echarts}
            option={options}
            notMerge={true}
            lazyUpdate={true}
            theme={'theme_name'}
            opts={{}}
            className="min-h-[364px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DailyPnL;
