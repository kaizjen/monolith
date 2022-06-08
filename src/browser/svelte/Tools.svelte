<style>
  div {
    background: var(--active-background);
    padding: 8px;
    display: flex;
    align-items: center;
    -webkit-app-region: no-drag;
    position: relative;
  }
  .nav, .tool {
    border-radius: 4px;
    padding: 4px;
    transition: 0.1s;
    display: flex;
    -webkit-app-region: no-drag;
    margin-inline: 1px;
    padding-inline: 6px;
  }
  .disabled {
    opacity: 0.5;
  }
  .nav:not(.disabled):hover, .tool:hover {
    background: var(--tool-hover) !important;
    transition: 0s;
  }
  .nav:not(.disabled):active, .tool:active {
    background: var(--tool-active) !important;
  }
</style>

<script>
  export let tab = {};
  import { ipcRenderer } from "electron";
  import AddressBar from "./AddressBar.svelte"
  import { getContext } from "svelte/internal";
  import Downloads from "./popups/Downloads.svelte";

  const { t } = window;
  const _ = {
    BACK: t('navigation.back'),
    FWD: t('navigation.forward'),
    STOPLOAD: t('ui.tools.load-stop'),
    REFRESHLOAD: t('ui.tools.load-refresh'),
    DOWNLOADS: t('ui.tools.downloads.title'),
    MORE: t('ui.tools.more'),
  }
  
  const colorTheme = getContext('colorTheme')

  let downloadPercent = 0;
  let downloadInfo;

  let downloadsDialog = false;

  ipcRenderer.on('downloadStatus', (_e, { state, recieved, total }) => {
    if (state == 'interrupted' || state == 'cancelled' || state == 'completed') {
      downloadPercent = 0;
      downloadInfo = null;
    } else downloadPercent = recieved / total * 100
  })
  ipcRenderer.on('downloadStart', (_e, i) => {
    downloadInfo = { ...i, paused: false };
  })

  function navBack() {
    ipcRenderer.send('@tab', 'back')
  }
  function navFwd() {
    ipcRenderer.send('@tab', 'fwd')
  }
  function refresh(e) {
    ipcRenderer.send('@tab', (e.shiftKey || e.ctrlKey) ? 'hardRefresh' : 'refresh')
  }
</script>

<div class:private={tab.private}>
  <button class="nav" class:disabled={!tab.nav?.canGoBack} on:click={navBack}><img alt={_.BACK} src="m-res://{$colorTheme}/nav_back.svg"></button>
  <button class="nav" class:disabled={!tab.nav?.canGoFwd} on:click={navFwd}><img alt={_.FWD} src="m-res://{$colorTheme}/nav_fwd.svg"></button>
  <button class="nav" on:click={refresh}><img alt={tab.isLoading ? _.STOPLOAD : _.REFRESHLOAD} src={tab.isLoading ? `m-res://${$colorTheme}/nav_stop.svg` : `m-res://${$colorTheme}/nav_refresh.svg`}></button>
  <AddressBar {tab} />
  <button
    class="tool"
    style="background: linear-gradient(to right, #23db646b {downloadPercent}%, transparent 0%);"
    on:click={() => downloadsDialog = !downloadsDialog}
  >
    <img src="m-res://{$colorTheme}/tools_downloads.svg" alt={_.DOWNLOADS}>
  </button>
  <button class="tool" on:click={(e) => {
    let { bottom, left } = e.currentTarget.getBoundingClientRect()
    ipcRenderer.send('chrome:browserMenu', {
      x: left, y: bottom
    })
  }}><img alt={_.MORE} src="m-res://{$colorTheme}/tools_more.svg"></button>
  {#if downloadsDialog}
    <Downloads bind:open={downloadsDialog} {downloadPercent} {downloadInfo} />
  {/if}
</div>