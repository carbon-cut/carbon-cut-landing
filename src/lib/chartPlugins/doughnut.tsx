import { Plugin } from "chart.js/auto";
import { TabValues } from "../formTabs/types";
import { getIcon, getSvg } from "../formTabs/geters";
import React from 'react';

const doughtPlugin: Plugin<"doughnut", any> = {
  id: "DoughnutIcon",
  afterDatasetsDraw(chart) {
    const {
      ctx,
      data: { datasets, labels },
    } = chart;
    const chartData = chart.getDatasetMeta(0).data;

    chartData.forEach((datapoint, i) => {
      //@ts-ignore
      const { x, y } = datapoint.getCenterPoint();
      const value = datasets[0].data[i];
      const label = labels ? labels[i] : "";
      const image = new Image();
      image.src = `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/tabs/${getSvg(label as TabValues)}.svg`;

      const sumOfValues = datasets[0].data.reduce((acc, val) => acc + val);
      ctx.textBaseline = "middle";

      const textX = x - ctx.measureText(value.toString()).width / 2;

      ctx.drawImage(image, x - 12, y - 12);
    });
  },
};

export default doughtPlugin;