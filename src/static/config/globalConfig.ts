interface GlobalConfig {
  api: Record<ApiList, string>;
}

type ApiList = 'versionInfo' | 'moduleInfo'

const globalConfig: GlobalConfig = {
  api: {
    versionInfo: '/ServiceInfo/version',
    moduleInfo: '/ServiceInfo/version/web'
  }
}

export default globalConfig
export {
  GlobalConfig, ApiList
}
