import ProfiledConfig from '../static/config/profiledConfig'
class Global {
  inited: boolean
  env: string
  profiledConfig: ProfiledConfig | undefined
  constructor () {
    this.env = this.getEnv()
    this.inited = false
  }

  public getEnv (): string {
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

  public async init () {
    console.log('in init')
    import('../static/config/' + `profile-${this.env}`)
      .then(module => {
        console.log('in promise, module: ', module)
        this.profiledConfig = module.default
        console.log(this.profiledConfig)
      })
  }
}

export default new Global()
