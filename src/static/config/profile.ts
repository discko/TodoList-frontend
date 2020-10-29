interface ProfiledConfig {
  profileInfo: ProfileInfo,
  netConfig: NetConfig
}
interface ProfileInfo {
  profileName: string;
  serial: string;
}

interface NetConfig {
  /**
   * contains protocal, domain and port
   * slash is not included.
   * example: http://localhost:8080
   **/
  baseUrl: string,
  version: string
}

export default ProfiledConfig

export {
  ProfileInfo,
  NetConfig
}
