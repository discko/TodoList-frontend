import { Profile } from '../static/config/profile'
class Global {
  num: number
  profile: Profile | undefined
  env: string

  constructor (num: number) {
    this.num = num
    this.env = this.getEnv()
    this.profile = undefined
  }

  public getEnv () {
    let env = 'dev'
    if (process.env.NODE_ENV) {
      env = process.env.NODE_ENV
    }
    return env
  }

  public async init () {
    // this.env = 'test'
    console.log('../static/config/' + `profile-${this.env}`)
    import('../static/config/' + `profile-${this.env}`)
      .then(module => {
        console.log('module: ', module)
        this.profile = module.default
        console.log('profileName:', this.profile?.profileName)
      })
      .catch(reason => {
        console.error('load module fail: ', reason)
      })
  }
}

console.log('create global')

export default new Global(Math.random())
