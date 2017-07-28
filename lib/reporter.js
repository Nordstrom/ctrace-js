"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_16yk1ecaz7 = function () {
  var path = "/Users/asaj/source/cma/ctrace-js/src/reporter.js",
      hash = "cf9444ffb1879bb9900ea7f553ff1928f77883d1",
      global = new Function('return this')(),
      gcv = "__coverage__",
      coverageData = {
    path: "/Users/asaj/source/cma/ctrace-js/src/reporter.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 4
        },
        end: {
          line: 3,
          column: 26
        }
      },
      "1": {
        start: {
          line: 4,
          column: 4
        },
        end: {
          line: 4,
          column: 42
        }
      },
      "2": {
        start: {
          line: 8,
          column: 18
        },
        end: {
          line: 8,
          column: 49
        }
      },
      "3": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 30
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 2,
            column: 2
          },
          end: {
            line: 2,
            column: 3
          }
        },
        loc: {
          start: {
            line: 2,
            column: 32
          },
          end: {
            line: 5,
            column: 3
          }
        },
        line: 2
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 7,
            column: 2
          },
          end: {
            line: 7,
            column: 3
          }
        },
        loc: {
          start: {
            line: 7,
            column: 22
          },
          end: {
            line: 10,
            column: 3
          }
        },
        line: 7
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 4,
            column: 18
          },
          end: {
            line: 4,
            column: 42
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 4,
            column: 18
          },
          end: {
            line: 4,
            column: 24
          }
        }, {
          start: {
            line: 4,
            column: 28
          },
          end: {
            line: 4,
            column: 42
          }
        }],
        line: 4
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

class Reporter {
  constructor(encoder, stream) {
    ++cov_16yk1ecaz7.f[0];
    ++cov_16yk1ecaz7.s[0];

    this.encoder = encoder;
    ++cov_16yk1ecaz7.s[1];
    this.stream = (++cov_16yk1ecaz7.b[0][0], stream) || (++cov_16yk1ecaz7.b[0][1], process.stdout);
  }

  report(spanFields) {
    ++cov_16yk1ecaz7.f[1];

    let encoded = (++cov_16yk1ecaz7.s[2], this.encoder.encode(spanFields));
    ++cov_16yk1ecaz7.s[3];
    this.stream.write(encoded);
  }
}
exports.default = Reporter;
module.exports = exports["default"];