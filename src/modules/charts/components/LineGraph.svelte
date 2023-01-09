<script lang="ts">
  import {onMount} from 'svelte';
  import {LineChart} from '../../../graphs/LineChart';
  export let data = [];
  export let title = '';
  export let xAxis = '';
  export let yAxis = '';
  let chart;
  onMount(() => {
    const child = LineChart(data, {
      width: 500,
      height: 300,
      color: "steelblue",
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