import axios from 'axios';
import toast from 'react-hot-toast';

export const getUTCTime = async () => {
  try {
    const response = await axios.get(
      'https://worldtimeapi.org/api/timezone/Etc/UTC',
    );

    // Added validation checks
    if (!response) {
      throw new Error('No response received');
    }

    if (response.status !== 200) {
      throw new Error('Request failed with status ' + response.status);
    }

    const data = response.data;

    if (!data) {
      throw new Error('No data in response');
    }

    return data.unixtime;
  } catch (error) {
    console.error('Error getting UTC time:', error);
    throw error;
  }
};

export const getIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');

    // Added validation check
    if (!response) {
      throw new Error('No response received');
    }

    if (!response.ok) {
      throw new Error('Failed to fetch IP address');
    }

    const data = await response.json();

    // Added validation check
    if (!data) {
      throw new Error('No data received');
    }

    return data.ip || '';
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return '';
  }
};

export const showNumber = (value: number, count: number = 2) => {
  if (value === undefined || value === null) {
    return '0.00';
  }

  const roundedValue = Number(value.toFixed(count));
  return roundedValue.toString();
};
export const fetchUser = async (userId: number) => {
  if (!userId) {
    throw new Error('userId is required');
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/user/?user_id=${userId}`,
    );

    if (!response.ok) {
      toast.error('Failed to fetch user');
    }

    const data = await response.json();

    if (!data) {
      toast.error('No response data');
    }

    const user = data.result;

    if (!user) {
      throw new Error('No user in response');
    }

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);

    throw error;
  }
};
