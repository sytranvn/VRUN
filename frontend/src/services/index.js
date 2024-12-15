import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/utils/constants';
import * as api from '@/client';

api.OpenAPI.BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
api.OpenAPI.TOKEN = () => Cookies.get(TOKEN_KEY);

const getApiService = () => {
  return api;
};

export default getApiService;
