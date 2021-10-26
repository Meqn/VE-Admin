const youtubeRegx = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
const vimeoRegx = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\\-]+)?/i

export const isNumber = arg => !isNaN(parseFloat(arg)) && isFinite(arg)

export function isObject(arg) {
  return arg !== null && typeof arg === 'object'
}

export function isMp4(url) {
  if (url && typeof url === 'string') {
    const suffix = fileSuffix(url)
    return ['mp4', 'mov', 'webm', 'ogg', 'avi'].includes(suffix)
  }
  return false
}

export function isYoutube(url) {
  if (url && typeof url === 'string') {
    return youtubeRegx.test(url)
  }
  return false
}

export function isVimeo(url) {
  if (url && typeof url === 'string') {
    return vimeoRegx.test(url)
  }
  return false
}

export function isVideo(url) {
  return isMp4(url) || isYoutube(url) || isVimeo(url)
}

export function getYoutubeID(url) {
  if (url && typeof url === 'string') {
    const result = url.match(youtubeRegx)
    return result && result.length > 1 ? result[1] : null
  }
  return null
}

export function getYoutubeUrl(url, youtubeCookies = true) {
  const ytId = getYoutubeID(url)
  if (ytId) {
    // check if allows youtube cookies
    if (youtubeCookies) {
      return 'https://www.youtube.com/embed/' + ytId
    }
    return 'https://www.youtube-nocookie.com/embed/' + ytId
  }
  return null
}

export function getYoutubeThumb(url) {
  const ytId = getYoutubeID(url)
  if (ytId) {
    return 'https://img.youtube.com/vi/' + ytId + '/mqdefault.jpg'
  }
  return null
}

export function getVimeoID(url) {
  if (url && typeof url === 'string') {
    const result = url.match(vimeoRegx)
    return result && result.length > 1 ? result[1] : null
  }
  return null
}

export function getVimeoUrl(url) {
  const vimeoID = getVimeoID(url)
  if (vimeoID) {
    return '//player.vimeo.com/video/' + vimeoID + '?hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1'
  }
  return null
}

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
 * 
 * @param {String} src 文件源
 * @returns 
 */
export function videoSourceType(src, { ext }) {
  const _ext = ext || fileSuffix(src)
  return _ext ? `video/${_ext}` : ''
}


export function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

export function fullScreenMode() {
  /* Get the documentElement (<html>) to display the page in fullscreen */
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
