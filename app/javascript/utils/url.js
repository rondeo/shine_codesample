export function objToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export function toSnakeCase(str) {
  return str.replace(/([A-Z])/g, function($1) {
    return "_" + $1.toLowerCase()
  })
}
