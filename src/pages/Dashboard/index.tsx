import { useEffect, useState } from 'react';

import BestTradingCard from '../../components/BestTradingCard.tsx';
import Breadcrumb from '../../components/Breadcrumb.tsx';
import DailyBalanceCard from '../../components/DailyBalanceCard.tsx';
import FundsCard from '../../components/FundsCard.tsx';
import PAndLCard from '../../components/PAndLCard.tsx';
import ProfitCard from '../../components/ProfitCard.tsx';
import { useLocation } from 'react-router-dom';
import BalanceHistory from '../../components/BalanceHistory.tsx';
import DailyPnL from '../../components/DailyPnL.tsx';
import toast from 'react-hot-toast';
import ActiveUsersCard from '../../components/ActiveUsersCard.tsx';
import ActiveExchangeCard from '../../components/ActiveExchangeCard.tsx';
import TotalBalancesCard from '../../components/TotalBalancesCard.tsx';
import ActivePositions from '../../components/ActivePositions.tsx';
import ActivePositionsCard from '../../components/ActivePositionsCard.tsx';

interface ApiResponse {
  status: Boolean;
  result: any[];
}

const Dashboard = () => {
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [headerData, setHeaderData] = useState<any>({});
  const [userApiData, setUserApiData] = useState<any>();
  const [userBalance, setUserData] = useState<any>({});
  const query = new URLSearchParams(useLocation().search);
  const user_id = query.get('user_id');
  const userIdWithDefault: number | string =
    localStorage.role === 'user' ? localStorage.user_id : user_id ?? 0;

  useEffect(() => {
    fetchApiDetail();
    fetchDashBoardHeaderData();
    getAllPositionsData();
    getUserData();
  }, [userIdWithDefault]);

  const getUserData = async () => {
    try {
      let url = `${
        import.meta.env.VITE_SERVER_URL
      }/get_user_balance/?user_id=${userIdWithDefault}`;
      let response: Response = await fetch(url);
      let data = await response.json();
      if (data?.status == true) {
        setUserData(data?.result);
      }
    } catch (error) {
      toast.error('Data fetch failed.');
    }
  };

  const fetchDashBoardHeaderData = async () => {
    try {
      let url = `${
        import.meta.env.VITE_SERVER_URL
      }/get_dashboard_header_data/?user_id=${userIdWithDefault}`;
      let response: Response = await fetch(url);
      let data = await response.json();
      if (data?.status == true) {
        setHeaderData(data?.result);
      }
    } catch (error) {
      toast.error('Data fetch failed.');
    }
  };

  const fetchApiDetail = async () => {
    try {
      let url = `${
        import.meta.env.VITE_SERVER_URL
      }/get_api_info/?user_id=${userIdWithDefault}`;
      let response: Response = await fetch(url);
      let data = await response.json();
      if (data?.status == true) {
        setUserApiData(data?.result);
      }
    } catch (error) {
      toast.error('Data fetch failed.');
    }
  };

  const getAllPositionsData = async () => {
    setLoading(true);
    let url = `${
      import.meta.env.VITE_SERVER_URL
    }/get_all_positions_data/?user_id=${userIdWithDefault}&password=5555`;
    let response: Response = await fetch(url);
    let data: ApiResponse = await response.json();
    if (data?.status == true) setData(data.result);
    setLoading(false);
  };
  return (
    <>
      <Breadcrumb
        pageName={localStorage.role === 'admin' ? 'Sys Dashboard' : 'Dashboard'}
      />

      {localStorage.role === 'user' && userApiData === 'Not exist' ? (
        <div className="w-full bg-[#f8d7da] border border-[#f5c2c7] p-4 rounded-lg text-[#842029]">
          <h3>There is no Api detail.</h3>
        </div>
      ) : localStorage.role === 'user' && data?.length === 0 ? (
        <div className="w-full bg-[#f8d7da] border border-[#f5c2c7] p-4 rounded-lg text-[#842029]">
          <h3>You don't have any position!</h3>
        </div>
      ) : (
        <>
          {localStorage.getItem('user') &&
            JSON.parse(localStorage.user)?.username ===
              'info@tradingmachine.ai' && (
              <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5 xl:grid-cols-4 2xl:gap-6">
                <ActiveUsersCard data={headerData} />
                <ActiveExchangeCard data={headerData} />
                <ActivePositionsCard data={headerData} />
                <TotalBalancesCard data={headerData} />
              </div>
            )}
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ProfitCard userBalance={userBalance} user_id={userIdWithDefault} />
            <PAndLCard data={data} headerData={headerData} />
            <FundsCard
              headerData={headerData}
              userBalance={userBalance}
              data={data}
            />
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <BalanceHistory user_id={userIdWithDefault} />
            <DailyPnL user_id={userIdWithDefault} />
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <DailyBalanceCard user_id={userIdWithDefault} />
            <BestTradingCard user_id={userIdWithDefault} />
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <ActivePositions
              data={data}
              loading={loading}
              user_id={userIdWithDefault}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
