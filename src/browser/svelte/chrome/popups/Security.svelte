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
  .perm-title {
    margin-bottom: 8px;
  }
</style>

<script>
  export let isOpen;
  export let tab;
  const { ipcRenderer } = window.monolith
  import { getContext } from 'svelte/internal';
  import { fly } from 'svelte/transition'
  import Permission from './Security/Permission.svelte';

  const { t } = window;
  const _ = {
    TITLE: t('ui.security.title'),
    msg: {
      SECURE: t('ui.security.message-secure'),
      INTERNAL: t('ui.security.message-internal'),
      LOCAL: t('ui.security.message-local'),
      INSECURE: t('ui.security.message-insecure'),
    },
    desc: {
      SECURE: t('ui.security.description-secure'),
      INSECURE: t('ui.security.description-insecure'),
    },
    btn: {
      CERT: t('ui.security.button-viewCertificate'),
      COOKIE: t('ui.security.button-cookieFiles'),
      SETTS: t('ui.security.button-siteSettings'),
    },
    PERMISSIONS: site => t('ui.security.permissions', { site })
  }

  let hostname;
  $: hostname = (new URL(tab.url)).hostname;

  let defaultPermissions;
  $: defaultPermissions = $config.privacy.defaultPermissions;

  let sitePermissions;
  $: sitePermissions = $config.privacy.sitePermissions;

  let thisPermissions;
  $: thisPermissions = sitePermissions[hostname];

  const setTop = getContext('setTop')
  const colorTheme = getContext('colorTheme')
  const config = getContext('config')

  setTop(true)

  function showCertificate() {
    ipcRenderer.send('showCertificate', hostname)
    isOpen = false;
  }
  function showCookies() {
    ipcRenderer.send('showCookies', tab.url)
    isOpen = false;
  }
  function siteSettings() {
    ipcRenderer.send('newTab', { url: `mth://settings#siteSettings/site:${hostname}` })
    isOpen = false;
  }
</script>

<div class="dialog" in:fly={window.flyoutProperties}>
  <div class="info" class:secure={tab.security === true}>
    <img src={
      tab.security === true ? `m-res://${$colorTheme}/sec_https.svg` : 
      tab.security == 'internal' ? `m-res://${$colorTheme}/m.svg` : 
      tab.security == 'local' ? `m-res://${$colorTheme}/sec_local.svg` :
      `m-res://${$colorTheme}/sec_http.svg`
    } alt="">
    <span>{
      tab.security === true ? _.msg.SECURE : 
      tab.security == 'internal' ? _.msg.INTERNAL : 
      tab.security == 'local' ? _.msg.LOCAL :
      _.msg.INSECURE
    }</span>
  </div>
  {#if !['internal', 'local'].includes(tab.security)}
    <div class="more_info">
      { tab.security === true ? _.desc.SECURE : _.desc.INSECURE }
    </div>
    <div class="separator"></div>
    {#if tab.security === true}
      <button on:click={showCertificate}><img src="m-res://{$colorTheme}/secdialog_certificate.svg" alt=""> {_.btn.CERT}</button>
    {/if}
    <button on:click={showCookies}><img src="m-res://{$colorTheme}/secdialog_cookie.svg" alt=""> {_.btn.COOKIE}</button>
    <button on:click={siteSettings}><img src="m-res://{$colorTheme}/secdialog_sitesetts.svg" alt=""> {_.btn.SETTS}</button>

    {#if hostname in sitePermissions}
      <h3 class="perm-title">{_.PERMISSIONS(hostname)}</h3>
      {#each Object.keys(thisPermissions) as key}
        <Permission name={key} value={thisPermissions[key]} on:change={({ detail }) => {
          thisPermissions[key] = detail;
          ipcRenderer.invoke('internal:userData', 'config:set', $config);
          // TODO: make IPC shared by chrome and mth:// pages
        }} defaultValue={defaultPermissions[key]} />
      {/each}
    {/if}
  {/if}
</div>

<div class="blocker" on:click={() => isOpen = false}></div>