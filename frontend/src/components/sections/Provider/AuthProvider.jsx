'use client'
import { useEffect, useState } from 'react';
import getApiService from '@/services'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/stores/slices/user'
import { useRouter, usePathname } from 'next/navigation'
import { TOKEN_KEY } from '@/utils/constants';
import Cookies from 'js-cookie';

const AuthProvider = ({ children }) => {
  const { MeService } = getApiService();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if(!userInfo) {
      MeService.readUserMe()
        .then(user => {
          if(!user?.is_active) {
            throw new Error('Invalid User');
          }
  
          if(pathname.startsWith('/admin') && !user.is_superuser) {
            return router.push('/');
          }
  
          dispatch(setUser(user));
          setIsReady(true);
        })
        .catch(error => {
          console.error(error)
          Cookies.set(TOKEN_KEY, '');
          router.push('/login')
        });
    } else {
      setIsReady(true);
    }
  }, [dispatch]);

  return (
    <>{ isReady && children }</>
  )
};

export default AuthProvider;