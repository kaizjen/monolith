<style>
  .blocker {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 25px
  }
  .dialog {
    background: var(--dialog-background);
    z-index: 9;
    display: inline-block;
    padding: 14px;
    border: 1px solid var(--trivial-color);
    border-radius: 6px;
    min-width: 450px;
    min-width: 600px;
    cursor: default; /* document's cursor is changed by a function in Main.svelte */
  }
  .title {
    font-size: larger;
    font-weight: 700;
    margin-bottom: 20px;
    display: block;
  }
  .message {
    color: var(--trivial-text);
    font-size: small;
    display: block;
    margin-bottom: 20px;
  }
  input {
    display: block;
    background: transparent;
    border: 1px solid var(--trivial-color);
    width: -webkit-fill-available;
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 20px;
    color: var(--accent-text);
  }
  input:focus-visible {
    outline: none;
    box-shadow: 0px 0px 0px 2px var(--accent-color);
    border-color: var(--accent-color);
  }
</style>
<script>
  const { ipcRenderer } = window.monolith;
  import { onMount } from "svelte/internal";
  import { scale } from "svelte/transition"
  import Button from "//lib/Button.svelte";
  export let dialog;
  export let tab;
  $: {
    tab; // When the tab changes, the tab's BrowserView is placed on top. So, if we have any alerts, we want to bring them to the top
    ipcRenderer.send('chrome:setTop', true)
  }

  const { t } = window;

  onMount(() => {
    function globalListener(e) {
      if (e.key == 'Enter' && !e.shiftKey) {
        sendYes()
      }
      if (e.key == 'Escape') {
        sendNo()
      }
    }
    globalThis.addEventListener('keydown', globalListener)
    return () => {
      // cleanup
      globalThis.removeEventListener('keydown', globalListener)
    }
  })


  function sendYes() {
    console.log('sent yes');
    ipcRenderer.send('dialog-response', tab.uid, dialog.type == 'prompt' ?
      value :
      true
    )
  }
  function sendNo() {
    console.log('sent no');
    ipcRenderer.send('dialog-response', tab.uid, dialog.type == 'prompt' ?
      null :
      false
    )
  }

  $: message = dialog.arg.msg
  let value = dialog.arg.defaultValue || '';
</script>

<div class="blocker">
  <div class="dialog" transition:scale={{ duration: 150, start: 0.93 }}>
    <span class="title">
      {
        dialog.type == 'alert' ? 
        t('ui.popups.alert', { site: new URL(tab.url).hostname }) :
        dialog.type == 'confirm' ? 
        t('ui.popups.confirm', { site: new URL(tab.url).hostname }) :
        t('ui.popups.prompt', { site: new URL(tab.url).hostname })
      }
    </span>
    <span class="message">
      {message}
    </span>
    {#if dialog.type == 'prompt'}
      <input type="text" bind:value>
    {/if}
    <Button callToAction={true} on:click={sendYes}>
      {t('common.ok')}
    </Button>
    {#if dialog.type == 'prompt' || dialog.type == 'confirm'}
      <Button on:click={sendNo}>
        {t('common.cancel')}
      </Button>
    {/if}
  </div>
</div>