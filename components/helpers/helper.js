const findFactor = (width, height, count, windowWidth, windowHeight) => {
  var aspectRatio = width / height;
  function isFit(factor) {
    var rowCount = Math.floor(windowWidth / (aspectRatio * factor));
    var colCount = Math.floor(windowHeight / factor);
    if (rowCount * colCount >= count) {
      return true;
    }
    return false;
  }
  function find(low, high) {
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (isFit(mid)) low = mid + 1;
      else high = mid - 1;
    }
    return low - 1;
  }

  return find(1, windowHeight + 1);
};

export default findFactor;
