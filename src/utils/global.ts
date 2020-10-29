import ProfiledConfig from '../static/config/profile'
import globalConfig, { GlobalConfig } from '../static/config/globalConfig'
class Global {
  profiledConfig: ProfiledConfig | undefined =undefined
  globalConfig: GlobalConfig
  env: string

  constructor () {
    this.env = this.getEnv()
    this.globalConfig = globalConfig
  }

  public getEnv () {
    let env = 'dev'
    if (process.env.NODE_ENV) {
      env = process.env.NODE_ENV
    }
    return env
  }

  public getProfiledConfig (): ProfiledConfig {
    // eslint-disable-next-line
    return this.profiledConfig!
  }

  public getGlobalConfig (): GlobalConfig {
    return this.globalConfig
  }

  public async init () {
    // this.env = 'test'
    import('../static/config/' + `profile-${this.env}`)
      .then(module => {
        console.log('module: ', module)
        this.profiledConfig = module.default
        console.log('profileName:', this.profiledConfig?.profileInfo.profileName)
      })
      .catch(reason => {
        console.error('load module fail: ', reason)
      })
  }
}

console.log('create global')

export default new Global()
