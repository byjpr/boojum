export function isTmpFile(path) {
  var last = path[path.length - 1];
  return last === '%' || last === '~';
}

export function isHiddenFile(path) {
  return /(^|\/)[_\.]/.test(path);
}
