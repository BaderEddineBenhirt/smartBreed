(window.webpackJsonp = window.webpackJsonp || []).push([
  [237],
  {
    567: function (t, n, e) {
      'use strict';
      e.r(n);
      var a = e(6),
        o = Object(a.a)(
          {},
          function () {
            var t = this,
              n = t.$createElement,
              e = t._self._c || n;
            return e(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': t.$parent.slotKey } },
              [
                e('h1', { attrs: { id: 'grid-configuration' } }, [
                  e('a', { staticClass: 'header-anchor', attrs: { href: '#grid-configuration' } }, [t._v('#')]),
                  t._v(' Grid Configuration'),
                ]),
                t._v(' '),
                e('p', [
                  t._v(
                    'This sample shows how to use scriptable grid options for an axis to control styling. In this case, the Y axis grid lines are colored based on their value. In addition, booleans are provided to toggle different parts of the X axis grid visibility.'
                  ),
                ]),
                t._v(' '),
                e('chart-editor', {
                  attrs: {
                    code: "// <block:actions:2>\nconst actions = [\n  {\n    name: 'Randomize',\n    handler(chart) {\n      chart.data.datasets.forEach(dataset => {\n        dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});\n      });\n      chart.update();\n    }\n  },\n];\n// </block:actions>\n\n// <block:setup:1>\nconst DATA_COUNT = 7;\nconst data = {\n  labels: Utils.months({count: DATA_COUNT}),\n  datasets: [\n    {\n      label: 'Dataset 1',\n      data: [10, 30, 39, 20, 25, 34, -10],\n      fill: false,\n      borderColor: Utils.CHART_COLORS.red,\n      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),\n    },\n    {\n      label: 'Dataset 2',\n      data: [18, 33, 22, 19, 11, -39, 30],\n      fill: false,\n      borderColor: Utils.CHART_COLORS.blue,\n      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),\n    }\n  ]\n};\n// </block:setup>\n\n// <block:config:0>\n// Change these settings to change the display for different parts of the X axis\n// grid configuiration\nconst DISPLAY = true;\nconst BORDER = true;\nconst CHART_AREA = true;\nconst TICKS = true;\n\nconst config = {\n  type: 'line',\n  data: data,\n  options: {\n    responsive: true,\n    plugins: {\n      title: {\n        display: true,\n        text: 'Grid Line Settings'\n      }\n    },\n    scales: {\n      x: {\n        grid: {\n          display: DISPLAY,\n          drawBorder: BORDER,\n          drawOnChartArea: CHART_AREA,\n          drawTicks: TICKS,\n        }\n      },\n      y: {\n        grid: {\n          drawBorder: false,\n          color: function(context) {\n            if (context.tick.value > 0) {\n              return Utils.CHART_COLORS.green;\n            } else if (context.tick.value < 0) {\n              return Utils.CHART_COLORS.red;\n            }\n\n            return '#000000';\n          },\n        },\n      }\n    }\n  },\n};\n// </block:config>\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n",
                  },
                }),
                e('h2', { attrs: { id: 'docs' } }, [
                  e('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [t._v('#')]),
                  t._v(' Docs'),
                ]),
                t._v(' '),
                e('ul', [
                  e('li', [e('RouterLink', { attrs: { to: '/charts/line.html' } }, [t._v('Line')])], 1),
                  t._v(' '),
                  e(
                    'li',
                    [
                      e('RouterLink', { attrs: { to: '/general/options.html' } }, [t._v('Options')]),
                      t._v(' '),
                      e('ul', [
                        e(
                          'li',
                          [
                            e('RouterLink', { attrs: { to: '/general/options.html#scriptable-options' } }, [t._v('Scriptable Options')]),
                            t._v(' '),
                            e('ul', [
                              e('li', [e('RouterLink', { attrs: { to: '/general/options.html#tick' } }, [t._v('Tick Context')])], 1),
                            ]),
                          ],
                          1
                        ),
                      ]),
                    ],
                    1
                  ),
                  t._v(' '),
                  e(
                    'li',
                    [
                      e('RouterLink', { attrs: { to: '/general/data-structures.html' } }, [
                        t._v('Data structures ('),
                        e('code', [t._v('labels')]),
                        t._v(')'),
                      ]),
                    ],
                    1
                  ),
                  t._v(' '),
                  e(
                    'li',
                    [
                      e('RouterLink', { attrs: { to: '/axes/styling.html' } }, [t._v('Axes Styling')]),
                      t._v(' '),
                      e('ul', [
                        e(
                          'li',
                          [
                            e('RouterLink', { attrs: { to: '/axes/styling.html#grid-line-configuration' } }, [
                              t._v('Grid Line Configuration'),
                            ]),
                          ],
                          1
                        ),
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
      n.default = o.exports;
    },
  },
]);