(window.webpackJsonp = window.webpackJsonp || []).push([
  [227],
  {
    557: function (n, a, t) {
      'use strict';
      t.r(a);
      var e = t(6),
        s = Object(e.a)(
          {},
          function () {
            var n = this,
              a = n.$createElement,
              t = n._self._c || a;
            return t(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': n.$parent.slotKey } },
              [
                t('h1', { attrs: { id: 'polar-area' } }, [
                  t('a', { staticClass: 'header-anchor', attrs: { href: '#polar-area' } }, [n._v('#')]),
                  n._v(' Polar area'),
                ]),
                n._v(' '),
                t('chart-editor', {
                  attrs: {
                    code: "// <block:actions:2>\nconst actions = [\n  {\n    name: 'Randomize',\n    handler(chart) {\n      chart.data.datasets.forEach(dataset => {\n        dataset.data = Utils.numbers({count: chart.data.labels.length, min: 0, max: 100});\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Add Data',\n    handler(chart) {\n      const data = chart.data;\n      if (data.datasets.length > 0) {\n        data.labels.push('data #' + (data.labels.length + 1));\n\n        for (let index = 0; index < data.datasets.length; ++index) {\n          data.datasets[index].data.push(Utils.rand(0, 100));\n        }\n\n        chart.update();\n      }\n    }\n  },\n  {\n    name: 'Remove Data',\n    handler(chart) {\n      chart.data.labels.splice(-1, 1); // remove the label first\n\n      chart.data.datasets.forEach(dataset => {\n        dataset.data.pop();\n      });\n\n      chart.update();\n    }\n  }\n];\n// </block:actions>\n\n// <block:setup:1>\nconst DATA_COUNT = 5;\nconst NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};\n\nconst labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];\nconst data = {\n  labels: labels,\n  datasets: [\n    {\n      label: 'Dataset 1',\n      data: Utils.numbers(NUMBER_CFG),\n      backgroundColor: [\n        Utils.transparentize(Utils.CHART_COLORS.red, 0.5),\n        Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),\n        Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),\n        Utils.transparentize(Utils.CHART_COLORS.green, 0.5),\n        Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),\n      ]\n    }\n  ]\n};\n// </block:setup>\n\n// <block:config:0>\nconst config = {\n  type: 'polarArea',\n  data: data,\n  options: {\n    responsive: true,\n    plugins: {\n      legend: {\n        position: 'top',\n      },\n      title: {\n        display: true,\n        text: 'Chart.js Polar Area Chart'\n      }\n    }\n  },\n};\n// </block:config>\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n",
                  },
                }),
                t('h2', { attrs: { id: 'docs' } }, [
                  t('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [n._v('#')]),
                  n._v(' Docs'),
                ]),
                n._v(' '),
                t('ul', [t('li', [t('RouterLink', { attrs: { to: '/charts/polar.html' } }, [n._v('Polar Area Chart')])], 1)]),
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
      a.default = s.exports;
    },
  },
]);
