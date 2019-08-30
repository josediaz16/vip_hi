export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const options = {
      url: url,
      method: method,
      dataType: "json",
      enctype: 'multipart/form-data',
      contentType: false,
      processData: false,
      data: data
    }

    $.ajax(options).done(resolve).fail(reject)
  })
}

export function getRequest(url, data) {
  return new Promise((resolve, reject) => {
    const options = {
      url: url,
      method: "GET",
      dataType: "json",
      data: data
    }

    $.ajax(options).done(resolve).fail(reject)
  })
}

export function isPresent(obj) {
  return obj !== null && obj !== undefined && obj !== ""
}

export function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export function filterArraysByProperty(array1, array2, property) {
  return array1.filter(item => {
    return array2.filter(itemB => item[property] === itemB[property]).length === 0
  })
}
