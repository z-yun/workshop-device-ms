import request from '@/utils/request'

//图片上传
export function picUpload(data) {
  return request({
    url: '/pic/upload',
    method: 'post',
    data,
    headers:{
      'content-type':'multipart/form-data'
    }
  });
}
