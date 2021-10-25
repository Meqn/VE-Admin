
/**
 * 获取文件后缀
 * @param {*} fileSrc 
 * @returns 
 */
export function fileSuffix (fileSrc) {
  if (typeof fileSrc !== 'string') return ''
  const _path = fileSrc.split('?')[0]
  return _path.includes('.') ? _path.split('.').pop().toLocaleLowerCase() : ''
}

/**
 * 获取文件类型
 * @param {*} fileSrc 
 * @returns 
 */
export function fileType(fileSrc) {
  const suffixes = {
    image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
    video: ['mp4', 'mov', 'webm', 'ogg', 'avi', 'm3u8', '3gp', 'flv'],
    pdf: ['pdf']
  }
  const _suffix = fileSuffix(fileSrc)
  let _type = ''
  if (_suffix) {
    Object.keys(suffixes).some(key => {
      if (suffixes[key].includes(_suffix)) {
        _type = key
        return true
      }
    })
  }
  // 如果为空，则为 iframe
  return _type || _suffix
}

/**
 * 
 * @param {String} src 文件源
 * @returns 
 */
export function videoSourceType(src) {
  const ext = fileSuffix(src) || 'mp4'
  return `video/${ext}`
}
