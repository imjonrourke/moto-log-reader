<script lang="ts">
  import {parseCSVToD3Arr} from '../helpers/parseCSV';
  import LineGraph from './LineGraph.svelte';
  import Chart from "../helpers/TableHelper";

  let testTable = [];
  let emptyState: { [key: string]: boolean } = {};
  const globalSettings = Chart.createBaseChart({
    xAxis: 'LogEntrySeconds',
  });
  $: selectedState = {};
  $: isCellEmpty = (value) => !selectedState[value]?.enabled;
  $: fileName = '';
  $: selectedHeadings = [];
  $: emptyHeadings = [];
  $: errorMessage = '';
  $: tableLoading = false;
  $: onNewSelectCell = (heading: string) => {
    selectedState[heading].enabled = !selectedState[heading].enabled;
  };
  $: loadCSV = (input: HTMLInputElement) => {
    if (input?.target.files.length) {
      let fileReader = new FileReader();
      let inputFileName = input.target.files[0].name;
      fileReader.readAsText(input.target.files[0]);
      errorMessage = '';
      tableLoading = true;
      fileReader.onload = () => {
        const { data, dataColumns, emptyColumns } = parseCSVToD3Arr(fileReader.result as string);
        testTable = data;
        emptyState = emptyColumns;
        selectedHeadings = Object.keys(dataColumns);
        emptyHeadings = Object.keys(emptyColumns);
        selectedState = Object.keys(dataColumns).reduce((acc, col) => {
          acc[col] = {
            enabled: dataColumns[col],
            name: col,
            xAxis: globalSettings.xAxis,
            yAxis: col,
          };
          return acc;
        }, {});
        console.log('test table', selectedState);
        fileName = inputFileName;
      };
      fileReader.readyState === 1
      fileReader.onerror = () => {
        errorMessage = 'Logs did not load properly';
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
    <div class="open-csv">
      <input
        type="file"
        accept="text/csv"
        id="open-csv"
        name="open-csv"
        class="open-csv__input"
        on:input={loadCSV}
      />
    </div>
    <label for="open-csv" class="open-csv__label">Load CSV</label>
  </form>
</div>
<div class="csv-content">
  {#if errorMessage}
    <div class="csv-content__section csv-content__error">
      <p>{errorMessage}</p>
    </div>
  {/if}
  {#if tableLoading}
    <div class="csv-content__section csv-content__loading">
      <p>loading table</p>
    </div>
  {:else}
    {#if !selectedHeadings.length}
      <div class="csv-content__section csv-content__empty">
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
              checked={selectedHeadings.length === Object.keys(selectedState).length ? "checked" : ""}
            />
            <label for="select-all-table">Select all</label>
          </li>
          {#each selectedHeadings as heading, i}
            <li>
              <input
                  id={heading}
                  name={heading}
                  type="checkbox"
                  checked={!isCellEmpty(heading) ? "checked" : ""}
                  on:change={() => onNewSelectCell(heading)}
              />
              <label for={heading}>{heading}</label>
            </li>
          {/each}
        </ul>
        <p>Empty cells</p>
        <ul>
          {#each emptyHeadings as heading}
            {#if isCellEmpty(heading)}
              <li>
                <input
                    id={`${heading}Empty`}
                    name={`${heading}Empty`}
                    type="checkbox"
                    disabled
                />
                <label for={`${heading}Empty`}>{heading}</label>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
      <div class="csv-content__table csv-table">
        {#each selectedHeadings as column}
          {#if !isCellEmpty(column)}
            <!--              <LineGraph-->
            <!--                title={column}-->
            <!--                xAxis="LogEntrySeconds"-->
            <!--                yAxis={column}-->
            <!--                data={newTable[column]}-->
            <!--              />-->
            <LineGraph
              title={column}
              xAxis={globalSettings.xAxis}
              yAxis={column}
              data={testTable}
            />
          {/if}
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  :root {
    --spacingBase: 8px;
    --columnWidth: calc(100% / 12);
  }
  .open-csv__label {
    display: block;
    text-align: center;
    color: var(--white);
    border: var(--border-size) dashed var(--white);
    padding: calc(var(--spacingBase) * 2);
    border-radius: calc(var(--spacingBase) / 2);
  }
  .csv-content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 0 calc(var(--spacingBase) * 2);
  }
  .csv-content__section {
    width: 100%;
    text-align: center;
  }
  .csv-content__filters {
    width: calc(var(--columnWidth) * 3);
  }
  .csv-content__table {
    width: calc(var(--columnWidth) * 10);
    overflow-x: scroll;
  }
</style>
