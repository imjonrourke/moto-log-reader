<script lang="ts">
  import {parseCSVToD3Arr} from '../helpers/parseCSV';
  import LineGraph from './LineGraph.svelte';
  import Chart from "../helpers/TableHelper";

  let chartData = [];
  let emptyState: { [key: string]: boolean } = {};
  const globalSettings = Chart.createBaseChart({
    xAxis: 'LogEntrySeconds',
  });
  let emptyHeadings = [];
  let clientWidth;
  $: selectedState = {};
  $: isCellEmpty = (value) => !selectedState[value]?.enabled;
  $: fileName = '';
  $: selectedHeadings = [];
  $: errorMessage = '';
  $: tableLoading = false;
  $: onSelectCell = (heading: string) => {
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
        chartData = data;
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
        // console.log('test table', selectedState);
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

<div class={`csv-subheading ${fileName && 'csv-subheading--loaded'}`}>
  <p>Evo X</p>
  <div class={`csv-load ${fileName && 'csv-load--loaded'}`}>
    {#if fileName}
      <p>{fileName}</p>
    {/if}
    <div class="csv-load__input">
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
  </div>
</div>

{#if errorMessage}
  <div class="csv-state">
    <p>{errorMessage}</p>
  </div>
{/if}
{#if tableLoading}
  <div class="csv-state">
    <p>loading charts</p>
  </div>
{:else}
  {#if !selectedHeadings.length}
    <div class="csv-state csv-content__empty">
      <p>No table data</p>
    </div>
  {:else}
    <div class="csv-content">
      {#if !selectedHeadings.length}
        <div class="csv-content__section csv-content__empty">
          <p>No table data</p>
        </div>
      {:else}
        <div class="csv-content__filters">
          <ul class="csv-content__filters__ul">
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
                    on:change={() => onSelectCell(heading)}
                />
                <label for={heading}>{heading}</label>
              </li>
            {/each}
          </ul>
          <p>Empty cells</p>
          <ul class="csv-content__filters__ul">
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
        <div class="csv-content__charts" bind:clientWidth={clientWidth}>
          {#each selectedHeadings as column}
            {#if !isCellEmpty(column)}
              <LineGraph
                settings={selectedState[column]}
                data={chartData}
                width={clientWidth}
              />
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  {/if}
{/if}

<style>
  :root {
    --spacingBase: 8px;
    --columnWidth: calc(100% / 12);
  }
  .csv-subheading {
    width: 100%;
    padding: var(--spacingBase) 1rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .csv-subheading--loaded {
    border-bottom: var(--border-size) solid var(--light-blue);
  }
  .csv-subheading.csv-subheading--loaded {
    flex-direction: row;
    justify-content: space-between;
  }
  .csv-load {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .csv-load--loaded p {
    margin: 0 calc(var(--spacingBase) * 2) 0 0;
  }
  .open-csv__input {
    display: none;
  }
  .open-csv__label {
    display: block;
    text-align: center;
    color: var(--white);
    border: var(--border-size) dashed var(--white);
    padding: calc(var(--spacingBase) * 2);
    border-radius: calc(var(--spacingBase) / 2);
  }
  .csv-state {
    /*width: 100%;*/
    /*display: flex;*/
    /*align-items: center;*/
    text-align: center;
  }
  .csv-content {
    width: 100%;
    padding: 0 calc(var(--spacingBase) * 2);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 20% 80%;
  }
  .csv-content__section {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .csv-content__filters__ul {
    padding: 0;
    list-style: none;
  }
  .csv-content__filters__ul li {
    display: flex;
    align-items: flex-start;
  }
  .csv-content__filters__ul > li {
    padding: 0;
    list-style: none;
  }
  .csv-content__filters__ul label {
    width: 100%;
    padding: var(--spacingBase);
  }
  .csv-content__filters__ul label:hover {
    cursor: pointer;
  }
  .csv-content__filters__ul > li:hover {
    background: var(--light-blue);
  }
  /*.csv-content__filters {*/
  /*  width: calc(var(--columnWidth) * 3);*/
  /*}*/
  .csv-content__charts {
    /*width: calc(var(--columnWidth) * 10);*/
    /*overflow-x: scroll;*/
    padding: 0 0 0 calc(var(--spacingBase) * 2);
  }
</style>
