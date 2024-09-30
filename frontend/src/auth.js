import { postLogin } from "../api/api.mjs";
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
export const authProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username) {
    const { token } = await postLogin({ username, password: '123123' })
    authProvider.isAuthenticated = true;
    authProvider.username = username;
    authProvider.token = token;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.username = "";
    authProvider.token = null;
  },
};
