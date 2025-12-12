const noData = {
  id: "noData",
  afterDatasetsDraw: (chart, args, plugins) => {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right, height, width },
    } = chart;

    ctx.save();
    if (data.datasets.length == 0) {
      ctx.fillStyle = "rgba(102, 102, 102, 0.5)";
      ctx.fillRect(left, top, width, height);
      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("No Data.Please fill in at least one form", left + width / 2, top + height / 2);
    }
  },
};

export default { noData };
