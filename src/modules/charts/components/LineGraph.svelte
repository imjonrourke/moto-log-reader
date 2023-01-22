<script lang="ts">
  import {onMount} from 'svelte';
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
  $: finalWidth = width ?? CHART_WIDTH;
  $: finalHeight = height ?? CHART_HEIGHT;
  let chart;
  let finalColor = settings.lineColor || "#ff3d00";
  console.log('client width', finalWidth);
  onMount(() => {
    const child = LineChart(data, {
      width: finalWidth,
      height: finalHeight,
      color: finalColor,
      x: d => d[settings.xAxis],
      y: d => d[settings.yAxis],
    });
    chart.appendChild(child);
  })
</script>

<p><strong>{settings.name}</strong></p>
<div bind:this={chart} />
<style></style>