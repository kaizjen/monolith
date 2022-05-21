<style>
  
</style>

<script>
  import { RadioButton, TextBlock, Button } from "mth://js/fluent-svelte/index.js"
  import { getContext } from "svelte/internal"

  let config = getContext('config');
  let group = $config.behaviour.downloadPath == null ? 'unknown' : 'known'

  function selectUnknown() {
    console.log('selecting unknown');
    $config.behaviour.downloadPath = null
    window.monolith.userdata.config.set($config)
  }

  async function selectFolder() {
    console.log('selecting fld');
    let dialogResponse = await window.monolith.dialog.selectDirectory({
      defaultPath: $config.behaviour.downloadPath ?? '/',
      title: 'Choose the download path',
      buttonLabel: 'Choose'
    })

    if (dialogResponse.canceled) return;

    let path = dialogResponse.filePaths[0];
    $config.behaviour.downloadPath = path;
    window.monolith.userdata.config.set($config)
  }
</script>

<div class="s-option">
  <TextBlock variant="subtitle">Save downloaded files to:</TextBlock>
</div>
<div class="s-option">
  <RadioButton bind:group value="unknown" on:click={selectUnknown}>
    <div>
      <TextBlock> Ask each time </TextBlock>
    </div>
  </RadioButton>
</div>
<div class="s-option">
  <RadioButton bind:group value="known">
    <div>
      <TextBlock> Choose the location </TextBlock>
      {#if group == 'known'}
        <br><TextBlock style="color: gray;">{$config.behaviour.downloadPath ?? 'No path selected'}</TextBlock>
      {/if}
    </div>
  </RadioButton>
  <Button variant="accent" disabled={group != 'known'} on:click={selectFolder}> Select folder </Button>
</div>
<div class="separator"></div>
<div class="s-option">
  <Button
    disabled={$config.behaviour.downloadPath == null}
    variant="hyperlink"
    on:click={() => { window.monolith.shell.openPath($config.behaviour.downloadPath) }}
  > Open downloads folder </Button>
  <Button variant="hyperlink" href="mth://downloads" target="_blank">
    View all downloads
  </Button>
</div>