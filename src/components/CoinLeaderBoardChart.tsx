import { ApexOptions } from 'apexcharts';
import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const CoinLeaderBoardChart = (props: { series: any; xaxis: any }) => {
  const { series, xaxis } = props;
  const options: ApexOptions = useMemo(
    () => ({
      series: [{ name: 'series', data: series }],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: xaxis,
    }),
    [series, xaxis],
  );

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div></div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={options?.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinLeaderBoardChart;
