import net, { ApiInfo, RequestMethod } from '@/utils/net'

const apiInfo: ApiInfo = {
  method: RequestMethod.GET,
  path: '/ServiceInfo/version/{module}/{part}'
}
const fullUrl = net.buildFullUrl(apiInfo.path)

type ModulePart = 'env' | 'serial'

const getServiceModulePart = (module: string, part: ModulePart): Promise<string> => {
  return net.restRequest<string>(
    fullUrl,
    apiInfo.method,
    {
      module: module,
      part: part
    }
  )
}

export default {
  apiInfo,
  fullUrl,
  getServiceModulePart
}
