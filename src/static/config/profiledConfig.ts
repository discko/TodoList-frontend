interface ProfiledConfig {
  profileInfo: ProfileInfo;
  netInfo: NetInfo;
}

interface ProfileInfo {
  profileName: string;
  serial: string;
}

interface NetInfo {
   /**
   * contains protocal, domain and port
   * slash is not included.
   * example: http://localhost:8080
   **/
  baseUrl: string;
  /**
   * include leading slash.
   * example: /v1
   */
  version: string;
}

export default ProfiledConfig
export {
  ProfileInfo,
  NetInfo
}
