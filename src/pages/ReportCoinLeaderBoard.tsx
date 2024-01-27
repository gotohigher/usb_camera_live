import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ReportProfitCard from '../components/ReportProfitCard';
import PnlChartTemplate from '../components/PnlChartTemplate';
import UpnlBalanceCardTemplate from '../components/UpnlBalanceCardTemplate';
import ReportPAndLCard from '../components/ReportPAndLCard';
import UPnlChart from '../components/UPnlChartComponent';
import toast from 'react-hot-toast';
import { showNumber } from '../utils';
import CoinLeaderBoardChart from '../components/CoinLeaderBoardChart';
import LeaderBoardPositionTemplate from '../components/LeaderBoardPositionTemplate';

const ReportCoinLeaderBoard = () => {
  const [xaxis, setXaxis] = useState<any>([]);
  const [series, setSeries] = useState<any>([]);

  useEffect(() => {
    fetchDashBoardHeaderData();
  }, []);

  const fetchDashBoardHeaderData = async () => {
    try {
      let url = `${
        import.meta.env.VITE_SERVER_URL
      }/coin_leader_board_chart/?user_id=${localStorage.user_id}`;
      let response: Response = await fetch(url);
      let data = await response.json();
      if (data?.status == true) {
        setSeries(data?.series);
        setXaxis(data?.xaxis);
      }
    } catch (error) {
      toast.error('Data fetch failed.');
    }
  };
  return (
    <>
      <Breadcrumb pageName="Coins Leaderboard" />
      <div className="flex flex-col gap-8">
        <CoinLeaderBoardChart xaxis={xaxis} series={series} />
        <LeaderBoardPositionTemplate side="" />
        <LeaderBoardPositionTemplate side="Long" />
        <LeaderBoardPositionTemplate side="Short" />
      </div>
    </>
  );
};

export default ReportCoinLeaderBoard;
