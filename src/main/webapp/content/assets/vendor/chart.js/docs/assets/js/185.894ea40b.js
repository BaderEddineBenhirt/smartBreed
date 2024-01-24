(window.webpackJsonp = window.webpackJsonp || []).push([
  [185],
  {
    515: function (n, t, a) {
      'use strict';
      a.r(t);
      var i = a(6),
        e = Object(i.a)(
          {},
          function () {
            var n = this,
              t = n.$createElement,
              a = n._self._c || t;
            return a(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': n.$parent.slotKey } },
              [
                a('h1', { attrs: { id: 'data-decimation' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#data-decimation' } }, [n._v('#')]),
                  n._v(' Data Decimation'),
                ]),
                n._v(' '),
                a('p', [
                  n._v(
                    'This example shows how to use the built-in data decimation to reduce the number of points drawn on the graph for improved performance.'
                  ),
                ]),
                n._v(' '),
                a('chart-editor', {
                  attrs: {
                    code: "// <block:actions:3>\nconst actions = [\n  {\n    name: 'No decimation (default)',\n    handler(chart) {\n      chart.options.plugins.decimation.enabled = false;\n      chart.update();\n    }\n  },\n  {\n    name: 'min-max decimation',\n    handler(chart) {\n      chart.options.plugins.decimation.algorithm = 'min-max';\n      chart.options.plugins.decimation.enabled = true;\n      chart.update();\n    },\n  },\n  {\n    name: 'LTTB decimation (50 samples)',\n    handler(chart) {\n      chart.options.plugins.decimation.algorithm = 'lttb';\n      chart.options.plugins.decimation.enabled = true;\n      chart.options.plugins.decimation.samples = 50;\n      chart.update();\n    }\n  },\n  {\n    name: 'LTTB decimation (500 samples)',\n    handler(chart) {\n      chart.options.plugins.decimation.algorithm = 'lttb';\n      chart.options.plugins.decimation.enabled = true;\n      chart.options.plugins.decimation.samples = 500;\n      chart.update();\n    }\n  }\n];\n// </block:actions>\n\n// <block:data:1>\nconst NUM_POINTS = 100000;\nUtils.srand(10);\n\n// parseISODate returns a luxon date object to work with in the samples\n// We will create points every 30s starting from this point in time\nconst start = Utils.parseISODate('2021-04-01T00:00:00Z').toMillis();\nconst pointData = [];\n\nfor (let i = 0; i < NUM_POINTS; ++i) {\n  // Most data will be in the range [0, 20) but some rare data will be in the range [0, 100)\n  const max = Math.random() < 0.001 ? 100 : 20;\n  pointData.push({x: start + (i * 30000), y: Utils.rand(0, max)});\n}\n\nconst data = {\n  datasets: [{\n    borderColor: Utils.CHART_COLORS.red,\n    borderWidth: 1,\n    data: pointData,\n    label: 'Large Dataset',\n    radius: 0,\n  }]\n};\n// </block:data>\n\n// <block:decimation:0>\nconst decimation = {\n  enabled: false,\n  algorithm: 'min-max',\n};\n// </block:decimation>\n\n// <block:setup:2>\nconst config = {\n  type: 'line',\n  data: data,\n  options: {\n    // Turn off animations and data parsing for performance\n    animation: false,\n    parsing: false,\n\n    interaction: {\n      mode: 'nearest',\n      axis: 'x',\n      intersect: false\n    },\n    plugins: {\n      decimation: decimation,\n    },\n    scales: {\n      x: {\n        type: 'time',\n        ticks: {\n          source: 'auto',\n          // Disabled rotation for performance\n          maxRotation: 0,\n          autoSkip: true,\n        }\n      }\n    }\n  }\n};\n// </block:setup>\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n",
                  },
                }),
                a('h2', { attrs: { id: 'docs' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [n._v('#')]),
                  n._v(' Docs'),
                ]),
                n._v(' '),
                a('ul', [
                  a('li', [a('RouterLink', { attrs: { to: '/configuration/decimation.html' } }, [n._v('Data Decimation')])], 1),
                  n._v(' '),
                  a('li', [a('RouterLink', { attrs: { to: '/charts/line.html' } }, [n._v('Line')])], 1),
                  n._v(' '),
                  a('li', [a('RouterLink', { attrs: { to: '/axes/cartesian/time.html' } }, [n._v('Time Scale')])], 1),
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
