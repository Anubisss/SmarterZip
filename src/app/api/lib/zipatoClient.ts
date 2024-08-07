import axios, { AxiosInstance } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

class ZipatoClient {
  private jar: CookieJar;
  private client: AxiosInstance;

  private constructor() {
    this.jar = new CookieJar();
    this.client = wrapper(axios.create({ jar: this.jar }));
  }

  public static getInstance(): ZipatoClient {
    // Since Nextjs has route-based code splitting the singleton instance has to be stored
    // in the global variable. Otherwise each API route handler would create
    // its own instance instead of using the existing global one.
    if (!global.zipatoClient) {
      global.zipatoClient = new ZipatoClient();
    }
    return global.zipatoClient;
  }

  public getClient() {
    return this.client;
  }
}

export default ZipatoClient;
