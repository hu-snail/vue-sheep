import request from '@/utils/request'

export function getPassApi(params) {
    return request({
      url: '/pass',
      method: 'get',
      params,
    })
}
