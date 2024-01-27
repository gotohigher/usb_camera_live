import ActivePositionsTable from './ActivePositionsTable';

const ActivePositions = (props: any) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Active Positions
          </h4>
        </div>
      </div>
      <div className="w-full">
        <ActivePositionsTable
          user_id={props.user_id}
          data={props.data}
          loading={props.loading}
        />
      </div>
    </div>
  );
};

export default ActivePositions;
