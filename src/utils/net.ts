import axios, { AxiosError, AxiosResponse } from 'axios'
import global from '@/utils/global'

interface ApiInfo {
  method: RequestMethod;
  path: string;
}

interface ParamType {
  [key: string]: string;
}

enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT= 'put',
  DELETE = 'delete',
  OPTIONS = 'options'
}

const netInfo = global.profiledConfig?.netInfo

function buildRestUrl (fullUrl: string, param: ParamType = {}): string {
  if (param && Object.keys(param).length > 0) {
    for (const key in param) {
      fullUrl = fullUrl.replace(`{${key}}`, param[key])
    }
  }
  console.log('fullUrl:', fullUrl)
  return fullUrl
}

function handleError (error: AxiosError, url: string): string {
  if (error.request) {
    console.log('error.request:', error.request)
  }
  if (error.response) {
    let errorInfo = ''
    switch (error.response.status) {
      case 404:
        errorInfo = `404 Cannot Open Url '${url}'`
        break
      case 500:
        errorInfo = `500 Internal Server Error: ${error.response.statusText}`
        break
    }
    return errorInfo
  } else {
    return `Error occured while request ${url}. Error: ${error.message}`
  }
}

const net = {
  buildFullUrl: (apiPath: string): string => {
    if (netInfo) {
      return `${netInfo.baseUrl}${netInfo.version ? netInfo.version : ''}${apiPath}`
    } else {
      throw new Error('net info not found')
    }
  },
  restRequest: <T> (fullUrl: string, method: RequestMethod, param: ParamType = {}) => {
    const restUrl = buildRestUrl(fullUrl, param)
    return new Promise<T>((resolve, reject) => {
      let responsePromise: Promise<AxiosResponse>
      switch (method) {
        case RequestMethod.GET:
          responsePromise = axios.get(restUrl)
          break
        case RequestMethod.POST:
          responsePromise = axios.post(restUrl)
          break
        case RequestMethod.PUT:
          responsePromise = axios.put(restUrl)
          break
        case RequestMethod.DELETE:
          responsePromise = axios.delete(restUrl)
          break
        case RequestMethod.OPTIONS:
          responsePromise = axios.options(restUrl)
          break
      }
      responsePromise
        .then(response => {
          if (response.status === 200) {
            resolve(response.data)
          }
        })
        .catch((error: AxiosError) => {
          console.log('in responsePromise, reason:', error)
          reject(new Error(handleError(error, restUrl)))
        })
    })
  }
}

export default net
export {
  ApiInfo,
  ParamType,
  RequestMethod
}
