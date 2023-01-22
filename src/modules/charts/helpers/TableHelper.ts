import type {BaseChartSettings, ChartSettings} from "../types/Charts";

export interface Chart {
  createBaseChart: (settings: BaseChartSettings) => BaseChartSettings;
  createChart: (settings: ChartSettings) => ChartSettings;
}

export const Chart: Chart = {
  createBaseChart: (settings) => {
    return {
      xAxis: settings.xAxis,
    };
  },
  createChart: (settings) => {
    return {
      name: settings.name,
      xAxis: settings.xAxis,
      yAxis: settings.yAxis,
      lineColor: settings.lineColor,
    };
  },
};

export default Chart;
