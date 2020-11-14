import ProfiledConfig from '@/static/config/profiledConfig'
class Global {
  env: string
  profiledConfig: ProfiledConfig | undefined
  constructor () {
    this.env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
  }

  public getProfiledConfig (): ProfiledConfig {
    // eslint-disable-next-line
    return this.profiledConfig!
  }

  public async init () {
    console.log('in init')
    import('../static/config/' + `profile-${this.env}`).then(module => {
      console.log('in promise, module: ', module)
      this.profiledConfig = module.default
      console.log(this.profiledConfig)
    })
  }
}

export default new Global()
