(window.webpackJsonp = window.webpackJsonp || []).push([
  [225],
  {
    554: function (n, t, a) {
      'use strict';
      a.r(t);
      var e = a(6),
        s = Object(e.a)(
          {},
          function () {
            var n = this,
              t = n.$createElement,
              a = n._self._c || t;
            return a(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': n.$parent.slotKey } },
              [
                a('h1', { attrs: { id: 'pie' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#pie' } }, [n._v('#')]),
                  n._v(' Pie'),
                ]),
                n._v(' '),
                a('chart-editor', {
                  attrs: {
                    code: "// <block:actions:2>\nconst actions = [\n  {\n    name: 'Randomize',\n    handler(chart) {\n      chart.data.datasets.forEach(dataset => {\n        dataset.data = Utils.numbers({count: chart.data.labels.length, min: 0, max: 100});\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Add Dataset',\n    handler(chart) {\n      const data = chart.data;\n      const newDataset = {\n        label: 'Dataset ' + (data.datasets.length + 1),\n        backgroundColor: [],\n        data: [],\n      };\n\n      for (let i = 0; i < data.labels.length; i++) {\n        newDataset.data.push(Utils.numbers({count: 1, min: 0, max: 100}));\n\n        const colorIndex = i % Object.keys(Utils.CHART_COLORS).length;\n        newDataset.backgroundColor.push(Object.values(Utils.CHART_COLORS)[colorIndex]);\n      }\n\n      chart.data.datasets.push(newDataset);\n      chart.update();\n    }\n  },\n  {\n    name: 'Add Data',\n    handler(chart) {\n      const data = chart.data;\n      if (data.datasets.length > 0) {\n        data.labels.push('data #' + (data.labels.length + 1));\n\n        for (let index = 0; index < data.datasets.length; ++index) {\n          data.datasets[index].data.push(Utils.rand(0, 100));\n        }\n\n        chart.update();\n      }\n    }\n  },\n  {\n    name: 'Remove Dataset',\n    handler(chart) {\n      chart.data.datasets.pop();\n      chart.update();\n    }\n  },\n  {\n    name: 'Remove Data',\n    handler(chart) {\n      chart.data.labels.splice(-1, 1); // remove the label first\n\n      chart.data.datasets.forEach(dataset => {\n        dataset.data.pop();\n      });\n\n      chart.update();\n    }\n  }\n];\n// </block:actions>\n\n// <block:setup:1>\nconst DATA_COUNT = 5;\nconst NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};\n\nconst data = {\n  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],\n  datasets: [\n    {\n      label: 'Dataset 1',\n      data: Utils.numbers(NUMBER_CFG),\n      backgroundColor: Object.values(Utils.CHART_COLORS),\n    }\n  ]\n};\n// </block:setup>\n\n// <block:config:0>\nconst config = {\n  type: 'pie',\n  data: data,\n  options: {\n    responsive: true,\n    plugins: {\n      legend: {\n        position: 'top',\n      },\n      title: {\n        display: true,\n        text: 'Chart.js Pie Chart'\n      }\n    }\n  },\n};\n// </block:config>\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n",
                  },
                }),
                a('h2', { attrs: { id: 'docs' } }, [
                  a('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [n._v('#')]),
                  n._v(' Docs'),
                ]),
                n._v(' '),
                a('ul', [a('li', [a('RouterLink', { attrs: { to: '/charts/doughnut.html' } }, [n._v('Doughnut and Pie Charts')])], 1)]),
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
