(window.webpackJsonp = window.webpackJsonp || []).push([
  [234],
  {
    564: function (t, n, a) {
      'use strict';
      a.r(n);
      var e = a(6),
        s = Object(e.a)(
          {},
          function () {
            var t = this,
              n = t.$createElement,
              a = t._self._c || n;
            return a(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': t.$parent.slotKey } },
              [
                a('h1', { attrs: { id: 'doughnut-empty-state' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#doughnut-empty-state' } }, [t._v('#')]),
                  t._v(' Doughnut Empty State'),
                ]),
                t._v(' '),
                a('chart-editor', {
                  attrs: {
                    code: "// <block:data:2>\nconst data = {\n  labels: [],\n  datasets: [\n    {\n      label: 'Dataset 1',\n      data: []\n    }\n  ]\n};\n// </block:data>\n\n// <block:plugin:1>\nconst plugin = {\n  id: 'emptyDoughnut',\n  afterDraw(chart, args, options) {\n    const {datasets} = chart.data;\n    const {color, width, radiusDecrease} = options;\n    let hasData = false;\n\n    for (let i = 0; i < datasets.length; i += 1) {\n      const dataset = datasets[i];\n      hasData |= dataset.data.length > 0;\n    }\n\n    if (!hasData) {\n      const {chartArea: {left, top, right, bottom}, ctx} = chart;\n      const centerX = (left + right) / 2;\n      const centerY = (top + bottom) / 2;\n      const r = Math.min(right - left, bottom - top) / 2;\n\n      ctx.beginPath();\n      ctx.lineWidth = width || 2;\n      ctx.strokeStyle = color || 'rgba(255, 128, 0, 0.5)';\n      ctx.arc(centerX, centerY, (r - radiusDecrease || 0), 0, 2 * Math.PI);\n      ctx.stroke();\n    }\n  }\n};\n// </block:plugin>\n\n// <block:config:0>\nconst config = {\n  type: 'doughnut',\n  data: data,\n  options: {\n    plugins: {\n      emptyDoughnut: {\n        color: 'rgba(255, 128, 0, 0.5)',\n        width: 2,\n        radiusDecrease: 20\n      }\n    }\n  },\n  plugins: [plugin]\n};\n// </block:config>\n\nconst actions = [\n  {\n    name: 'Randomize',\n    handler(chart) {\n      chart.data.datasets.forEach(dataset => {\n        dataset.data = Utils.points(NUMBER_CFG);\n      });\n      chart.update();\n    }\n  },\n];\n\nmodule.exports = {\n  actions,\n  config,\n};\n",
                  },
                }),
                a('h2', { attrs: { id: 'docs' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [t._v('#')]),
                  t._v(' Docs'),
                ]),
                t._v(' '),
                a('ul', [
                  a(
                    'li',
                    [
                      a('RouterLink', { attrs: { to: '/general/data-structures.html' } }, [
                        t._v('Data structures ('),
                        a('code', [t._v('labels')]),
                        t._v(')'),
                      ]),
                    ],
                    1
                  ),
                  t._v(' '),
                  a('li', [a('RouterLink', { attrs: { to: '/developers/plugins.html' } }, [t._v('Plugins')])], 1),
                  t._v(' '),
                  a('li', [a('RouterLink', { attrs: { to: '/charts/doughnut.html' } }, [t._v('Doughnut and Pie Charts')])], 1),
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
      n.default = s.exports;
    },
  },
]);
