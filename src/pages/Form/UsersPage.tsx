import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import UsersTable from '../../components/UsersTable';

const UsersPage = () => {
  const [filterEmail, setFilterEmail] = useState<string>('');

  return (
    <>
      <Breadcrumb pageName="Users" />
      <input
        className="appearance-none w-[300px] bg-white rounded border border-stroke bg-transparent py-1 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
        placeholder="Search by Email or User name"
        onChange={(e) => {
          setFilterEmail(e.target.value);
        }}
      />

      <div className="grid grid-cols-1 gap-8 mt-3">
        <div className="flex flex-col gap-9">
          {/* <!-- Sign Up Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Users</h3>
            </div>
            <div className="p-[26px]">
              <UsersTable filterEmail={filterEmail} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
