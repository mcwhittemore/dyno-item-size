var dynoItemSize = module.exports = function(record) {
  return Object.keys(record).reduce(function(s, k) {
    var v = record[k];
    s += new Buffer(k, 'utf8').length;
    if (typeof v === 'string') s += new Buffer(v, 'utf8').length;
    else if(typeof v === 'number') {
      var len = v.toString(2).length;
      len = len > 38 ? 38 : len;
      s += len;
    }
    else s += v.length;
    return s;
  }, 0);
};

module.exports.read = function(record) {
  var size = dynoItemSize(record);
  return Math.ceil(size/1024/4);
};

module.exports.write = function(record) {
  var size = dynoItemSize(record);
  return Math.ceil(size/1024);
};

module.exports.storage = function(record) {
  var size = dynoItemSize(record);
  return size + 100;
};
