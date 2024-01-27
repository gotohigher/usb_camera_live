// EmailVerification.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const query = new URLSearchParams(useLocation().search);
  const code = query.get('code');
  const navigate = useNavigate();

  // A function to parse query parameters
  const getQueryParam = (param: string) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  // Extract the code from URL
  const verificationCode = getQueryParam('code');

  // Function to verify the code with the backend
  const verifyCode = async (code: string) => {
    try {
      // Replace this URL with your actual endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/verify-email`,
        { code },
      );
      if (response.data.success) {
        // Verification successful
        setVerificationStatus('success');
      } else {
        // Verification failed
        setVerificationStatus('failed');
      }
    } catch (error) {
      // Handle error (network error, server error, etc.)
      setVerificationStatus('failed');
    }
  };

  useEffect(() => {
    if (verificationCode) {
      verifyCode(verificationCode);
    }
  }, [verificationCode]);

  // Function to resend the verification code
  const resendVerificationCode = async () => {
    // Implement the API call to resend the code
    // ...
    alert('Verification code resent. Please check your email!');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {verificationStatus === 'success' ? (
          <>
            <div className="mb-4">
              <h1 className="font-bold text-2xl text-center">
                Email Verified!
              </h1>
            </div>
            <p className="text-gray-600 text-center mb-8">
              Thank you for verifying your email address. Your account setup is
              now complete!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-block bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-700 transition ease-in duration-150"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h1 className="font-bold text-2xl text-center">
                Verification Failed
              </h1>
            </div>
            <p className="text-gray-600 text-center mb-8">
              Oops! There was an issue verifying your email address.
            </p>
            <div className="flex justify-center">
              <button
                onClick={resendVerificationCode}
                className="inline-block bg-meta-1 text-white py-2 px-4 rounded hover:bg-meta-7 transition ease-in duration-150"
              >
                Resend Verification Code
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
