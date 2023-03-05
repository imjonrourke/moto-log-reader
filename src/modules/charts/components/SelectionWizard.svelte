<script lang="ts">
  import CreateCar from "./CreateCar.svelte";
  enum WizardStatus {
    SelectCar,
    UploadLog,
    TrimLog,
  }
  $: currentState = '';
  $: loading = true;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      currentState = WizardStatus.SelectCar;
      resolve(WizardStatus.SelectCar);
      loading = false;
    }, 300);
  });
</script>
<div>
  {#if loading}
    <div class="loading">loading...</div>
  {/if}
  {#if currentState === WizardStatus.UploadLog}
    <div>
      <p>Upload your log for the selected.</p>
    </div>
  {:else if currentState === WizardStatus.TrimLog}
    <div>
      <p>Your log is too big! We need to trim it down.</p>
      <p>If you want to upload bigger logs, consider our premium option.</p>
    </div>
  {:else}
    <CreateCar />
  {/if}
</div>
<style lang="scss"></style>