(window.webpackJsonp = window.webpackJsonp || []).push([
  [250],
  {
    579: function (n, t, a) {
      'use strict';
      a.r(t);
      var e = a(6),
        o = Object(e.a)(
          {},
          function () {
            var n = this,
              t = n.$createElement,
              a = n._self._c || t;
            return a(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': n.$parent.slotKey } },
              [
                a('h1', { attrs: { id: 'line-chart' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#line-chart' } }, [n._v('#')]),
                  n._v(' Line Chart'),
                ]),
                n._v(' '),
                a('chart-editor', {
                  attrs: {
                    code: "// <block:setup:2>\nconst DATA_COUNT = 12;\nUtils.srand(110);\n\nconst actions = [\n  {\n    name: 'Randomize',\n    handler(chart) {\n      chart.data.datasets.forEach(dataset => {\n        dataset.data = generateData();\n      });\n      chart.update();\n    }\n  },\n];\n// </block:setup>\n\n// <block:data:1>\nfunction generateData() {\n  return Utils.numbers({\n    count: DATA_COUNT,\n    min: 0,\n    max: 100\n  });\n}\n\nconst data = {\n  labels: Utils.months({count: DATA_COUNT}),\n  datasets: [{\n    data: generateData()\n  }]\n};\n// </block:data>\n\n// <block:options:0>\nfunction getLineColor(ctx) {\n  return Utils.color(ctx.datasetIndex);\n}\n\nfunction alternatePointStyles(ctx) {\n  const index = ctx.dataIndex;\n  return index % 2 === 0 ? 'circle' : 'rect';\n}\n\nfunction makeHalfAsOpaque(ctx) {\n  return Utils.transparentize(getLineColor(ctx));\n}\n\nfunction adjustRadiusBasedOnData(ctx) {\n  const v = ctx.parsed.y;\n  return v < 10 ? 5\n    : v < 25 ? 7\n    : v < 50 ? 9\n    : v < 75 ? 11\n    : 15;\n}\n\nconst config = {\n  type: 'line',\n  data: data,\n  options: {\n    plugins: {\n      legend: false,\n      tooltip: true,\n    },\n    elements: {\n      line: {\n        fill: false,\n        backgroundColor: getLineColor,\n        borderColor: getLineColor,\n      },\n      point: {\n        backgroundColor: getLineColor,\n        hoverBackgroundColor: makeHalfAsOpaque,\n        radius: adjustRadiusBasedOnData,\n        pointStyle: alternatePointStyles,\n        hoverRadius: 15,\n      }\n    }\n  }\n};\n// </block:options>\n\nmodule.exports = {\n  actions,\n  config,\n};\n",
                  },
                }),
                a('h2', { attrs: { id: 'docs' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [n._v('#')]),
                  n._v(' Docs'),
                ]),
                n._v(' '),
                a('ul', [
                  a(
                    'li',
                    [
                      a('RouterLink', { attrs: { to: '/charts/line.html' } }, [n._v('Line')]),
                      n._v(' '),
                      a('ul', [
                        a('li', [a('RouterLink', { attrs: { to: '/charts/line.html#point-styling' } }, [n._v('Point Styling')])], 1),
                      ]),
                    ],
                    1
                  ),
                  n._v(' '),
                  a(
                    'li',
                    [
                      a('RouterLink', { attrs: { to: '/general/options.html' } }, [n._v('Options')]),
                      n._v(' '),
                      a('ul', [
                        a(
                          'li',
                          [a('RouterLink', { attrs: { to: '/general/options.html#scriptable-options' } }, [n._v('Scriptable Options')])],
                          1
                        ),
                      ]),
                    ],
                    1
                  ),
                  n._v(' '),
                  a(
                    'li',
                    [
                      a('RouterLink', { attrs: { to: '/general/data-structures.html' } }, [
                        n._v('Data structures ('),
                        a('code', [n._v('labels')]),
                        n._v(')'),
                      ]),
                    ],
                    1
                  ),
                ]),
              ],
              1
            );
          },
          [],
          !1,
          null,
          null,
          null
        );
      t.default = o.exports;
    },
  },
]);
