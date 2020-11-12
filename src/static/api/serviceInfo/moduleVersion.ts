import net, { ApiInfo, RequestMethod } from '@/utils/net'
import { VoServiceInfoVersionModule } from '@/static/vo'

const apiInfo: ApiInfo = {
  method: RequestMethod.GET,
  path: '/ServiceInfo/version/{module}'
}
const fullUrl = net.buildFullUrl(apiInfo.path)

const getServiceInfoModule = (module: string): Promise<VoServiceInfoVersionModule> => {
  return net.restRequest<VoServiceInfoVersionModule>(
    fullUrl,
    apiInfo.method,
    {
      module: module
    }
  )
}

export default {
  apiInfo,
  fullUrl,
  getServiceInfoModule
}
