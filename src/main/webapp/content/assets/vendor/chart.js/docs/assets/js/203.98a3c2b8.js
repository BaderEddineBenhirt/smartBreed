(window.webpackJsonp = window.webpackJsonp || []).push([
  [203],
  {
    533: function (n, t, a) {
      'use strict';
      a.r(t);
      var s = a(6),
        e = Object(s.a)(
          {},
          function () {
            var n = this,
              t = n.$createElement,
              a = n._self._c || t;
            return a(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': n.$parent.slotKey } },
              [
                a('h1', { attrs: { id: 'floating-bars' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#floating-bars' } }, [n._v('#')]),
                  n._v(' Floating Bars'),
                ]),
                n._v(' '),
                a('p', [
                  n._v('Using '),
                  a('code', [n._v('[number, number][]')]),
                  n._v(' as the type for '),
                  a('code', [n._v('data')]),
                  n._v(' to define the beginning and end value for each bar. This is instead of having every bar start at 0.'),
                ]),
                n._v(' '),
                a('chart-editor', {
                  attrs: {
                    code: "// <block:actions:2>\nconst actions = [\n  {\n    name: 'Randomize',\n    handler(chart) {\n      chart.data.datasets.forEach(dataset => {\n        dataset.data = chart.data.labels.map(() => {\n          return [Utils.rand(-100, 100), Utils.rand(-100, 100)];\n        });\n      });\n      chart.update();\n    }\n  },\n];\n// </block:actions>\n\n// <block:setup:1>\nconst DATA_COUNT = 7;\nconst NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};\n\nconst labels = Utils.months({count: 7});\nconst data = {\n  labels: labels,\n  datasets: [\n    {\n      label: 'Dataset 1',\n      data: labels.map(() => {\n        return [Utils.rand(-100, 100), Utils.rand(-100, 100)];\n      }),\n      backgroundColor: Utils.CHART_COLORS.red,\n    },\n    {\n      label: 'Dataset 2',\n      data: labels.map(() => {\n        return [Utils.rand(-100, 100), Utils.rand(-100, 100)];\n      }),\n      backgroundColor: Utils.CHART_COLORS.blue,\n    },\n  ]\n};\n// </block:setup>\n\n// <block:config:0>\nconst config = {\n  type: 'bar',\n  data: data,\n  options: {\n    responsive: true,\n    plugins: {\n      legend: {\n        position: 'top',\n      },\n      title: {\n        display: true,\n        text: 'Chart.js Floating Bar Chart'\n      }\n    }\n  }\n};\n// </block:config>\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n",
                  },
                }),
                a('h2', { attrs: { id: 'docs' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [n._v('#')]),
                  n._v(' Docs'),
                ]),
                n._v(' '),
                a('ul', [
                  a('li', [a('RouterLink', { attrs: { to: '/charts/bar.html' } }, [n._v('Bar')])], 1),
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
      t.default = e.exports;
    },
  },
]);