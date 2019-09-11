export function isWeiXin() {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  let type: any = ua.match(/MicroMessenger/i);
  if (type === 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

export function checkPhone(phone: string | number) {
  if (!/^1[34578]\d{9}$/.test(phone as string)) {
    return false;
  }
  return true;
}

export function UA() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return 1;
  }
  if (isIOS) {
    return 0;
  }
}

export function getQueryString(name: string) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

export function delUrlQuery(name: any) {
  var loca = window.location;

  var baseUrl = loca.origin + loca.pathname + '?';
  var query = loca.search.substr(1);
  if (query.indexOf(name) > -1) {
    var obj = {};
    var arr: any[] = query.split('&');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=');
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    var url =
      baseUrl +
      JSON.stringify(obj)
        // eslint-disable-next-line no-useless-escape
        .replace(/[\"\{\}]/g, '')
        // eslint-disable-next-line no-useless-escape
        .replace(/\:/g, '=')
        // eslint-disable-next-line no-useless-escape
        .replace(/\,/g, '&');
    return url;
  } else {
    return loca.href;
  }
}

export function padStart(str: string, length: number, pad: any) {
  let charstr = String(pad);
  let len = length >> 0;
  let maxlen = Math.ceil(len / charstr.length);
  let chars = [];
  let r = String(str);
  while (maxlen--) {
    chars.push(charstr);
  }
  return chars.join('').substring(0, len - r.length) + r;
}
