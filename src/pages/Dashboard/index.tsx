import LeftPanel from "../../components/LeftPanel";
import RightPanel from "../../components/RightPanel";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-10 gap-3.5 w-full h-full">
        <div className="col-span-2 h-full w-full">
          <LeftPanel />
        </div>
        <div className="col-span-6 h-full w-full rounded-lg bg-white">
          <video className="w-full h-full" src="https://www.bigbuckbunny.org/">
            <source
              src="https://www.bigbuckbunny.org/"
              type="video/mp4"
            ></source>
          </video>
        </div>
        <div className="col-span-2 h-full w-full ">
          <RightPanel />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
