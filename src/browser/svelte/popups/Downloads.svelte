<style>
  .blocker {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9;
    top: 0;
    left: 0;
  }
  .dialog {
    z-index: 10;
    background: var(--dialog-background);
    border: 1px solid var(--trivial-color);
    display: block;
    position: absolute;
    border-radius: 8px;
    transition: 0.2s;
    max-width: 380px;
    padding: 12px;
    top: 110%;
    right: 0;
    overflow: hidden;
    cursor: default;
  }
  h3 {
    margin-top: 0.5em;
  }

  .empty {
    width: 380px;
    text-align: center;
    color: var(--trivial-text);
  }

  .dl-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dl-wrapper:not(:last-child) {
    border-bottom: var(--trivial-color) 1px solid;
  }
  .download {
    padding: 4px;
    overflow: hidden;
  }

  .dl-buttons {
    margin-left: 16px;
    display: flex;
  }
  .mini-btn {
    padding: 14px;
    width: 15px;
    height: 15px;
    overflow: hidden;
    display: inline-flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    transition: 0.15s;
  }
  .mini-btn:hover {
    background: #ffffff59;
    transition: 0s;
  }
  .mini-btn:active {
    background: #ffffff94;
    transition: .15s;
  }
  .mini-btn > img {
    width: inherit;
    height: inherit;
  }
  .url {
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--trivial-text);
  }
  .more-info {
    font-size: small;
    color: var(--trivial-text);
  }

  .big-btn {
    background: var(--button-background);
    padding: 8px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid var(--trivial-color);
  }
  .big-btn:hover {
    background: var(--button-hover);
  }
  .big-btn:active {
    background: var(--button-active);
    transition: 0.15s;
  }
</style>

<script>
  export let open = true;
  export let downloadInfo;
  export let downloadPercent;
  import { getContext } from "svelte/internal";
  import * as pathModule from "path";
  import { ipcRenderer, shell } from "electron"
  import { fly } from "svelte/transition";

  const setTop = getContext('setTop')
  const colorTheme = getContext('colorTheme')

  setTop(true)

  let downloadsAPI = getContext('downloads')
  let config = getContext('config')

  let downloadsProm = downloadsAPI.get().then(allDls => allDls.slice(0, 8))

  $: {downloadInfo; {
    downloadsProm = downloadsAPI.get().then(allDls => allDls.slice(0, 8))
  }}
</script>

<div class="dialog" in:fly={{ y: 16, duration: 150 }}>
  {#if downloadInfo}
    <h3>Current download:</h3>
    <div class="dl-wrapper">
      <div class="download">
        <span>{pathModule.basename(downloadInfo.path)}</span> <br>
        <span class="url"> {downloadInfo.url} </span><br>
        <span class="more-info"> {downloadPercent.toString().slice(0, 4)}% downloaded </span> <!-- "10.723" => "10.7" -->
      </div>
      <div class="dl-buttons">
        <button class="mini-btn" on:click={() => {
          if (downloadInfo.paused) {
            ipcRenderer.send('dl:resume');
            downloadInfo.paused = false
            downloadInfo = downloadInfo;
            
          } else {
            ipcRenderer.send('dl:pause');
            downloadInfo.paused = true
            downloadInfo = downloadInfo;
          }
        }}>
          <img src="m-res://{$colorTheme}/tools_dls_{downloadInfo.paused ? 'resume' : 'pause'}.svg" alt="{downloadInfo.paused ? 'Resume' : 'Pause'}">
        </button>
        <button class="mini-btn" on:click={() => {
          ipcRenderer.send('dl:cancel');
          downloadsProm = downloadsAPI.get().then(allDls => allDls.slice(0, 8));
          // update the already done downloads
        }}>
          <img src="m-res://{$colorTheme}/tools_dls_cancel.svg" alt="Cancel">
        </button>
      </div>
    </div>
  {/if}

  <h3>Downloads</h3>

  <div>
    {#await downloadsProm}
      <i>Loading...</i>
    {:then downloads}
      {#each downloads as download, index}
        <div class="dl-wrapper">
          <div class="download">
            <b>{pathModule.basename(download.savePath)}</b><br>
            <span class="url">{download.url}</span><br>
            <span class="more-info"> {download.status == 'completed' ? 'Completed' : 'Interrupted / cancelled'} </span>
          </div>
          <div class="dl-buttons">
            <button class="mini-btn" on:click={() => {
              downloadsAPI.create(index)
            }}>
              <img src="m-res://{$colorTheme}/tools_dls_redownload.svg" alt="Download again">
            </button>
            <button class="mini-btn" on:click={async() => {
              await downloadsAPI.delete(index);
              downloads.splice(index, 1);
              downloads = downloads; // update
            }}>
              <img src="m-res://{$colorTheme}/tools_dls_delete.svg" alt="Delete the download">
            </button>
          </div>
        </div>
      {:else}
        <div class="empty"> No downloads </div>
      {/each}
    {/await}
  </div>

  <div style="display: flex; justify-content: space-between">
    <button class="big-btn" on:click={() => {
      ipcRenderer.send('newTab', { url: 'mth://downloads' });
      open = false;
      setTop(false)
    }}>
      More
    </button>
    {#if $config?.behaviour.downloadPath}
      <button class="big-btn" on:click={() => {
        shell.openPath(($config?.behaviour.downloadPath).replaceAll('%s', ''))
      }}>
      Open folder
    </button>
    {/if}
  </div>
</div>

<div class="blocker" on:click={() => {open = false; setTop(false)}}></div>
