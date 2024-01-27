import { useEffect, useState } from 'react';
import { showNumber } from '../utils';
import Skeleton from 'react-loading-skeleton';

const FundsCard = (props: any) => {
  const { headerData, userBalance, data } = props;
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [long_cost, setLongCost] = useState<number>(0);
  const [short_cost, setShortCost] = useState<number>(0);

  useEffect(() => {
    if (
      Object.keys(headerData).length > 0 &&
      Object.keys(userBalance).length > 0 &&
      data?.length >= 0
    ) {
      let longCost = 0;
      let shortCost = 0;
      data.map((item: any) => {
        if (item.side == 'long') longCost += item.info.collateral;
        else if (item.side == 'short') shortCost += item.info.collateral;
      });
      setShortCost(shortCost);
      setLongCost(longCost);
      setShowSkeleton(false);
    }
  }, [headerData, userBalance, data]);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex flex-col">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Funds Distribution USDT
          </h4>
        </div>
        <div className="w-full">
          <table className="text-[#1C2434] w-full">
            <thead className="font-bold w-full">
              <tr className="border-b border-[#dee2e6]">
                <th className="p-1 w-[30%] text-start">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' + showNumber(userBalance?.total_balance)
                  )}
                </th>
                <th className="p-1 w-[30%] text-start">
                  {showSkeleton ? <Skeleton /> : '100.00%'}
                </th>
                <th className="p-1 w-[40%] text-start">Total Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' + showNumber(userBalance?.balance_free)
                  )}
                </td>
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    showNumber(
                      (userBalance?.balance_free / userBalance?.total_balance) *
                        100,
                    ) + '%'
                  )}
                </td>
                <td className="p-1 w-[40%]">Available USDT</td>
              </tr>
              <tr className="w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' +
                    showNumber(
                      // headerData?.cost_long
                      long_cost,
                    )
                  )}
                </td>
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    showNumber((long_cost / userBalance?.total_balance) * 100) +
                    '%'
                  )}
                </td>
                <td className="p-1 w-[40%]">Long</td>
              </tr>
              <tr className="w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' +
                    showNumber(
                      short_cost,
                      // headerData?.cost_short
                    )
                  )}
                </td>
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    showNumber(
                      (short_cost / userBalance?.total_balance) * 100,
                    ) + '%'
                  )}
                </td>
                <td className="p-1 w-[40%]">Short</td>
              </tr>
              <tr className="font-bold w-full border-b border-[#dee2e6]">
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    '$ ' + showNumber(userBalance?.balance_used)
                  )}
                </td>
                <td className="p-1 w-[30%]">
                  {showSkeleton ? (
                    <Skeleton />
                  ) : (
                    showNumber(
                      (userBalance?.balance_used / userBalance?.total_balance) *
                        100,
                    ) + '%'
                  )}
                </td>
                <td className="p-1 w-[40%]">Total Positions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundsCard;
