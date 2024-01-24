(window.webpackJsonp = window.webpackJsonp || []).push([
  [209],
  {
    539: function (e, n, o) {
      'use strict';
      o.r(n);
      var t = o(6),
        a = Object(t.a)(
          {},
          function () {
            var e = this,
              n = e.$createElement,
              o = e._self._c || n;
            return o(
              'ContentSlotsDistributor',
              { attrs: { 'slot-key': e.$parent.slotKey } },
              [
                o('h1', { attrs: { id: 'events' } }, [
                  o('a', { staticClass: 'header-anchor', attrs: { href: '#events' } }, [e._v('#')]),
                  e._v(' Events'),
                ]),
                e._v(' '),
                o('p', [e._v('This sample demonstrates how to use the event hooks to highlight chart elements.')]),
                e._v(' '),
                o('chart-editor', {
                  attrs: {
                    code: "\n// <block:data:3>\nconst data = {\n  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],\n  datasets: [{\n    label: '# of Votes',\n    data: [12, 19, 3, 5, 2, 3],\n    borderWidth: 1,\n    backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'],\n  }]\n};\n// </block:data>\n\n// <block:handleHover:1>\n// Append '4d' to the colors (alpha channel), except for the hovered index\nfunction handleHover(evt, item, legend) {\n  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {\n    colors[index] = index === item.index || color.length === 9 ? color : color + '4D';\n  });\n  legend.chart.update();\n}\n// </block:handleHover>\n\n// <block:handleLeave:2>\n// Removes the alpha channel from background colors\nfunction handleLeave(evt, item, legend) {\n  legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {\n    colors[index] = color.length === 9 ? color.slice(0, -2) : color;\n  });\n  legend.chart.update();\n}\n// </block:handleLeave>\n\n// <block:config:0>\nconst config = {\n  type: 'pie',\n  data: data,\n  options: {\n    plugins: {\n      legend: {\n        onHover: handleHover,\n        onLeave: handleLeave\n      }\n    }\n  }\n};\n// </block:config>\n\nmodule.exports = {\n  config\n};\n",
                  },
                }),
                o('h2', { attrs: { id: 'docs' } }, [
                  o('a', { staticClass: 'header-anchor', attrs: { href: '#docs' } }, [e._v('#')]),
                  e._v(' Docs'),
                ]),
                e._v(' '),
                o('ul', [
                  o('li', [o('RouterLink', { attrs: { to: '/charts/doughnut.html' } }, [e._v('Doughnut and Pie Charts')])], 1),
                  e._v(' '),
                  o(
                    'li',
                    [
                      o('RouterLink', { attrs: { to: '/configuration/legend.html' } }, [e._v('Legend')]),
                      e._v(' '),
                      o('ul', [o('li', [o('code', [e._v('onHover')])]), e._v(' '), o('li', [o('code', [e._v('onLeave')])])]),
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
      n.default = a.exports;
    },
  },
]);
