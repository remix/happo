'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = alignArrays;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var MOVEMENT = {
  none: 0,
  upLeft: 1,
  up: 2,
  left: 3
};

var PLACEHOLDER = exports.PLACEHOLDER = '+';
var DRIFT_RANGE = 200;

/**
 * Creates a 2d matrix of a certain size.
 *
 * @param {number} height
 * @param {number} width
 * @return {Array<Array>}
 */
function initMatrix(height, width) {
  var rows = new Array(height);
  for (var i = 0; i < rows.length; i += 1) {
    rows[i] = new Int32Array(width);
  }
  return rows;
}

/**
 * Compute a solution matrix to find the longest common subsequence between two
 * arrays. Adapted from
 * http://algorithms.tutorialhorizon.com/dynamic-programming-longest-common-subsequence/
 *
 * @param {Array} a
 * @param {Array} b
 * @return {Array<Array>} a matrix containing MOVEMENT markers
 */
function longestCommonSubsequence(a, b) {
  var aLength = a.length;
  var bLength = b.length;
  var memo = initMatrix(aLength + 1, bLength + 1);
  var solution = initMatrix(aLength + 1, bLength + 1);

  // Loop and find the solution
  for (var i = 1; i <= aLength; i += 1) {
    for (var j = Math.max(1, i - DRIFT_RANGE / 2); j <= Math.min(bLength, i + DRIFT_RANGE / 2); j += 1) {
      if (a[i - 1] === b[j - 1]) {
        // upLeft
        memo[i][j] = memo[i - 1][j - 1] + 1;
        solution[i][j] = MOVEMENT.upLeft;
      } else {
        memo[i][j] = Math.max(memo[i - 1][j], memo[i][j - 1]);
        if (memo[i][j] === memo[i - 1][j]) {
          solution[i][j] = MOVEMENT.up;
        } else {
          solution[i][j] = MOVEMENT.left;
        }
      }
    }
  }
  return solution;
}

/**
 * Constructs an array of placeholder strings, e.g.
 * ['x', 'x', 'x'].
 *
 * @param {number} count
 * @return Array<String>
 */
function placeholders(count) {
  return new Array(count).fill(PLACEHOLDER);
}

/**
 * Apply an lcs solution to arrays. Note that this will MUTATE the arrays,
 * injecting "+" where gaps are needed.
 *
 * @param {Array<Array>} solution as computed by `longestCommonSubsequence`
 * @param {Array} a
 * @param {Array} b
 */
function applySolution(solution, a, b) {
  // Start at the bottom right end of the solution
  var ai = a.length;
  var bi = b.length;
  var changes = 0;

  var movement = solution[ai][bi];
  while (movement !== MOVEMENT.none) {
    if (movement === MOVEMENT.upLeft) {
      if (changes < 0) {
        b.splice.apply(b, [bi, 0].concat(_toConsumableArray(placeholders(Math.abs(changes)))));
      } else if (changes > 0) {
        a.splice.apply(a, [ai, 0].concat(_toConsumableArray(placeholders(changes))));
      }
      ai -= 1;
      bi -= 1;
      changes = 0;
    } else if (movement === MOVEMENT.left) {
      bi -= 1;
      changes += 1;
    } else if (movement === MOVEMENT.up) {
      ai -= 1;
      changes -= 1;
    }
    movement = solution[ai][bi];
  }

  // Pad the shorter array
  var aLength = a.length;
  var bLength = b.length;
  var shorterArray = aLength > bLength ? b : a;
  shorterArray.splice.apply(shorterArray, [0, 0].concat(_toConsumableArray(placeholders(Math.abs(aLength - bLength)))));
}

/**
 * Computes the longest common subsequence of two arrays, then uses that
 * solution to inject gaps into the arrays, making them align on common
 * subsequences.
 *
 * @param {Array} a
 * @param {Array} b
 */
function alignArrays(a, b) {
  var lcsSolution = longestCommonSubsequence(a, b);
  applySolution(lcsSolution, a, b);
}