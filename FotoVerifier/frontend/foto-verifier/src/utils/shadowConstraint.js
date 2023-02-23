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

function isValidCastShadowConstraint(point0, point1, point2) {
  if (JSON.stringify(point0) === JSON.stringify(point1)) {
    return false;
  }
  if (JSON.stringify(point0) === JSON.stringify(point2)) {
    return false;
  }
  if (JSON.stringify(point1) === JSON.stringify(point2)) {
    return false;
  }
  return true;
}

function isValidAttachedShadowConstraint(point0, point1) {
  if (JSON.stringify(point0) === JSON.stringify(point1)) {
    return false;
  }
  return true;
}

function createAttachedShadowConstraint(
  point0,
  point1,
  color,
  canvasWidth,
  canvasHeight,
  id
) {
  let norm = {
    x: point0.y - point1.y,
    y: point1.x - point0.x,
  };

  let line = {
    point: point0,
    otherPoint: point1,
    norm: norm,
  };

  let p1 = point0;
  let p2 = point1;
  let a = p2.x - p1.x;
  let b = p2.y - p1.y;
  let A = {
    x: 0,
    y: (a * p1.x) / b + p1.y,
  };
  let B = {
    x: (b * p1.y) / a + p1.x,
    y: 0,
  };
  let C = {
    x: canvasWidth,
    y: (-a * (canvasWidth - p1.x)) / b + p1.y,
  };
  let D = {
    x: (-b * (canvasHeight - p1.y)) / a + p1.x,
    y: canvasHeight,
  };
  let line1 = {
    point: {
      x: 0,
      y: 0,
    },
    otherPoint: {
      x: 0,
      y: 0,
    },
    norm: {
      x: point1.x - point0.x,
      y: point1.y - point0.y,
    },
  };
  let arr = [A, B, C, D];
  let found = false;
  for (let i = 0; i < arr.length; ++i) {
    if (found) {
      break;
    }
    for (let j = i + 1; j < arr.length; ++j) {
      if (
        arr[i].x >= 0 &&
        arr[i].x <= canvasWidth &&
        arr[i].y >= 0 &&
        arr[i].y <= canvasHeight &&
        arr[j].x >= 0 &&
        arr[j].x <= canvasWidth &&
        arr[j].y >= 0 &&
        arr[j].y <= canvasHeight
      ) {
        line1.point = arr[i];
        line1.otherPoint = arr[j];
        found = true;
        break;
      }
    }
  }

  return {
    direction: line,
    line: line1,
    color: color,
    id: id,
    show: true,
    inInconsistentSet: false,
  };
}

function createCastShadowConstraint(point0, point1, point2, color, id) {
  let norm1 = {
    x: point0.y - point1.y,
    y: point1.x - point0.x,
  };

  if (
    norm1.x * point2.x +
      norm1.y * point2.y -
      norm1.x * point0.x -
      norm1.y * point0.y <
    0
  ) {
    norm1.x = -norm1.x;
    norm1.y = -norm1.y;
  }

  let norm2 = {
    x: point0.y - point2.y,
    y: point2.x - point0.x,
  };

  if (
    norm2.x * point1.x +
      norm2.y * point1.y -
      norm2.x * point0.x -
      norm2.y * point0.y <
    0
  ) {
    norm2.x = -norm2.x;
    norm2.y = -norm2.y;
  }

  let line1 = {
    point: point0,
    otherPoint: point1,
    norm: norm1,
  };

  let line2 = {
    point: point0,
    otherPoint: point2,
    norm: norm2,
  };

  return {
    line1: line1,
    line2: line2,
    color: color,
    id: id,
    show: true,
    inInconsistentSet: false,
  };
}

export {
  isPointOnLine,
  isValidCastShadowConstraint,
  createCastShadowConstraint,
  isValidAttachedShadowConstraint,
  createAttachedShadowConstraint,
};
