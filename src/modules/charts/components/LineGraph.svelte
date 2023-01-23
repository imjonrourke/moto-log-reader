<script lang="ts">
  import {beforeUpdate} from 'svelte';
  import {select} from 'd3';
  import {LineChart} from '../../../graphs/LineChart';
  import {CHART_HEIGHT, CHART_WIDTH} from "../constants";
  import type {ChartSettings} from "../types/Charts";
  export let settings: ChartSettings = {
    xAxis: '',
    yAxis: '',
    lineColor: '',
    name: '',
  };
  export let data = [];
  export let width, height;
  $: clientWidth = CHART_WIDTH;
  $: clientHeight = CHART_HEIGHT;
  let chart;
  let lineChart;
  let finalColor = settings.lineColor || "#ff3d00";
  beforeUpdate(() => {
    clientWidth = width || CHART_WIDTH;
    clientHeight = height || CHART_HEIGHT;
    lineChart = LineChart(data, {
      width: clientWidth,
      height: clientHeight,
      color: finalColor,
      x: d => d[settings.xAxis],
      y: d => d[settings.yAxis],
      // z: d => d[settings.yAxis],
    });
    if (chart) {
      select(chart).select('svg').remove();
      chart.appendChild(lineChart);
    }
  })
</script>

<p><strong>{settings.name}</strong></p>
<div bind:this={chart} />
<style></style>