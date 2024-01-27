import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import toast from 'react-hot-toast';
import { getIP } from '../../utils';
import Loader from '../../common/Loader';

const ApiSetting = () => {
  const [exchange, setExchange] = useState<string>('');
  const [apikey, setApiKey] = useState<string>('');
  const [apisecret, setApiSecret] = useState<string>('');
  const [passphrase, setPassphrase] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [apiExist, setApiExist] = useState<boolean>(false);

  useEffect(() => {
    getApiDetails();
  }, []);

  const getApiDetails = async () => {
    try {
      setLoading(true);
      if (!localStorage?.getItem('user')) {
        toast.error("Can't find user data. Please signin again.");
        return;
      }
      const user_id = JSON.parse(localStorage?.user)?.id;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/get_apidetail/?user_id=${user_id}`,
      );
      const data = await response.json();
      if (data?.status == true) {
        setApiExist(true);
      } else {
        setApiExist(false);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Get api detail failed');
    }
  };
  const handleApiSubmit = async () => {
    if (exchange !== '' && apikey && apisecret) {
      try {
        setLoading(true);
        if (!localStorage?.getItem('user')) {
          toast.error("Can't find user data. Please signin again.");
          return;
        }
        const user_id = JSON.parse(localStorage?.user)?.id;
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/change_apikey`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: user_id,
              exchange: exchange,
              api_key: apikey,
              api_secret: apisecret,
              passphrase: passphrase,
              ip: (await getIP()) || '',
            }),
          },
        );
        const data = await response.json();
        if (data?.status == true) {
          toast.success('Api Key setted.');
        } else {
          toast.error(data?.result);
        }
        setLoading(false);
      } catch (error) {
        toast.error('Unexpected Error.');
      }
    } else {
      toast.error('Please input all fields.');
    }
  };
  const handleApiDelete = async () => {
    try {
      setLoading(true);
      if (!localStorage?.getItem('user')) {
        toast.error("Can't find user data. Please signin again.");
        return;
      }
      const user_id = JSON.parse(localStorage?.user)?.id;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/delete_apikey`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user_id,
          }),
        },
      );
      const data = await response.json();
      if (data?.status == true) {
        toast.success('Api Key Deleted.');
        getApiDetails();
      } else {
        toast.error(data?.result);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Unexpected Error.');
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb pageName="API Details" />

          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col gap-9">
              {/* <!-- Sign Up Form --> */}
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <div className="gap-3 grid">
                    <h3 className="font-medium text-black dark:text-white">
                      API Details
                    </h3>
                    <p>
                      We will store your API secret encrypted, so that you will
                      not see again your secret key...
                    </p>
                    <p>Please add our ip to whitelist at your exchange</p>
                    <p className="font-semibold">
                      IP: <code className="text-[#d63384]">164.92.252.132</code>
                    </p>
                  </div>
                </div>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Exchange
                    </label>
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      onChange={(e) => setExchange(e.target.value)}
                    >
                      <option value="">--Select Exchange--</option>
                      <option value="bybit">ByBit</option>
                      <option value="bingx">BingX</option>
                      <option value="binance">Binance</option>
                      <option value="okx">Okx</option>
                    </select>
                    <p className="text-[14px] mt-1">Please select exchange.</p>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      API Key
                    </label>
                    <input
                      type="email"
                      placeholder="API Key"
                      value={apikey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      API Secret
                    </label>
                    <input
                      type="password"
                      placeholder="API Secret"
                      value={apisecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Passphrase
                    </label>
                    <input
                      type="password"
                      placeholder="Passphrase"
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <p className="text-[14px] mt-1">
                      If exist please enter your Passphrase.
                    </p>
                  </div>
                  <div className="w-full flex gap-4">
                    {localStorage?.getItem('user') &&
                      JSON.parse(localStorage?.user)?.username !==
                        'info@tradingmachine.ai' &&
                      apiExist && (
                        <button
                          className="flex w-full justify-center rounded bg-[#d63384] p-3 font-medium text-gray"
                          onClick={handleApiDelete}
                        >
                          Delete API Details
                        </button>
                      )}
                    <button
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                      onClick={handleApiSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ApiSetting;
