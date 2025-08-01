"use strict";
!(function () {
  let e, t, o, r, a, n;
  n = isDarkStyle
    ? ((e = config.colors_dark.cardColor),
      (t = config.colors_dark.textMuted),
      (o = config.colors_dark.headingColor),
      (r = config.colors_dark.borderColor),
      (a = config.colors_dark.bodyColor),
      "#3b3e59")
    : ((e = config.colors.cardColor),
      (t = config.colors.textMuted),
      (o = config.colors.headingColor),
      (r = config.colors.borderColor),
      (a = config.colors.bodyColor),
      "#f4f4f6");
  var s = {
      donut: {
        series1: config.colors.warning,
        series2: "#fdb528cc",
        series3: "#fdb52899",
        series4: "#fdb52866",
        series5: config.colors_label.warning,
      },
    },
    i = document.querySelector("#totalProfitChart"),
    l = {
      chart: {
        type: "bar",
        height: 100,
        parentHeightOffset: 0,
        stacked: !0,
        toolbar: { show: !1 },
      },
      series: [
        { name: "محصول راست", data: [44, 21, 56, 34, 47] },
        { name: "محصول چپ", data: [-27, -17, -31, -23, -31] },
      ],
      plotOptions: {
        bar: {
          horizontal: !1,
          columnWidth: "28%",
          borderRadius: 5,
          startingShape: "rounded",
          endingShape: "rounded",
        },
      },
      dataLabels: { enabled: !1 },
      tooltip: { enabled: !1 },
      stroke: { curve: "smooth", width: 1, lineCap: "round", colors: [e] },
      legend: { show: !1 },
      colors: [config.colors.secondary, config.colors.danger],
      grid: { show: !1, padding: { top: -21, right: 0, left: 0, bottom: -16 } },
      xaxis: {
        categories: ["دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه", "یکشنبه"],
        labels: { show: !1 },
        axisBorder: { show: !1 },
        axisTicks: { show: !1 },
      },
      yaxis: { show: !1 },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      responsive: [
        {
          breakpoint: 1440,
          options: { plotOptions: { bar: { columnWidth: "38%" } } },
        },
        { breakpoint: 1200, options: { chart: { height: 150 } } },
        {
          breakpoint: 992,
          options: {
            chart: { height: 100 },
            plotOptions: { bar: { columnWidth: "28%" } },
          },
        },
      ],
    },
    i =
      (null !== i && new ApexCharts(i, l).render(),
      document.querySelector("#totalGrowthChart")),
    l = {
      chart: { height: 127, parentHeightOffset: 0, type: "donut" },
      labels: [
        "" + new Date().getFullYear(),
        "" + (new Date().getFullYear() - 1),
        "" + (new Date().getFullYear() - 2),
      ],
      series: [35, 30, 23],
      colors: [
        config.colors.primary,
        config.colors.success,
        config.colors.secondary,
      ],
      stroke: { width: 5, colors: e },
      tooltip: {
        y: {
          formatter: function (e, t) {
            return parseInt(e) + "%";
          },
        },
      },
      dataLabels: {
        enabled: !1,
        formatter: function (e, t) {
          return parseInt(e) + "%";
        },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      legend: { show: !1 },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: !0,
              value: {
                fontSize: "1rem",
               fontFamily: "IRANSans",
                color: a,
                fontWeight: 600,
                offsetY: 4,
                formatter: function (e) {
                  return parseInt(e) + "%";
                },
              },
              name: { show: !1 },
              total: {
                label: "",
                show: !0,
                fontSize: "1.5rem",
                fontWeight: 600,
                formatter: function (e) {
                  return "12%";
                },
              },
            },
          },
        },
      },
    },
    i =
      (null !== i && new ApexCharts(i, l).render(),
      document.querySelector("#organicSessionsChart")),
    l = {
      chart: { height: 300, type: "donut", parentHeightOffset: 0, offsetY: 0 },
      labels: ["آمریکا", "هند", "کانادا", "ژاپن", "فرانسه"],
// ReSharper disable DuplicatingPropertyDeclarationError
      tooltip: { enabled: !1 },
// ReSharper restore DuplicatingPropertyDeclarationError
      dataLabels: { enabled: !1 },
      stroke: { width: 3, lineCap: "round", colors: [e] },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      plotOptions: {
        pie: {
          endAngle: 130,
          startAngle: -130,
          customScale: 0.9,
          donut: {
            size: "83%",
            labels: {
              show: !0,
              name: {
                offsetY: 25,
                fontSize: "50rem",
               fontFamily: "IRANSans",
                color: t,
              },
              value: {
                offsetY: -15,
                fontWeight: 500,
                fontSize: "2.125rem",
               fontFamily: "IRANSans",
                color: o,
                formatter: function (e) {
                  return parseInt(e) + "K";
                },
              },
              total: {
                show: !0,
                label: "1402",
                fontSize: "1rem",
                fontFamily: "IRANSans",
                color: t,
                formatter: function (e) {
                  return "89K";
                },
              },
            },
          },
        },
      },
      series: [13, 18, 18, 24, 16],
// ReSharper disable DuplicatingPropertyDeclarationError
      tooltip: { enabled: !1 },
// ReSharper restore DuplicatingPropertyDeclarationError
      legend: {
        position: "bottom",
       fontFamily: "IRANSans",
        fontSize: "15px",
        markers: { offsetX: -5 },
        itemMargin: { horizontal: 10 },
        offsetY: -10,
        labels: { colors: o },
      },
      colors: [
        s.donut.series1,
        s.donut.series2,
        s.donut.series3,
        s.donut.series4,
        s.donut.series5,
      ],
    };
  null !== i && new ApexCharts(i, l).render();
  const c = document.querySelector("#projectTimelineChart"),
    d = [
      "برنامه های توسعه",
      "UI طراحی",
      "IOS برنامه",
      "وب اپلیکشن Wireframing",
      "نمونه سازی",
    ],
    p = [
      "Development",
      "UI Design",
      "Application",
      "App Wireframing",
      "Prototyping",
    ],
    h = {
      chart: {
        height: 230,
        type: "rangeBar",
        parentHeightOffset: 0,
        toolbar: { show: !1 },
      },
      series: [
        {
          data: [
            {
              x: "کاترین",
              y: [
                new Date(new Date().getFullYear() + "-01-01").getTime(),
                new Date(new Date().getFullYear() + "-05-02").getTime(),
              ],
              fillColor: config.colors.primary,
            },
            {
              x: "جادل",
              y: [
                new Date(new Date().getFullYear() + "-02-18").getTime(),
                new Date(new Date().getFullYear() + "-05-30").getTime(),
              ],
              fillColor: config.colors.success,
            },
            {
              x: "ولینگتون",
              y: [
                new Date(new Date().getFullYear() + "-02-07").getTime(),
                new Date(new Date().getFullYear() + "-05-31").getTime(),
              ],
              fillColor: config.colors.secondary,
            },
            {
              x: "بلیک",
              y: [
                new Date(new Date().getFullYear() + "-01-14").getTime(),
                new Date(new Date().getFullYear() + "-06-30").getTime(),
              ],
              fillColor: config.colors.info,
            },
            {
              x: "کوین",
              y: [
                new Date(new Date().getFullYear() + "-04-01").getTime(),
                new Date(new Date().getFullYear() + "-07-31").getTime(),
              ],
              fillColor: config.colors.warning,
            },
          ],
        },
      ],
      tooltip: { enabled: !1 },
      plotOptions: {
        bar: {
          horizontal: !0,
          borderRadius: 15,
          distributed: !0,
          
          endingShape: "rounded",
          startingShape: "rounded",
          dataLabels: { hideOverflowingLabels: !1 },
        },
      },
      stroke: { width: 2, colors: [e] },
      dataLabels: {
        enabled: !0,
        style: { fontWeight: 400 },
        formatter: function (e, t) {
          return d[t.dataPointIndex];
        },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      legend: { show: !1 },
      grid: {
        strokeDashArray: 6,
        borderColor: r,
        xaxis: { lines: { show: !0 } },
        yaxis: { lines: { show: !1 } },
        padding: { top: -32, left: 15, right: 18, bottom: 4 },
      },
      xaxis: {
        type: "datetime",
        axisTicks: { show: !1 },
        axisBorder: { show: !1 },
        labels: {
          style: { colors: t },
          datetimeFormatter: { year: "MMM", month: "MMM" },
        },
      },
      yaxis: {
        labels: {
          show: !0,
          align: "left",
          style: { fontSize: "0.875rem", colors: o },
        },
      },
      responsive: [
        {
          breakpoint: 446,
          options: {
            dataLabels: {
              formatter: function (e, t) {
                return p[t.dataPointIndex];
              },
            },
          },
        },
      ],
    };
  null !== c && new ApexCharts(c, h).render();
  (s = document.querySelector("#weeklyOverviewChart")),
    (i = {
      chart: {
        type: "line",
        height: 178,
        offsetY: -9,
        offsetX: -16,
        parentHeightOffset: 0,
        toolbar: { show: !1 },
      },
      series: [
        { name: "فروش", type: "column", data: [83, 68, 56, 65, 65, 50, 39] },
        { name: "فروش", type: "line", data: [63, 38, 31, 45, 46, 27, 18] },
      ],
      plotOptions: {
        bar: {
          borderRadius: 9,
          columnWidth: "35%",
          endingShape: "rounded",
          startingShape: "rounded",
          colors: {
            ranges: [{ to: 50, from: 40, color: config.colors.primary }],
          },
        },
      },
      markers: {
        size: 3.5,
        strokeWidth: 2,
        fillOpacity: 1,
        strokeOpacity: 1,
        colors: [e],
        strokeColors: config.colors.primary,
      },
      stroke: { width: [0, 2], colors: [config.colors.primary] },
      dataLabels: { enabled: !1 },
      legend: { show: !1 },
      colors: [n],
      grid: { strokeDashArray: 10, borderColor: r, padding: { bottom: -10 } },
      xaxis: {
        categories: ["دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه", "یکشنبه"],
        tickPlacement: "on",
        labels: { show: !1 },
        axisBorder: { show: !1 },
        axisTicks: { show: !1 },
      },
      yaxis: {
        min: 0,
        max: 90,
        show: !0,
        tickAmount: 3,
        labels: {
          formatter: function (e) {
            return parseInt(e) + "K";
          },
          style: { fontSize: "0.75rem",fontFamily: "IRANSans", colors: t },
        },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      responsive: [
        {
          breakpoint: 1462,
          options: { plotOptions: { bar: { columnWidth: "40%" } } },
        },
        {
          breakpoint: 1388,
          options: {
            plotOptions: { bar: { columnWidth: "45%", borderRadius: 8 } },
          },
        },
        {
          breakpoint: 1030,
          options: { plotOptions: { bar: { columnWidth: "48%" } } },
        },
        {
          breakpoint: 992,
          options: { plotOptions: { bar: { columnWidth: "28%" } } },
        },
        {
          breakpoint: 874,
          options: { plotOptions: { bar: { columnWidth: "38%" } } },
        },
        {
          breakpoint: 768,
          options: {
            plotOptions: { bar: { columnWidth: "28%", borderRadius: 10 } },
          },
        },
        {
          breakpoint: 500,
          options: { plotOptions: { bar: { borderRadius: 7 } } },
        },
        {
          breakpoint: 393,
          options: { plotOptions: { bar: { borderRadius: 6 } } },
        },
      ],
    }),
    null !== s && new ApexCharts(s, i).render(),
    (l = document.querySelector("#monthlyBudgetChart")),
    (s = {
      chart: {
        height: 235,
        type: "area",
        parentHeightOffset: 0,
        offsetY: -8,
        toolbar: { show: !1 },
      },
      tooltip: { enabled: !1 },
      dataLabels: { enabled: !1 },
      stroke: { width: 5, curve: "smooth" },
      series: [{ data: [0, 85, 25, 125, 90, 250, 200, 350] }],
      grid: { show: !1, padding: { left: 10, top: 0, right: 12 } },
      fill: {
        type: "gradient",
        gradient: {
          opacityTo: 0.7,
          opacityFrom: 0.5,
          shadeIntensity: 1,
          stops: [0, 90, 100],
          colorStops: [
            [
              { offset: 0, opacity: 0.6, color: config.colors.success },
              { offset: 100, opacity: 0.1, color: e },
            ],
          ],
        },
      },
      theme: {
        monochrome: {
          enabled: !0,
          shadeTo: "light",
          shadeIntensity: 1,
          color: config.colors.success,
        },
      },
      xaxis: {
        type: "numeric",
        labels: { show: !1 },
        axisTicks: { show: !1 },
        axisBorder: { show: !1 },
      },
      yaxis: { show: !1 },
      markers: {
        size: 1,
        offsetY: 1,
        offsetX: -5,
        strokeWidth: 4,
        strokeOpacity: 1,
        colors: ["transparent"],
        strokeColors: "transparent",
        discrete: [
          {
            size: 7,
            seriesIndex: 0,
            dataPointIndex: 7,
            strokeColor: config.colors.success,
            fillColor: e,
          },
        ],
      },
      responsive: [
        { breakpoint: 1200, options: { chart: { height: 255 } } },
        { breakpoint: 992, options: { chart: { height: 300 } } },
        { breakpoint: 768, options: { chart: { height: 240 } } },
      ],
    }),
    null !== l && new ApexCharts(l, s).render(),
    (i = document.querySelector("#externalLinksChart")),
    (l = {
      chart: {
        type: "bar",
        height: 330,
        parentHeightOffset: 0,
        stacked: !0,
        toolbar: { show: !1 },
      },
      series: [
        { name: "گوگل انالیتیکس", data: [155, 135, 320, 100, 150, 335, 160] },
        { name: "تبلیغات فیس بوک", data: [110, 235, 125, 230, 215, 115, 200] },
      ],
      plotOptions: {
        bar: {
          horizontal: !1,
          columnWidth: "40%",
          borderRadius: 10,
          startingShape: "rounded",
          endingShape: "rounded",
        },
      },
      dataLabels: { enabled: !1 },
      tooltip: { enabled: !1 },
      stroke: { curve: "smooth", width: 6, lineCap: "round", colors: [e] },
      legend: { show: !1 },
      colors: [config.colors.primary, config.colors.secondary],
      grid: {
        strokeDashArray: 10,
        borderColor: r,
        padding: { top: -12, left: -4, right: -5, bottom: 5 },
      },
      xaxis: {
        categories: ["دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه", "یکشنبه"],
        labels: { show: !1 },
        axisBorder: { show: !1 },
        axisTicks: { show: !1 },
      },
      yaxis: { show: !1 },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      responsive: [
        {
          breakpoint: 1441,
          options: { plotOptions: { bar: { columnWidth: "50%" } } },
        },
        {
          breakpoint: 1025,
          options: { plotOptions: { bar: { columnWidth: "55%" } } },
        },
        {
          breakpoint: 992,
          options: { plotOptions: { bar: { columnWidth: "40%" } } },
        },
        {
          breakpoint: 768,
          options: { plotOptions: { bar: { columnWidth: "28%" } } },
        },
        {
          breakpoint: 577,
          options: { plotOptions: { bar: { columnWidth: "35%" } } },
        },
        {
          breakpoint: 426,
          options: { plotOptions: { bar: { columnWidth: "50%" } } },
        },
      ],
    }),
    null !== i && new ApexCharts(i, l).render(),
    (s = $(".datatables-crm"));
  s.length &&
    s.DataTable({
      ajax: assetsPath + "json/table-dashboards.json",
      dom: "t",
      columns: [
        { data: "id" },
        { data: "name" },
        { data: "email" },
        { data: "role" },
        { data: "status" },
      ],
      columnDefs: [
        { targets: 0, searchable: !1, visible: !1 },
        {
          targets: 1,
          render: function (e, t, o, r) {
            var a,
              n = o.image,
              s = o.name,
              o = o.username;
            return (
              '<div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar avatar-sm me-2">' +
              (a = n
                ? '<img src="' +
                  assetsPath +
                  "img/avatars/" +
                  n +
                  '" alt="Avatar" class="rounded-circle">'
                : a) +
              '</div></div><div class="d-flex flex-column"><span class="name text-truncate">' +
              s +
              '</span><small class="user_name text-truncate text-muted">@' +
              o +
              "</small></div></div>"
            );
          },
        },
        {
          targets: -2,
          render: function (e, t, o, r) {
            var o = o.role,
              a = {
                Admin: { icon: "mdi mdi-laptop", class: "danger" },
                Editor: { icon: "mdi mdi-pencil-outline", class: "info" },
                Author: { icon: "mdi mdi-cog-outline", class: "warning" },
                Maintainer: { icon: "mdi mdi-chart-donut", class: "success" },
                Subscriber: {
                  icon: "mdi mdi-account-outline",
                  class: "primary",
                },
              };
            return void 0 === a[o]
              ? e
              : '<span class="d-flex align-items-center gap-2"><i class="' +
                  a[o].icon +
                  " text-" +
                  a[o].class +
                  '"></i>' +
                  o +
                  "</span>";
          },
        },
        {
          targets: -1,
          render: function (e, t, o, r) {
            var o = o.status,
              a = {
                1: { title: "Pending", class: "bg-label-warning" },
                2: { title: "Active", class: " bg-label-success" },
                3: { title: "Inactive", class: " bg-label-secondary" },
              };
            return void 0 === a[o]
              ? e
              : '<span class="badge rounded-pill ' +
                  a[o].class +
                  '">' +
                  a[o].title +
                  "</span>";
          },
        },
      ],
      order: [[0, "asc"]],
    });
})();
