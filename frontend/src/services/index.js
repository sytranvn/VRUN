import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/utils/constants';
import * as api from '@/client';

api.OpenAPI.BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

const getApiService = () => {
  if (!api.OpenAPI.TOKEN) {
    api.OpenAPI.TOKEN = Cookies.get(TOKEN_KEY);
  }

  return api;
};

export default getApiService;
