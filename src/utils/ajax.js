import axios from 'axios'
import { message } from 'ant-design-vue'
// import store from "@/store";
// 根据环境不同引入不同api地址
export const api = createApi()
export const cameraApi = createApi('/camera/api')
export const roadApi = createApi('/road/api')
export const gateApi = createApi('/gate/api')

// 符号转换
function prestToSymbol(symbol) {
  switch (symbol) {
    case '=':
      return '$eq'
    case 'like':
      return '$like'
    case '>':
      return '$gt'
    case '>=':
      return '$gte'
    case '<':
      return '$lt'
    case '<=':
      return '$lte'
    case 'in':
      return '$in'
    case 'not in':
      return '$nin'
    case 'true':
      return '$true'
    case 'false':
      return '$false'
    case 'null':
      return '$null'
    default:
      return symbol
  }
}

function createApi(baseApi = '/') {
  if (process.env.NODE_ENV === 'development')
    baseApi = `/api${baseApi}`

  // create an axios instance
  const service = axios.create({
    baseURL: baseApi, // url = base api url + request url
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 15000, // request timeout

  })

  // request拦截器 request interceptor
  service.interceptors.request.use(
    (config) => {
      if (config.method === 'get' || config.method === 'GET') {
        const params = Object.keys(config.params)
        params.forEach((item) => {
          if (item.startsWith('_join_')) {
            const type = item.split('_join_')
            const value = config.params[item]
            // 关联表
            const joinTable = Object.keys(value)[0]
            // 关联字段
            const joinTableField = Object.keys(value[joinTable])[0]
            // 查询字段
            const where = value[joinTable][joinTableField]
            // 查询条件
            const operator = prestToSymbol(where[1]) || '$eq'
            // 转换结果
            const string = `${type[1]}:${joinTable}:${joinTable}.${joinTableField}:${operator}:${where[0]}`
            config.params = { _join: string }
          }
        })
      }
      // 设置请求头
      if (localStorage.getItem('TOKEN')) {
        // loading
        config.headers.Authorization = `bearer ${localStorage.getItem('TOKEN')}`
      }

      return config
    },
    (error) => {
      // do something with request error
      return Promise.reject(error)
    },
  )
  // respone拦截器
  service.interceptors.response.use(
    (response) => {
      const res = response.data
      // 返回null 或者 空值 走 reject
      if (!res) {
        // // 登录超时,重新登录
        if (res?.message) {
          message({
            content: res.message || res.msg,
          })
        }
        return Promise.reject(res || 'error')
      }
      else {
        return Promise.resolve(res)
      }
    },
    (error) => {
      const res = error.response
      message.error(res.data.message)
      return Promise.reject(error)
    },
  )

  /**
 * http 请求基础类
 * 参考文档 https://www.kancloud.cn/yunye/axios/234845
 *
 */
  const request = ['post', 'put', 'patch'].reduce((request, method) => {
    /**
     *
     * @param url string 接口地址
     * @param data object get参数
     * @param options object axios 配置项
     * @returns {AxiosPromise}
     */
    request[method] = (url, data = {}, options = {}) => {
      return service(Object.assign({ url, data, method }, options))
    }
    return request
  }, {});

  ['get', 'delete', 'head'].forEach((method) => {
    /**
     *
     * @param url string 接口地址
     * @param params object get参数
     * @param options object axios 配置项
     * @returns {AxiosPromise}
     */
    request[method] = (url, params = {}, options = {}) => {
      return service(Object.assign({ url, params, method }, options))
    }
  })

  return request
}
