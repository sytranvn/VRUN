import { postEntityLogin, setBaseUrl } from "../api/api.mjs";
/**
 *interface AuthProvider {
 * isAuthenticated: boolean;
 * username: null | string;
 * token: null | string;
 * signin(username: string): Promise<void>;
 * signout(): Promise<void>;
 * }
 */

/**
 * This represents some generic auth provider API, like Firebase.
 */

setBaseUrl(import.meta.env.VITE_AI_WARP_URL);
/** 
 * @typedef {{
 * username: string,
 * role: string
 * }} User */
/**
 * @typedef {{
 * isAuthenticated: boolean, 
 * user: null | User, 
 * token: null | string
 * signin(username: string): Promise<void>, 
 * signout(): Promise<void>
 * }} AuthProvider */

/**
 * This represents some generic auth provider API, like Firebase.
 * @type {AuthProvider}
 */
export const authProvider = {
  isAuthenticated: false,
  user: null,
  /**
  * @param {Object} param0 
  * @param {string} param0.username
  * @param {string} param0.password
  */
  async signin({username, password}) {
    const {token} = await postEntityLogin({username, password})
    const [ , payload, ] = token.split('.')
    
    authProvider.token = token
    authProvider.user = atob(payload);
    authProvider.isAuthenticated = true;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.user = null;
    authProvider.token = null;
  },
};
