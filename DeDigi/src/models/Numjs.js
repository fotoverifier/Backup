/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
class Numjs {
  /**
   * @param {number[][]} arr array of nD dimestion (n > 1)
   * @result 2D array of [row, col]
   */
  getDimensions(arr) {
    // [row, col]
    return [
      arr.length, // row
      arr.reduce((x, y) => Math.max(x, y.length), 0), // col
    ];
  }

  /**
   * @param {number} row - size of row
   * @param {number} col - size of column
   * @param {number} inner - size of inner block
   * @result Array of <4 dimension filled with 0s
   */
  zeros(row, col = null, inner = null) {
    if (!col) return Array(row).fill(0);
    if (!inner)
      return Array(row)
        .fill(0)
        .map(() => Array.from({ length: col }, () => 0));
    return Array(row)
      .fill(0)
      .map(() => Array.from({ length: col }, () => Array(inner).fill(0)));
  }

  /**
   * @param {number} row size of row
   * @param {number} col size of column
   * @param {number} inner size of inner block
   * @result Array of <4 dimension filled with 1s
   */
  ones(row, col = null, inner = null) {
    if (!col) return Array(row).fill(1);
    if (!inner)
      return Array(row)
        .fill(1)
        .map(() => Array.from({ length: col }, () => 1));
    return Array(row)
      .fill(1)
      .map(() => Array.from({ length: col }, () => Array(inner).fill(1)));
  }

  /**
   * @param {number} val number to be rounded
   * @param {"normal" | "up" | "down" | "round"} type type of rounding numbers
   * @return Integer of the floating number
   */
  roundValue(val, type = 'normal') {
    switch (type) {
      case 'up':
        return Math.ceil(val);
      case 'down':
        return Math.floor(val);
      case 'round': {
        const integer = Math.floor(val);
        const decimal = val - integer;
        if (integer % 2 === 0 && decimal === 0.5) return integer;
        if (integer % 2 !== 0 && decimal === 0.5) return integer + 1;
        return Math.round(val);
      }
      default:
        return Math.round(val);
    }
  }

  /**
   * @param {number} numOne first number for arithmetic operation
   * @param {number} numTwo second number for arithmetic opeation
   * @param {"add" | "sub" | "mul" | "div"} type arithemtic operation
   * @return Result of arithemtic operation
   */
  arithmeticOp(numOne, numTwo, type = 'add') {
    switch (type) {
      case 'sub':
        return numOne - numTwo;
      case 'mul':
        return numOne * numTwo;
      case 'div':
        return numOne / numTwo ? numOne / numTwo : 0;
      default:
        return numOne + numTwo;
    }
  }

  /**
   * @param {number[]} arr array of floating numbers
   * @param {"normal" | "up" | "down" | "round"} type type of rounding numbers
   * @return Array of integers
   */
  round(arr, type = 'normal') {
    // normal, up, down, round
    // normal: to the closest number, if .5 round up
    // round: to the closest number, if .5 and odd round up, if .5 and even round down

    return arr.map((outer) => {
      if (typeof outer === 'number') return this.roundValue(outer, type);
      return outer.map((inner) => {
        if (typeof inner === 'number') return this.roundValue(inner, type);
        return inner.map((val) => {
          return this.roundValue(val, type);
        });
      });
    });
  }

  /**
   * @param {number[]} arr array of integers [-,+]
   * @return Array of natural numbers
   */
  absolute(arr) {
    return arr.map((outer) => {
      if (typeof outer === 'number') return Math.abs(outer);
      return outer.map((inner) => {
        if (typeof inner === 'number') return Math.abs(inner);
        return inner.map((val) => {
          return Math.abs(val);
        });
      });
    });
  }

  /**
   * Check if values in an array are equal with a value
   * @param {number[]} arr array of integers
   * @param {number} val value to be compared with
   * @return Array of boolean values
   */
  checkEqualIn2DArray(arr, val) {
    return arr.map((outer) => {
      if (typeof outer === 'number') return outer === val;
      return outer.map((inner) => {
        if (typeof inner === 'number') return inner === val;
        return inner.map((num) => {
          return num === val;
        });
      });
    });
  }

  /**
   * Repeat the original array horizontally and vertically
   * @param {number[][]} mat
   * @param {number[]} matShape
   * @param {number} repeatRows
   * @param {number} repeatColumns
   * @return A 2D array repeated with the original array
   */
  repmat2By2(mat, matShape, repeatRows, repeatColumns) {
    const numberOfColumns = matShape[1] * repeatColumns;
    const numberOfRows = matShape[0] * repeatRows;
    const values = Array(numberOfRows)
      .fill(true)
      .map(() => Array.from({ length: numberOfColumns }, () => true));

    for (let y = 0; y < numberOfRows; y += 1) {
      for (let x = 0; x < numberOfColumns; x += 1) {
        values[y][x] = mat[y % matShape[1]][x % matShape[0]];
      }
    }

    return values;
  }

  /**
   * Assign a 2D array's row as a 3D array's column
   * @param {number[][][]} arr original array
   * @param {number[][]} mat array to be copied into the original
   * @param {number} pos index of the column to be copied into
   * @param {boolean} isBool check for conversion from (false, true) to (0,1)
   * @return The original array with 3rd dimension from another array
   */
  assignRowAtColIndex(arr, mat, pos, isBool = false) {
    const tmpArr = [...arr];
    if (isBool) {
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
          tmpArr[i][j][pos] = mat[i][j] ? 1 : 0;
        }
      }
    } else {
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
          tmpArr[i][j][pos] = mat[i][j];
        }
      }
    }
    return tmpArr;
  }

  /**
   * Assign a 2D|3D array's column as a 2D|3D array's row
   * @param {number[][][]} arr original array
   * @param {number[][]} mat array to be copied into the original
   * @param {number} pos1 index of the column to be copied into
   * @param {number} pos2 index of the column to be copied from
   * @param {boolean} isBool check for conversion from (false, true) to (0,1)
   * @return The original array with a column copied from another array
   */
  assignColumnAtColIndex(arr, mat, pos1, pos2, isBool = false) {
    // 1d
    // 2d
    if (typeof arr[0][0] === 'number') {
      const tmpArr = [...arr];
      if (isBool) {
        for (let i = 0; i < arr.length; i += 1) {
          tmpArr[i][pos1] = mat[i][pos2] ? 1 : 0;
        }
      } else {
        for (let i = 0; i < arr.length; i += 1) {
          tmpArr[i][pos1] = mat[i][pos2];
        }
      }
      return tmpArr;
    }
    // 3d
    if (typeof arr[0][0][0] === 'number') {
      const tmpArr = [...arr];
      if (isBool) {
        for (let i = 0; i < arr.length; i += 1) {
          for (let j = 0; j < arr[i].length; j += 1) {
            tmpArr[i][j][pos1] = mat[i][j][pos2] ? 1 : 0;
          }
        }
      } else {
        for (let i = 0; i < arr.length; i += 1) {
          for (let j = 0; j < arr[i].length; j += 1) {
            tmpArr[i][j][pos1] = mat[i][j][pos2];
          }
        }
      }
      return tmpArr;
    }
  }

  /**
   * Get position of the 3rd dimension block in a 3D array
   * @param {number[][][]} arr array to be copied into the original
   * @param {number} pos2 index of the column to be copied from
   * @return A new array with each row is the column of the inputted array
   */
  getColumnAtIndex(arr, pos) {
    const tmp = this.zeros(arr.length, arr[0].length);
    // let tmp = Array(arr.length).fill(0).map(() => Array.from({length:arr[0].length}, () => 0))
    arr.forEach((outer, i) => {
      outer.forEach((inner, j) => {
        tmp[i][j] = arr[i][j][pos];
      });
    });
    return tmp;
  }

  /**
   * Conversion from integer to floating number with assigned decimal place
   * @param {number} num integer to be converted
   * @param {number} decPlaces number of decimal places to be put into plus 1
   * @return A string as a floating number
   */
  intToFloat(num, decPlaces = 0) {
    return `${num}.${Array(decPlaces + 1).join('0')}`;
  }

  /**
   * Peform arithmetic operation on 2 equal size arrays
   * @param {number} arrOne first array for arithmetic operation
   * @param {number} arrTwo second array for arithmetic opeation
   * @param {"add" | "sub" | "mul" | "div"} type arithemtic operation
   * @return Result of arithemtic operation
   */
  arithmeticEqualSizeArray(arrOne, arrTwo, type = 'add') {
    return arrOne.map((outer, idxOut) => {
      if (typeof outer === 'number') return this.arithmeticOp(arrOne[idxOut], arrTwo[idxOut], type);
      return outer.map((inner, idxIn) => {
        if (typeof inner === 'number') return this.arithmeticOp(arrOne[idxOut][idxIn], arrTwo[idxOut][idxIn], type);
        return inner.map((val, idx) => {
          return this.arithmeticOp(val, arrTwo[idxOut][idxIn][idx], type);
        });
      });
    });
  }

  /**
   * Calculates the power of an array to a number
   * @param {number[][]} arr array of <4 dimension
   * @param {number} val value to be powered by the array
   * @return Original array with each value powered to a number
   */
  power(arr, val) {
    if (typeof val !== 'number') {
      return arr.map((outer, idxOut) => {
        if (typeof outer === 'number') return outer ** val[idxOut];
        return outer.map((inner, idxIn) => {
          if (typeof inner === 'number') return inner ** val[idxOut][idxIn];
          return inner.map((val2, idx) => {
            return inner ** val2[idxOut][idxIn][idx];
          });
        });
      });
    }
    return arr.map((outer) => {
      if (typeof outer === 'number') return outer ** val;
      return outer.map((inner) => {
        if (typeof inner === 'number') return inner ** val;
        return inner.map((val2) => {
          return inner ** val2;
        });
      });
    });
  }

  diffAxis2By2(arr) {
    const tmp = Array(1)
      .fill(0)
      .map(() => Array.from({ length: 2 }, () => 0));
    return tmp.map((outer, idxOut) => {
      return outer.map((_, idxIn) => {
        return arr[idxOut + 1][idxIn] - arr[idxOut][idxIn];
      });
    });
  }

  // transpose(arr) {
  //   return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]))
  // }

  argwhere(arr, val, type = 'eq') {
    // eq: arr === val
    // lte: arr <= val
    // gte: arr >= val
    // gt: arr > val
    // lt: arr < val
    // val: array or number or boolean
    const whereArr = [];
    if (typeof val !== 'object') {
      switch (type) {
        case 'lte':
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer <= val) whereArr.push([idxOut]);
            }
            outer.forEach((inner, idxIn) => {
              if (inner <= val) whereArr.push([idxOut, idxIn]);
            });
          });
          break;
        case 'gte':
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer >= val) whereArr.push([idxOut]);
            }
            outer.forEach((inner, idxIn) => {
              if (inner >= val) whereArr.push([idxOut, idxIn]);
            });
          });
          break;
        case 'gt':
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer > val) whereArr.push([idxOut]);
            }
            outer.forEach((inner, idxIn) => {
              if (inner > val) whereArr.push([idxOut, idxIn]);
            });
          });
          break;
        case 'lt':
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer < val) whereArr.push([idxOut]);
            }
            outer.forEach((inner, idxIn) => {
              if (inner < val) whereArr.push([idxOut, idxIn]);
            });
          });
          break;
        default:
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer === val) whereArr.push([idxOut]);
            }
            outer.forEach((inner, idxIn) => {
              if (inner === val) whereArr.push([idxOut, idxIn]);
            });
          });
          break;
      }
    } else {
      return [];
    }

    return whereArr;
  }

  compare(arr, val, type = 'eq') {
    // eq: arr === val
    // lte: arr <= val
    // gte: arr >= val
    // gt: arr > val
    // lt: arr < val
    // val: array or number or boolean

    if (typeof val !== 'object') {
      switch (type) {
        case 'lte':
          return arr.map((outer) => {
            if (typeof outer === 'number') {
              if (outer <= val) return true;
              return false;
            }
            return outer.map((inner) => {
              if (typeof inner === 'number') {
                if (inner <= val) return true;
                return false;
              }
              return inner.map((innerVal) => {
                if (innerVal <= val) return true;
                return false;
              });
            });
          });
        case 'gte':
          return arr.map((outer) => {
            if (typeof outer === 'number') {
              if (outer >= val) return true;
              return false;
            }
            return outer.map((inner) => {
              if (typeof inner === 'number') {
                if (inner >= val) return true;
                return false;
              }
              return inner.map((innerVal) => {
                if (innerVal >= val) return true;
                return false;
              });
            });
          });
        case 'gt':
          return arr.map((outer) => {
            if (typeof outer === 'number') {
              if (outer > val) return true;
              return false;
            }
            return outer.map((inner) => {
              if (typeof inner === 'number') {
                if (inner > val) return true;
                return false;
              }
              return inner.map((innerVal) => {
                if (innerVal > val) return true;
                return false;
              });
            });
          });
        case 'lt':
          return arr.map((outer) => {
            if (typeof outer === 'number') {
              if (outer < val) return true;
              return false;
            }
            return outer.map((inner) => {
              if (typeof inner === 'number') {
                if (inner < val) return true;
                return false;
              }
              return inner.map((innerVal) => {
                if (innerVal < val) return true;
                return false;
              });
            });
          });
        default:
          return arr.map((outer) => {
            if (typeof outer === 'number') {
              if (outer === val) return true;
              return false;
            }
            return outer.map((inner) => {
              if (typeof inner === 'number') {
                if (inner === val) return true;
                return false;
              }
              return inner.map((innerVal) => {
                if (innerVal === val) return true;
                return false;
              });
            });
          });
      }
    } else {
      return [];
    }
  }

  sumByAxisZero(arr) {
    let sumArr = [];
    if (typeof arr[0][0] === 'number')
      sumArr = Array(arr[0].length)
        .fill(0)
        .map(() => 0);
    else
      sumArr = Array(arr[0].length)
        .fill(0)
        .map(() => Array.from({ length: arr[0][0].length }, () => 0));
    return sumArr.map((outer, idxOut) => {
      if (typeof outer === 'number') {
        let sum = 0;
        for (let i = 0; i < arr.length; i += 1) {
          sum += arr[i][idxOut];
        }
        return sum;
      }
      return outer.map((_, idxIn) => {
        let sum = 0;
        for (let i = 0; i < arr.length; i += 1) {
          sum += arr[i][idxOut][idxIn];
        }
        return sum;
      });
    });
  }

  sumByAxisOne(arr) {
    const sumArr = Array(arr.length)
      .fill(0)
      .map(() => Array.from({ length: arr[0][0].length }, () => 0));

    return sumArr.map((outer, idxOut) => {
      return outer.map((_, idxIn) => {
        let sum = 0;
        for (let i = 0; i < arr[0].length; i += 1) {
          sum += arr[idxOut][i][idxIn];
        }
        return sum;
      });
    });
  }

  sumByAxisTwo(arr) {
    const sumArr = Array(arr.length)
      .fill(0)
      .map(() => Array.from({ length: arr[0].length }, () => 0));

    return sumArr.map((outer, idxOut) => {
      return outer.map((_, idxIn) => {
        let sum = 0;
        for (let i = 0; i < arr[0][0].length; i += 1) {
          sum += arr[idxOut][idxIn][i];
        }
        return sum;
      });
    });
  }

  sumByAxis(arr, axis = 0) {
    if (axis === 0) return this.sumByAxisZero(arr);
    if (axis === 1) return this.sumByAxisOne(arr);
    if (axis === 2) return this.sumByAxisTwo(arr);
  }

  sumArray(arr) {
    let arrSum = 0;
    arr.forEach((outer) => {
      if (typeof outer === 'number') {
        arrSum += outer;
      } else if (typeof outer === 'object') {
        outer.forEach((inner) => {
          if (typeof inner === 'number') {
            arrSum += inner;
          } else if (typeof inner === 'object') {
            inner.forEach((val) => {
              arrSum += val;
            });
          }
        });
      }
    });
    return arrSum;
  }

  correlate(originalLayer, kernel) {
    const dim = this.getDimensions([...originalLayer]);
    const interpolatedLayer = this.zeros(dim[0], dim[1]);

    for (let x = 0; x < dim[0]; x += 1) {
      for (let y = 0; y < dim[1]; y += 1) {
        let sum = 0;
        for (let i = 0; i < 3; i += 1) {
          for (let j = 0; j < 3; j += 1) {
            if (!originalLayer[x - 1 + i] || !originalLayer[x - 1 + i][y - 1 + j]) sum += 0;
            else sum += kernel[i][j] * parseFloat([...originalLayer][x - 1 + i][y - 1 + j]);
          }
        }
        interpolatedLayer[x][y] = sum;
      }
    }

    return interpolatedLayer;
  }

  slice(arr, rangeRow, rangeCol = null, rangeInner = null) {
    let tmp = [];
    // let rowStart;
    // let rowEnd;
    let colStart;
    let colEnd;
    let innerStart;
    let innerEnd;
    const rowStart = rangeRow[0] ? rangeRow[0] : 0;
    const rowEnd = rangeRow[1] ? rangeRow[1] : arr.length;

    tmp = arr.slice(rowStart, rowEnd);

    if (rangeCol) {
      colStart = rangeCol[0] ? rangeCol[0] : 0;
      colEnd = rangeCol[1] ? rangeCol[1] : arr[0].length;
      tmp = tmp.map((outer) => {
        return outer.slice(colStart, colEnd);
      });
    }

    if (rangeInner) {
      innerStart = rangeInner[0] ? rangeInner[0] : 0;
      innerEnd = rangeInner[1] ? rangeInner[1] : arr[0][0].length;
      tmp = tmp.map((outer) => {
        return outer.map((inner) => {
          return inner.slice(innerStart, innerEnd);
        });
      });
    }

    return tmp;
  }

  equalOneDArray(arrOne, arrTwo, check) {
    const arr = [];
    arrOne.forEach((outer, idxOut) => {
      if (typeof outer === 'number') {
        if (arrTwo[idxOut] === check) arr.push(outer);
      }
      outer.forEach((inner, idxIn) => {
        if (typeof inner === 'number') {
          if (arrTwo[idxOut][idxIn] === check) arr.push(inner);
        }
        inner.forEach((val, idx) => {
          if (arrTwo[idxOut][idxIn][idx] === check) arr.push(val);
        });
      });
    });
    return arr;
  }

  arithmeticOnArray(arr, num, type = 'add') {
    // add, sub, mul, div
    return arr.map((outer) => {
      if (typeof outer === 'number') return this.arithmeticOp(outer, num, type);
      return outer.map((inner) => {
        if (typeof inner === 'number') return this.arithmeticOp(inner, num, type);
        return inner.map((val) => {
          return this.arithmeticOp(val, num, type);
        });
      });
    });
  }

  arithmeticArrayOnArray(arrOne, arrTwo, type = 'add') {
    // add, sub, mul, div
    return arrOne.map((outer, idxOut) => {
      if (typeof outer === 'number') return this.arithmeticOp(outer, arrTwo[idxOut], type);
      return outer.map((inner, idxIn) => {
        if (typeof inner === 'number') return this.arithmeticOp(inner, arrTwo[idxOut][idxIn], type);
        return inner.map((val, idx) => {
          return this.arithmeticOp(val, arrTwo[idxOut][idxIn][idx], type);
        });
      });
    });
  }

  arithmeticImgArrayOnArray(arrOne, arrTwo, type = 'sub') {
    // add, sub, mul, div
    return arrOne.map((outer, idxOut) => {
      if (typeof outer === 'number') {
        const res = this.arithmeticOp(outer, arrTwo[idxOut], type);
        if (res > 255) return 255;
        if (res < 0) return 256 + res;
        return res;
      }
      return outer.map((inner, idxIn) => {
        if (typeof inner === 'number') {
          const res = this.arithmeticOp(inner, arrTwo[idxOut][idxIn], type);
          if (res > 255) return 255;
          if (res < 0) return 256 + res;
          return res;
        }
        return inner.map((val, idx) => {
          const res = this.arithmeticOp(val, arrTwo[idxOut][idxIn][idx], type);
          if (res > 255) return 255;
          if (res < 0) return 256 + res;
          return res;
        });
      });
    });
  }

  arithmeticOnImgArray(arr, num, type = 'add') {
    // add, sub, mul, div
    return arr.map((outer) => {
      if (typeof outer === 'number') {
        const res = this.arithmeticOp(outer, num, type);
        if (res > 256 || res < 0) return outer;
        return res;
      }
      return outer.map((inner) => {
        if (typeof inner === 'number') {
          const res = this.arithmeticOp(inner, num, type);
          if (res > 256 || res < 0) return inner;
          return res;
        }
        return inner.map((val) => {
          const res = this.arithmeticOp(val, num, type);
          if (res > 256 || res < 0) return val;
          return res;
        });
      });
    });
  }
}

export default Numjs;
