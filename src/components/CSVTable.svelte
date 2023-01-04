<script lang="ts">
  import { parseCSV } from '../helpers/parseCSV';

  $: table = {
      headings: [],
      body: []
  };
  $: selectedHeadings = [];
  $: selectedBody = [];
  $: errorMessage = '';
  $: tableLoading = false;
  $: loadCSV = (input: HTMLInputElement) => {
    let fileReader = new FileReader();
    fileReader.readAsText(input?.target.files[0]);
    errorMessage = '';
    tableLoading = true;
    fileReader.onload = () => {
      table = parseCSV(fileReader.result as string);
      selectedHeadings = table.headings;
      selectedBody = table.body;
    };
    fileReader.readyState === 1
    fileReader.onerror = () => {
      errorMessage = 'Logs did not load properly';
      console.log('it no work');
    }
    fileReader.onloadend = () => {
      tableLoading = false;
    };
  };

</script>

<div>
  <form action="#">
    <input
      type="file"
      accept="text/csv"
      id="open-csv"
      name="open-csv"
      class="open-csv open-csv--input"
      on:input={loadCSV}
    />
    <label for="open-csv" class="open-csv--label">Load CSV</label>
  </form>
</div>
<div class="csv-table">
  <ul>
    {#each table.headings as heading}
      <li>
        <input
          id={heading}
          name={heading}
          type="checkbox"
        />
        <label for={heading}>{heading}</label>
      </li>
    {/each}
  </ul>
  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}
  {#if tableLoading}
    <p>table is loading</p>
  {:else}
    {#if !table.headings.length}
      <p>No table data</p>
    {/if}
    <table>
      <thead>
      {#each table.headings as heading}
        {#if heading}
          <th scope="col">{heading}</th>
        {/if}
      {/each}
      </thead>
      <tbody>
      {#each table.body as tableRow}
        <tr>
          {#each tableRow as tableRowItem}
            <td>{tableRowItem}</td>
          {/each}
        </tr>
      {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .counter button {
    width: 2em;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background-color: transparent;
    touch-action: manipulation;
    font-size: 2rem;
  }
</style>
