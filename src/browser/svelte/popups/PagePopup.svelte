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
    background: var(--base-background);
    z-index: 9;
    display: inline-block;
    padding: 14px;
    border: 1px solid #5b626d;
    border-radius: 8px;
    min-width: 450px;
    cursor: default; /* document's cursor is changed by a function in Main.svelte */
  }
  .title {
    font-size: larger;
    font-weight: 700;
    margin-bottom: 20px;
    display: block;
  }
  .message {
    color: #ffffffab;
    font-size: small;
    display: block;
    margin-bottom: 20px;
  }
  input {
    display: block;
    background: transparent;
    border: 1px solid #5b626d;
    width: -webkit-fill-available;
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 20px;
    color: white;
  }
  input:focus-visible {
    outline: none;
    box-shadow: 0px 0px 0px 2px #247ecd;
    border-color: #247ecd;
  }
  button {
    border: 1px solid #5b626d;
    padding: 8px;
    min-width: 80px;
    border-radius: 4px;
    transition: .2s;
  }
  button:hover {
    background: #ffffff4d;
    transition: .05s;
  }
  button:active {
    background: #ffffff8a;
    border-color: white;
  }
  button.call-to-action {
    background: #247ecd;
  }
  button.call-to-action:hover {
    background: #69b4f7;
  }
  button.call-to-action:active {
    background: #9dd0fc;
  }
</style>
<script>
  import { ipcRenderer } from "electron";
  import { onMount } from "svelte/internal";
  import { scale } from "svelte/transition"
  export let dialog;
  export let tab;
  $: {
    tab; // When the tab changes, the tab's BrowserView is placed on top. So, if we have any alerts, we want to bring them to the top
    ipcRenderer.send('chrome:setTop', true)
  }

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
        `Message from ${new URL(tab.url).hostname}` :
        dialog.type == 'confirm' ? 
        `Confirm your action on ${new URL(tab.url).hostname}` :
        `Enter your input on ${new URL(tab.url).hostname}`
      }
    </span>
    <span class="message">
      {message}
    </span>
    {#if dialog.type == 'prompt'}
      <input type="text" bind:value>
    {/if}
    <button class="call-to-action" on:click={sendYes}>
      OK
    </button>
    {#if dialog.type == 'prompt' || dialog.type == 'confirm'}
      <button on:click={sendNo}>
        Cancel
      </button>
    {/if}
  </div>
</div>