export function isUnixHiddenFolder(directory) {
  return (/(\/|^|.)\.[^\/\.]/g).test(directory);
}

export function isUnixHiddenFile(file) {
  return Boolean(file.charAt(0) == '.' && file !== '.boojumrc');
}
