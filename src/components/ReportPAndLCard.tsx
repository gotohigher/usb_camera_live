import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

interface ApiResponse {
  status: Boolean;
  result: any;
}

const ReportPAndLCard = (props: { data: any; headerData: any }) => {
  const { data, headerData } = props;
  const [upnl_total, setUpnl_total] = useState<number>(0);
  const [upnl_long, setUpnl_long] = useState<number>(0);
  const [upnl_short, setUpnl_short] = useState<number>(0);
  const [percentage_total, setPercentage_total] = useState<number>(0);
  const [percentage_long, setPercentage_long] = useState<number>(0);
  const [percentage_short, setPercentage_short] = useState<number>(0);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  useEffect(() => {
    if (headerData && Object.keys(headerData).length > 0 && data?.length >= 0) {
      setShowSkeleton(false);
      let upnl_total = 0;
      let upnl_long = 0;
      let upnl_short = 0;

      data.forEach((row: any) => {
        upnl_total += row.info.unrealizedPnl;
        if (row.info.info.side === 'Buy') {
          upnl_long += row.info.unrealizedPnl;
        } else {
          upnl_short += row.info.unrealizedPnl;
        }
      });

      setUpnl_total(upnl_total);
      setUpnl_long(upnl_long);
      setUpnl_short(upnl_short);

      const cost_total = headerData?.total_cost;

      const percentage_total = cost_total ? (upnl_total / cost_total) * 100 : 0;
      const percentage_long = cost_total ? (upnl_long / cost_total) * 100 : 0;
      const percentage_short = cost_total ? (upnl_short / cost_total) * 100 : 0;
      setPercentage_total(percentage_total);
      setPercentage_long(percentage_long);
      setPercentage_short(percentage_short);
    } else setShowSkeleton(true);
  }, [data, headerData]);

  const showMoney = (value: number) => {
    return value.toFixed(2);
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex flex-col">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            uP&L
          </h4>
        </div>
        <div className="w-full">
          <table className="text-[#1C2434] w-full">
            <thead className="font-bold w-full">
              <tr className="border-b border-[#dee2e6]">
                <th className="p-1 w-[30%] text-start">
                  {!showSkeleton ? '$ ' + showMoney(upnl_total) : <Skeleton />}
                </th>
                <th className="p-1 w-[30%] text-start">
                  {!showSkeleton ? (
                    showMoney(percentage_total) + '%'
                  ) : (
                    <Skeleton />
                  )}
                </th>
                <th className="p-1 w-[40%] text-start">Total </th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {!showSkeleton ? '$ ' + showMoney(upnl_long) : <Skeleton />}
                </td>
                <td className="p-1 w-[30%]">
                  {!showSkeleton ? (
                    showMoney(percentage_long) + '%'
                  ) : (
                    <Skeleton />
                  )}
                </td>
                <td className="p-1 w-[40%]">Long</td>
              </tr>
              <tr className="w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {!showSkeleton ? '$ ' + showMoney(upnl_short) : <Skeleton />}
                </td>
                <td className="p-1 w-[30%]">
                  {!showSkeleton ? (
                    showMoney(percentage_short) + '%'
                  ) : (
                    <Skeleton />
                  )}
                </td>
                <td className="p-1 w-[40%]">Short</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPAndLCard;
