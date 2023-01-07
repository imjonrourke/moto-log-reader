<script lang="ts">
  import {parseCSV, parseCSVToArrs} from '../helpers/parseCSV';

  let table = {
      headings: [],
      body: []
  };
  let newTable = {};
  $: unselectedState = {};
  $: fileName = '';
  $: selectedHeadings = [];
  $: selectedBody = [];
  $: errorMessage = '';
  $: tableLoading = false;
  $: onSelectState = (indices: number[]) => {
    indices.map((index) => unselectedState[index] = !unselectedState[index]);
    selectedHeadings = table.headings.filter((heading, index) => {
      if (!unselectedState[index]) {
        return heading;
      }
    })
    selectedBody = table.body.map((body) => {
      return body.filter((bodyRow, index) => {
        if (!unselectedState[index]) {
          return bodyRow;
        }
      })
    });
  };
  $: loadCSV = (input: HTMLInputElement) => {
    if (input?.target.files.length) {
      let fileReader = new FileReader();
      let inputFileName = input.target.files[0].name;
      fileReader.readAsText(input.target.files[0]);
      errorMessage = '';
      tableLoading = true;
      fileReader.onload = () => {
        table = parseCSV(fileReader.result as string);
        newTable = parseCSVToArrs(fileReader.result as string);
        selectedHeadings = Object.keys(newTable);
        // selectedHeadings = table.headings;
        // selectedBody = table.body;
        fileName = inputFileName;
      };
      fileReader.readyState === 1
      fileReader.onerror = () => {
        errorMessage = 'Logs did not load properly';
        console.log('it no work');
        tableLoading = false;
      }
      fileReader.onloadend = () => {
        tableLoading = false;
      };
    }
  };
</script>

<div>
  {#if fileName}
    <p>{fileName}</p>
  {/if}
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
<div class="csv-content">
  {#if errorMessage}
    <div class="csv-content__error">
      <p>{errorMessage}</p>
    </div>
  {/if}
  {#if tableLoading}
    <div class="csv-content__loading">
      <p>loading table</p>
    </div>
  {:else}
    {#if !table.headings.length}
      <div class="csv-content__empty">
        <p>No table data</p>
      </div>
    {:else}
      <div class="csv-content__filters">
        <ul>
          <li>
            <input
                id="select-all-table"
                name="select-all-table"
                type="checkbox"
                checked={table.headings.length === selectedHeadings.length ? "checked" : ""}
                on:change={() => onSelectState(table.headings.map((h, index) => index))}
            />
            <label for="select-all-table">Select all</label>
          </li>
          {#each table.headings as heading, i}
            <li>
              <input
                  id={heading}
                  name={heading}
                  type="checkbox"
                  checked={unselectedState[i] ? "" : "checked"}
                  on:change={() => onSelectState([i])}
              />
              <label for={heading}>{heading}</label>
            </li>
          {/each}
        </ul>
      </div>
      <div class="csv-content__table csv-table">
        <table>
<!--          <thead>-->
<!--            {#each selectedHeadings as heading}-->
<!--              <th scope="col">{heading}</th>-->
<!--            {/each}-->
<!--          </thead>-->
          <tbody>
            {#each selectedHeadings as column}
              {#if !!newTable[column].length}
                <tr>
                  <th scope="row">{column}</th>
                  {#each newTable[column] as tableItem}
                    <td>{tableItem}</td>
                  {/each}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
<!--        <table>-->
<!--          <thead>-->
<!--          {#each selectedHeadings as heading}-->
<!--            <th scope="col">{heading}</th>-->
<!--          {/each}-->
<!--          </thead>-->
<!--          <tbody>-->
<!--          {#each selectedBody as tableRow}-->
<!--            <tr>-->
<!--              {#each tableRow as tableRowItem}-->
<!--                <td>{tableRowItem}</td>-->
<!--              {/each}-->
<!--            </tr>-->
<!--          {/each}-->
<!--          </tbody>-->
<!--        </table>-->
      </div>
    {/if}
  {/if}
</div>

<style>
    :root {
      --spacingBase: 8px;
      --columnWidth: calc(100% / 12);
    }
  .csv-content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 0 calc(var(--spacingBase) * 2);
  }
  .csv-content__filters {
    width: calc(var(--columnWidth) * 3);
  }
  .csv-content__table {
    width: calc(var(--columnWidth) * 10);
    overflow-x: scroll;
  }
</style>
