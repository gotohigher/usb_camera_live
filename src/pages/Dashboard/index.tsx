const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-10 gap-3.5 w-full h-full">
        <div className="col-span-2 h-full bg-primary w-full"></div>
        <div className="col-span-6 h-full bg-primary w-full">
          <video></video>
        </div>
        <div className="col-span-2 h-full bg-primary w-full"></div>
      </div>
    </>
  );
};

export default Dashboard;
