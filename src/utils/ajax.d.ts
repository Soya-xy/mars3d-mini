export default class Ajax {
  constructor(baseUrl: string)
  get(url: string, params?: object, header?: object, noAuth?: boolean): Promise<any>
  post(url: string, params?: object, header?: object, noAuth?: boolean): Promise<any>
}
export const cameraApi: Ajax
export const roadApi: Ajax
export const gateApi: Ajax
