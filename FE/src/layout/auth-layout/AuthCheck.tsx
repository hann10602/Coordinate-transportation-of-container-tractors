import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthCheck = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1100;
      if (decodedToken.ttl < currentTime) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate, token]);

  return <Outlet />;
};
