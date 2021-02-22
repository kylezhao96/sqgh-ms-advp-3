import request from '@/utils/request'

const api = {
  uploadImpFile: 'imp/upload',
  downloadLatestFile: 'imp/download/latest',
  isExistWtFile: 'imp/download/is-exist'
}

export default api

export function uploadImpFile (parameter) {
  return request({
    url: api.uploadImpFile,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function downloadLatestFile () {
  return request(({
    url: api.downloadLatestFile,
    method: 'post',
    responseType: 'blob'
  }))
}

export function isExistWtFile () {
  return request(({
    url: api.isExistWtFile,
    method: 'get'
  }))
}
