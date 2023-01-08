<script lang="ts">
  export let data = [];
  export let title = '';
</script>

<tr>
  <th scope="row">{title}</th>
  {#each data as item}
    <td>{item}</td>
  {/each}
</tr>
<style></style>