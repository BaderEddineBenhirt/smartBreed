(window.webpackJsonp = window.webpackJsonp || []).push([
  [239],
  {
    569: function (t, n, e) {
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
                e('h1', { attrs: { id: 'title-configuration' } }, [
                  e('a', { staticClass: 'header-anchor', attrs: { href: '#title-configuration' } }, [t._v('#')]),
                  t._v(' Title Configuration'),
                ]),
                t._v(' '),
                e('p', [t._v('This sample shows how to configure the title of an axis including alignment, font, and color.')]),
                t._v(' '),
                e('chart-editor', {
                  attrs: {
                    code: "// <block:setup:1>\nconst DATA_COUNT = 7;\nconst NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};\nconst data = {\n  labels: Utils.months({count: DATA_COUNT}),\n  datasets: [\n    {\n      label: 'Dataset 1',\n      data: Utils.numbers(NUMBER_CFG),\n      fill: false,\n      borderColor: Utils.CHART_COLORS.red,\n      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),\n    },\n    {\n      label: 'Dataset 2',\n      data: Utils.numbers(NUMBER_CFG),\n      fill: false,\n      borderColor: Utils.CHART_COLORS.blue,\n      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),\n    }\n  ]\n};\n// </block:setup>\n\n// <block:config:0>\nconst config = {\n  type: 'line',\n  data: data,\n  options: {\n    responsive: true,\n    scales: {\n      x: {\n        display: true,\n        title: {\n          display: true,\n          text: 'Month',\n          color: '#911',\n          font: {\n            family: 'Comic Sans MS',\n            size: 20,\n            weight: 'bold',\n            lineHeight: 1.2,\n          },\n          padding: {top: 20, left: 0, right: 0, bottom: 0}\n        }\n      },\n      y: {\n        display: true,\n        title: {\n          display: true,\n          text: 'Value',\n          color: '#191',\n          font: {\n            family: 'Times',\n            size: 20,\n            style: 'normal',\n            lineHeight: 1.2\n          },\n          padding: {top: 30, left: 0, right: 0, bottom: 0}\n        }\n      }\n    }\n  },\n};\n// </block:config>\n\nmodule.exports = {\n  actions: [],\n  config: config,\n};\n",
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
                      e('RouterLink', { attrs: { to: '/general/data-structures.html' } }, [
                        t._v('Data structures ('),
                        e('code', [t._v('labels')]),
                        t._v(')'),
                      ]),
                    ],
                    1
                  ),
                  t._v(' '),
                  e('li', [e('RouterLink', { attrs: { to: '/axes/styling.html' } }, [t._v('Axes Styling')])], 1),
                  t._v(' '),
                  e(
                    'li',
                    [
                      e('RouterLink', { attrs: { to: '/axes/cartesian/' } }, [t._v('Cartesian Axes')]),
                      t._v(' '),
                      e('ul', [
                        e(
                          'li',
                          [
                            e('RouterLink', { attrs: { to: '/axes/cartesian/#common-options-to-all-cartesian-axes' } }, [
                              t._v('Common options to all cartesian axes'),
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
                      e('RouterLink', { attrs: { to: '/axes/labelling.html' } }, [t._v('Labeling Axes')]),
                      t._v(' '),
                      e('ul', [
                        e(
                          'li',
                          [
                            e('RouterLink', { attrs: { to: '/axes/labelling.html#scale-title-configuration' } }, [
                              t._v('Scale Title Configuration'),
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
