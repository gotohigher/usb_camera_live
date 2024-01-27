import { ApexOptions } from 'apexcharts';
import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const UPnlChartComponent = (props: { data: any; headerData: any }) => {
  const { data, headerData } = props;
  const [series, setSeries] = useState<number[]>([]);
  const [xaxis, setXaxis] = useState<string[]>([]);

  const options: ApexOptions = useMemo(
    () => ({
      series: [{ name: 'uPnL', data: series }],
      chart: {
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      yaxis: {
        title: {
          text: 'USDT',
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return '' + val + ' USDT';
          },
        },
      },
      labels: xaxis,
      xaxis: {
        type: 'category',
      },
      legend: {
        horizontalAlign: 'right',
      },
      font: '12px',
    }),
    [series, xaxis],
  );

  useEffect(() => {
    if (
      data &&
      headerData &&
      data.length >= 0 &&
      Object.keys(headerData).length > 0
    ) {
      let series: number[] = [];
      let xaxis: string[] = [];

      data.forEach((value: any) => {
        series.push(value['unrealizedPnl']);
        xaxis.push(`${value['symbol']} (${value['side'] || ''})`);
      });
      setSeries(series);
      setXaxis(xaxis);
    }
  }, [data, headerData]);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          {/* <h4
            className={`text-xl font-semibold dark:text-white`}
            style={{ color: props.color }}
          >
            {props.symbol + '-' + props?.title}
          </h4> */}
        </div>
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

export default UPnlChartComponent;
