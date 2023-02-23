function isPointOnLine(x, y, line) {
  const EPS = 2;
  let val =
    Math.abs(
      line.norm.x * x +
        line.norm.y * y -
        line.norm.x * line.point.x -
        line.norm.y * line.point.y
    ) / Math.sqrt(line.norm.x * line.norm.x + line.norm.y * line.norm.y);
  return val < EPS;
}

function isValidReflectionConstraint(point0, point1) {
  if (JSON.stringify(point0) === JSON.stringify(point1)) {
    return false;
  }
  return true;
}

function createReflectionConstraint(point0, point1, color, id) {
  let norm = {
    x: point0.y - point1.y,
    y: point1.x - point0.x,
  };

  let line = {
    point: point0,
    otherPoint: point1,
    norm: norm,
  };

  return {
    line: line,
    color: color,
    id: id,
    show: true,
    inInconsistentSet: false,
  };
}

export {
  isPointOnLine,
  isValidReflectionConstraint,
  createReflectionConstraint,
};
