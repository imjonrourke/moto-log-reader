import type {ChartSettings} from "../types/Charts";

export interface Chart {
  createChart: (data: any[], settings: ChartSettings) => ChartSettings;
}

export const Chart: Chart = {
  createChart: (data, settings) => {
    return {
      name: settings.name,
      xAxis: settings.xAxis,
      yAxis: settings.yAxis,
      lineColor: settings.lineColor,
    };
  },
};

export default Chart;
