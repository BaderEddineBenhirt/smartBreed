(window.webpackJsonp = window.webpackJsonp || []).push([
  [220],
  {
    550: function (n, t, e) {
      'use strict';
      e.r(t);
      var l = e(6),
        s = Object(l.a)(
          {},
          function () {
            var n = this,
              t = n.$createElement,
              e = n._self._c || t;
            return e(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': n.$parent.slotKey } },
              [
                e('h1', { attrs: { id: 'line-styling' } }, [
                  e('a', { staticClass: 'header-anchor', attrs: { href: '#line-styling' } }, [n._v('#')]),
                  n._v(' Line Styling'),
                ]),
                n._v(' '),
                e('chart-editor', {
                  attrs: {
                    code: "// <block:setup:1>\nconst DATA_COUNT = 7;\nconst NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};\n\nconst labels = Utils.months({count: DATA_COUNT});\nconst data = {\n  labels: labels,\n  datasets: [\n    {\n      label: 'Unfilled',\n      fill: false,\n      backgroundColor: Utils.CHART_COLORS.blue,\n      borderColor: Utils.CHART_COLORS.blue,\n      data: Utils.numbers(NUMBER_CFG),\n    }, {\n      label: 'Dashed',\n      fill: false,\n      backgroundColor: Utils.CHART_COLORS.green,\n      borderColor: Utils.CHART_COLORS.green,\n      borderDash: [5, 5],\n      data: Utils.numbers(NUMBER_CFG),\n    }, {\n      label: 'Filled',\n      backgroundColor: Utils.CHART_COLORS.red,\n      borderColor: Utils.CHART_COLORS.red,\n      data: Utils.numbers(NUMBER_CFG),\n      fill: true,\n    }\n  ]\n};\n// </block:setup>\n\n// <block:config:0>\nconst config = {\n  type: 'line',\n  data: data,\n  options: {\n    responsive: true,\n    plugins: {\n      title: {\n        display: true,\n        text: 'Chart.js Line Chart'\n      },\n    },\n    interaction: {\n      mode: 'index',\n      intersect: false\n    },\n    scales: {\n      x: {\n        display: true,\n        title: {\n          display: true,\n          text: 'Month'\n        }\n      },\n      y: {\n        display: true,\n        title: {\n          display: true,\n          text: 'Value'\n        }\n      }\n    }\n  },\n};\n// </block:config>\n\nmodule.exports = {\n  actions: [],\n  config: config,\n};\n",
                  },
                }),
                e('h2', { attrs: { id: 'docs' } }, [
                  e('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [n._v('#')]),
                  n._v(' Docs'),
                ]),
                n._v(' '),
                e('ul', [
                  e(
                    'li',
                    [
                      e('RouterLink', { attrs: { to: '/general/data-structures.html' } }, [
                        n._v('Data structures ('),
                        e('code', [n._v('labels')]),
                        n._v(')'),
                      ]),
                    ],
                    1
                  ),
                  n._v(' '),
                  e(
                    'li',
                    [
                      e('RouterLink', { attrs: { to: '/charts/line.html' } }, [n._v('Line')]),
                      n._v(' '),
                      e('ul', [e('li', [e('RouterLink', { attrs: { to: '/charts/line.html#line-styling' } }, [n._v('Line Styling')])], 1)]),
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
      t.default = s.exports;
    },
  },
]);
