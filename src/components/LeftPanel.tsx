import { CameraIcon, ControlIcon, DimIcon, RecordIcon } from "./Icons";

const LeftPanel = () => {
  return (
    <div className="left-panel w-full h-full flex flex-col justify-start items-center bg-[#98a8e2] rounded-lg">
      <div className="w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white text-white gap-4 rounded-t-lg">
        <DimIcon />
        <span className="text-4xl font-semibold">Dim</span>
      </div>
      <div className="w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white gap-4 text-white">
        <RecordIcon />
        <span className="text-4xl font-semibold">Cap-True</span>
      </div>
      <div className="w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white gap-4 text-white">
        <CameraIcon />
        <span className="text-4xl font-semibold">Play Back</span>
      </div>
      <div className="w-full h-fit px-4 py-4 flex hover:cursor-pointer border border-[#98a8e2] hover:border-white gap-4 text-white rounded-b-lg">
        <ControlIcon />
        <span className="text-4xl font-semibold">Param</span>
      </div>
    </div>
  );
};
export default LeftPanel;
