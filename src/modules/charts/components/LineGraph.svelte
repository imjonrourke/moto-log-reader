<script lang="ts">
  import {onMount} from 'svelte';
  import {LineChart} from '../../../graphs/LineChart';
  import {CHART_HEIGHT, CHART_WIDTH} from "../constants";
  export let data = [];
  export let title = '';
  export let xAxis = '';
  export let yAxis = '';
  export let color = '';
  let chart;
  let finalColor = color || "#ff3d00";
  onMount(() => {
    const child = LineChart(data, {
      width: CHART_WIDTH,
      height: CHART_HEIGHT,
      color: finalColor,
      x: d => d[xAxis],
      y: d => d[yAxis],
    });
    chart.appendChild(child);
  })
</script>

<p><strong>{title}</strong></p>
<div bind:this={chart} />
<!--<tr>-->
<!--  <th scope="row">{title}</th>-->
<!--  {#each data as item}-->
<!--    <td>{item}</td>-->
<!--  {/each}-->
<!--</tr>-->
<style></style>