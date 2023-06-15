import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      router.push('/Login'); // Redirect to login page if not logged in
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
};

