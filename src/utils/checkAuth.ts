import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import { getUTCTime } from '.';
import Cookies from 'js-cookie';

interface IProps {
  children: ReactNode;
}

const CheckAuth = ({ children }: IProps) => {
  const navigate = useNavigate();

  const checkTokenExpired = async (decodedToken: any) => {
    const utcNow = await getUTCTime();
    if (!decodedToken.exp || decodedToken.exp < utcNow) {
      navigate('/signin'); // Token is expired
    }
  };
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    const decoded: any = jwt_decode.jwtDecode(token || '');
    checkTokenExpired(decoded);
  }, [navigate]);

  return children;
};

export default CheckAuth;
