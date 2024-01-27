import { useEffect, useState } from 'react';

interface ApiResponse {
  status: boolean;
  result: any[];
}
const BestTradingCard = (props: { user_id: string | number }) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    getBalanceHistory();
  }, []);

  const getBalanceHistory = async () => {
    let url = `${
      import.meta.env.VITE_SERVER_URL
    }/get_best_trading_pairs/?user_id=${props.user_id}`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setData(data?.result);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 h-fit">
      <div className="mb-4 justify-between gap-4 sm:flex flex-col">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Best Trading Pairs
          </h4>
        </div>
        <div className="w-full h-auto">
          <table className="text-[#1C2434] w-full">
            <tbody>
              {data &&
                data?.map((item, index) => (
                  <tr className="border-b border-[#dee2e6]" key={index}>
                    <td className="text-start">{item?.symbol}</td>
                    <td className="text-end">${item?.profit?.toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BestTradingCard;
