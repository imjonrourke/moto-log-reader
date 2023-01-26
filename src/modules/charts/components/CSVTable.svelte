<script lang="ts">
  import {parseCSVToD3Arr} from '../helpers/parseCSV';
  import LineGraph from './LineGraph.svelte';
  import Checkbox from '../../core/components/Checkbox.svelte';
  import Chart from "../helpers/TableHelper";

  let chartData = [];
  let emptyState: { [key: string]: boolean } = {};
  const globalSettings = Chart.createBaseChart({
    xAxis: 'LogEntrySeconds',
  });
  let emptyHeadings = [];
  let clientWidth;
  $: selectedState = {};
  $: fileName = '';
  $: selectedHeadings = [];
  $: errorMessage = '';
  $: tableLoading = false;
  $: isSelectAll = Object.keys(selectedState)
    .filter((state) => selectedState[state].enabled).length === selectedHeadings.length;
  $: isCellEmpty = (value) => !selectedState[value]?.enabled;
  const onSelectCell = (heading: string) => {
    selectedState[heading].enabled = !selectedState[heading].enabled;
  };
  const setSelectAll = (val) => {
    Object.keys(selectedState).forEach((heading) => {
      selectedState[heading].enabled = val;
    });
  };
  const onSelectAll = () => {
    let enabled = true;
    if (isSelectAll) {
      enabled = false;
    }
    setSelectAll(enabled);
  };
  const loadCSV = (input: HTMLInputElement) => {
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
          <p>Filter cells</p>
          <ul class="csv-content__filters__ul csv-content__filters__ul--data">
            <li>
              <Checkbox
                  value="select-all"
                  checked={isSelectAll ? "checked" : ""}
                  onChange={onSelectAll}
              >
                Select all
              </Checkbox>
            </li>
            {#each selectedHeadings as heading, i}
              <li>
                <Checkbox
                  value={heading}
                  checked={!isCellEmpty(heading) ? "checked" : ""}
                  onChange={() => onSelectCell(heading)}
                >
                  {heading}
                </Checkbox>
              </li>
            {/each}
          </ul>
          <p>Empty cells</p>
          <ul class="csv-content__filters__ul csv-content__filters__ul--empty">
            {#each emptyHeadings as heading}
              {#if isCellEmpty(heading)}
                <li>
                  <Checkbox
                      value={`${heading}Empty`}
                      disabled
                  >
                    {heading}
                  </Checkbox>
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

<style lang="scss">
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
    &--loaded {
      p {
        margin: 0 calc(var(--spacingBase) * 2) 0 0;
      }
    }
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
    text-align: center;
  }
  .csv-content {
    width: 100%;
    padding: 0 var(--spacingBase);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 20% 80%;
    & > * {
      padding: 0 var(--spacingBase);
      &:first-child {
        margin-left: calc(var(--spacingBase) * -1);
      }
      &:last-child {
        margin-right: calc(var(--spacingBase) * -1);
      }
    }
    &__section {
      width: 100%;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }

  .csv-content__filters__ul {
    padding: 0;
    list-style: none;
    > li {
      &:hover {
        background: var(--light-blue);
      }
    }
    &--empty {
      > li {
        &:hover {
          background: none;
        }
      }
    }
    & label {
      width: 100%;
      padding: var(--spacingBase);
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
