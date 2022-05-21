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
    top: calc(100% + 10px);
    cursor: default;
  }
  .info {
    display: flex;
    font-weight: bold;
    padding: 5px;
    justify-content: center;
    align-items: center;
  }
  .info > * {
    margin-left: 4px;
  }
  .info.secure {
    filter: invert(0.5) sepia(1) saturate(3) hue-rotate(45deg);
  }
  .more_info {
    padding: 7px;
    opacity: 0.7;
    font-size: small;
  }
  .separator {
    background: var(--trivial-color);
    padding: 1px;
    margin-bottom: 20px;
    margin-top: 15px;
  }
  button {
    display: flex;
    padding: 8px;
    align-items: center;
    border-radius: 4px;
    transition: .1s;
    opacity: 0.85;
    width: -webkit-fill-available;
  }
  button:hover {
    background: var(--button-hover);
    transition: .01s;
  }
  button:active {
    background: var(--button-active);
  }
  button > img {
    margin-right: 8px;
  }
</style>

<script>
  export let isOpen;
  export let tab;
  import { ipcRenderer } from 'electron'
  import { getContext } from 'svelte/internal';
  import { fly } from 'svelte/transition'

  const setTop = getContext('setTop')
  const colorTheme = getContext('colorTheme')

  setTop(true)

  function showCertificate() {
    ipcRenderer.send('showCertificate', new URL(tab.url).hostname)
    isOpen = false;
  }
  function showCookies() {
    
  }
  function siteSettings() {
    ipcRenderer.send('newTab', { url: `mth://settings#siteSettings/site:${new URL(tab.url).hostname}` })
    isOpen = false;
  }
</script>

<div class="dialog" in:fly={{ y: 16, duration: 150 }}>
  <div class="info" class:secure={tab.security === true}>
    <img src={
      tab.security === true ? `m-res://${$colorTheme}/sec_https.svg` : 
      tab.security == 'internal' ? `m-res://${$colorTheme}/m.svg` : 
      tab.security == 'local' ? `m-res://${$colorTheme}/sec_local.svg` :
      `m-res://${$colorTheme}/sec_http.svg`
    } alt="Connection status">
    <span>{
      tab.security === true ? "Your connection is secure" : 
      tab.security == 'internal' ? "This is an internal Monolith page" : 
      tab.security == 'local' ? "This is a local or a shared file" :
      "Your connection is not secure"
    }</span>
  </div>
  {#if !['internal', 'local'].includes(tab.security)}
    <div class="more_info">{
        tab.security === true ? `The information you provide (such as passwords or credit cards) will be securely sent to this site and cannot be intercepted.
          Always be sure you're on the intended site before entering any information.` :
        "It is recommended you do not send information such as passwords or credit cards to this site, because it can be intercepted."
      }
    </div>
    <div class="separator"></div>
    {#if tab.security === true}
      <button on:click={showCertificate}><img src="m-res://{$colorTheme}/secdialog_certificate.svg" alt=""> View certificate</button>
    {/if}
    <button on:click={showCookies}><img src="m-res://{$colorTheme}/secdialog_cookie.svg" alt=""> Cookie files</button>
    <button on:click={siteSettings}><img src="m-res://{$colorTheme}/secdialog_sitesetts.svg" alt=""> Site settings</button>
  {/if}
</div>

<div class="blocker" on:click={() => isOpen = false}></div>