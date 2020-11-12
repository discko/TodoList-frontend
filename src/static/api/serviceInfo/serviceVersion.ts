import net, { ApiInfo, RequestMethod } from '@/utils/net'
import { VoServiceInfoVersion } from '@/static/vo'

const apiInfo: ApiInfo = {
  method: RequestMethod.GET,
  path: '/ServiceInfo/version'
}
const fullUrl = net.buildFullUrl(apiInfo.path)

const getServiceInfoVersion = (): Promise<VoServiceInfoVersion> => {
  return net.restRequest<VoServiceInfoVersion>(fullUrl, apiInfo.method)
}

export default {
  apiInfo,
  fullUrl,
  getServiceInfoVersion
}
