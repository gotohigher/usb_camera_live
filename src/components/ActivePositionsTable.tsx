import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

// Assuming the structure for a data object, adjust according to your needs

function ActivePositionsTable(props: any) {
  // Define the state variables.
  const { data, loading, user_id } = props;
  return (
    <div className="lg:overflow-x-hidden overflow-x-auto">
      <table className="w-full">
        <thead className="w-full">
          <tr className="w-full text-[#212529] text-[14px] xl:text-[16px]">
            <th className="w-[11%] text-start">Symbol</th>
            <th className="w-[6%] text-start">Side</th>
            <th className="w-[8%] text-center">Leverage</th>
            <th className="w-[12%] text-end">Qty</th>
            <th className="w-[12%] text-end">Order Value</th>
            <th className="w-[12%] text-end">Avg Entry Price</th>
            <th className="w-[12%] text-end">Mark Price</th>
            <th className="w-[12%] text-end">Margin</th>
            <th className="w-[16%] text-end">Unrealized P&L</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {!loading &&
            data &&
            data?.map((item: any, index: number) => {
              let amount: number = Number(item?.info?.contracts);
              let price: number = Number(item?.info?.entryPrice);
              let order_value: number = amount * price;
              let margin: number = Number(item?.info?.initialMargin);
              let unreallizedPnl: number = Number(item?.info?.unrealizedPnl);
              let unrealizedPnl_percentage: number =
                (unreallizedPnl / order_value) * 100;
              if (isNaN(unrealizedPnl_percentage)) return null;
              return (
                <tr
                  key={index}
                  className={`text-[#212529] ${
                    index % 2 == 0 ? 'bg-[#f2f2f2]' : 'bg-white'
                  } `}
                >
                  <td className="p-1 text-start">
                    {/* <a
                      href={`/dashboard/user_id=${item?.symbol}`}
                      className="text-[#717FF5]"
                    > */}
                    {item?.symbol}
                    {/* </a> */}
                  </td>
                  <td className="p-1 text-start">
                    {item?.side == 'long' ? (
                      <span className="bg-[#198754] rounded-[4px] px-1 text-white w-fit text-[12px] font-semibold leading-[17px]">
                        Long
                      </span>
                    ) : (
                      <span className="bg-[#dc3545] rounded-[4px] px-1 text-white w-fit text-[12px] font-semibold leading-[17px]">
                        Short
                      </span>
                    )}
                  </td>
                  <td className="p-1 text-center">
                    {item?.info?.marginMode + ' ' + item?.info?.leverage + 'x'}
                  </td>
                  <td className="p-1 text-end">{amount?.toFixed(4)}</td>
                  <td className="p-1 text-end">{order_value?.toFixed(2)}</td>

                  <td className="p-1 text-end">{price?.toFixed(2)}</td>
                  <td className="p-1 text-end">
                    {item?.info?.markPrice?.toFixed(2)}
                  </td>
                  <td className="p-1 text-end">{margin?.toFixed(4)}</td>
                  <td
                    className={`p-1 text-center ${
                      unreallizedPnl < 0 ? 'text-[#DC3545]' : 'text-[#198754]'
                    }`}
                  >
                    {unreallizedPnl?.toFixed(4)}
                    <br />
                    {'(' + unrealizedPnl_percentage?.toFixed(4) + '%)'}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {loading && (
        <Skeleton
          style={{ width: '100%' }}
          count={10}
          width="100%"
          className="!w-full"
        />
      )}

      <Link to={`/positions/?user_id=${user_id}`}>
        <button className="flex px-3 justify-center rounded bg-primary sm:w-fit py-2 w-full font-medium text-gray mt-3">
          View All Positions
        </button>
      </Link>
    </div>
  );
}

export default ActivePositionsTable;
