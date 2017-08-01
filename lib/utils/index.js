function CheckForSep(param, sep) {
  let lastChar = param.substr(-1);
  if (lastChar != sep) {
    return true
  }
  return false
}

exports.addTrailingSep = function(param, sep) {
  if(CheckForSep(param, sep)) {
    return param + sep
  }
  return param
}

exports.loop = n => f => {
  let iter = i => {
    if (i === n) return
    f (i)
    iter (i + 1)
  }
  return iter (0)
}
