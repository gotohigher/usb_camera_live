import Skeleton from 'react-loading-skeleton';
import { DollarIcon } from './Icons';

const UpnlBalanceCardTemplate = (props: {
  balance: number | string;
  title: string;
  percent: number | string;
  loading: boolean;
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 col-span-12">
      <h4 className="text-[18px] font-bold text-black dark:text-white mb-4">
        {props.title}
      </h4>
      <div className="flex gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f8e9] dark:bg-meta-4">
          <DollarIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-[28px] font-bold text-[#012970] dark:text-white my-auto text-center">
            {props.loading ? <Skeleton width={100} /> : props.balance}
          </span>
          {props.title !== 'Total locked' && (
            <span className="text-[14px] font-bold text-[#012970] dark:text-white my-auto text-center">
              {props.loading ? <Skeleton width={100} /> : props?.percent + '%'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpnlBalanceCardTemplate;
