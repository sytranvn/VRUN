import axios from 'axios';
import { serialize } from 'object-to-formdata';

const defaultConfig = {
  headers: {},
  timeout: 30000,
  withCredentials: true,
  baseURL: process.env.BASE_URL,
  reposeType: 'json',
};

function requestPreprocess(req) {
  if (req.useFormData && req.method.toLowerCase() == 'post') {
    const data = { ...req.data };
    if (data) {
      req.originalData = data;
      req.data = serialize(
        data,
        {
          indices: true,
          allowEmptyArrays: true,
          dotsForObjectNotation: true,
        },
        // existingFormData, // optional
        // keyPrefix, // optional
      );

      req.headers['content-type'] = 'multipart/form-data';
    }
  }

  return req;
}

function responsePreprocess(response) {
  return response;
}

async function handleAxiosError(error) {
  return Promise.reject(error);
}

const axiosInstance = axios.create(defaultConfig);

axiosInstance.interceptors.request.use(
  (req) => requestPreprocess(req),
  (err) => handleAxiosError(err),
);

axiosInstance.interceptors.response.use(
  (res) => responsePreprocess(res),
  (err) => handleAxiosError(err),
);

const getAxios = (config) => {
  if (!config) return axiosInstance;

  const newInstance = axios.create({
    ...defaultConfig,
    ...config,
  });

  return newInstance;
};

export default getAxios;
