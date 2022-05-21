<style>
  .head {
    -webkit-app-region: drag;
    display: flex;
    background: var(--base-background);
  }
  #monolith-icn {
    width: 28px;
    height: 28px;
    margin: 4px;
  }
  .traffic-lights {
    white-space: nowrap;
    background: var(--base-background);/* #21252b; */
    right: 0;
    max-height: 36px;
    display: flex;
    z-index: 7;
  }
  .traffic-lights > img {
    width: 27px;
    height: 20px;
    padding: 8px;
    padding-left: 12px;
    padding-right: 12px;
    transition: 0.2s;
    -webkit-app-region: no-drag;
  }
  img#tl-end:hover {
    background: #ff5656a6;
  }
  .traffic-lights > img:hover {
    background: #ffffff4a;
    transition: 0s;
  }

  .tabhead {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex-grow: 1;
    height: 36px;
    margin-right: 20px;
  }
  .tabhead > * {
    -webkit-app-region: no-drag;
  }
  .tablist {
    margin-top: 0;
    display: flex;
    overflow-x: overlay;
    overflow-y: hidden;
  }
  .tab {
    padding: 8px;
    transition: 0.2s;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    width: 150px;
    font-size: 15px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .tab:hover {
    background: #ffffff29;
  }
  .tab.selected {
    background: var(--active-background);
  }
  /* .tab.private.selected {
    background: #684a86;
  } */
  .tab img {
    height: 14px;
  }
  .tab img.favicon {
    padding: 3px;
    padding-right: 8px;
  }
  .tab img.favicon.decoy {
    flex-grow: 1;
  }
  .tab span {
    flex-grow: 1;
  }
  .close-tab {
    padding: 3px;
    transition: 0.15s;
    border-radius: 50%;
    display: flex;
  }
  .close-tab:hover {
    background: var(--button-hover);/* #ffffff34; */
  }
  .close-tab:active {
    background: var(--button-active)/* #ffffff91; */
  }
  .tab > span {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: calc(100% - 20px);
  }

  #addtab {
    padding: 4px;
    margin-left: 2px;
    border-radius: 4px;
    transition: 0.2s;
  }
  #addtab:hover {
    background: var(--button-hover)/* #ffffff40 */;
  }
  #addtab:active {
    background: var(--button-active); /* #ffffff78; */
  }
</style>

<script>
  import { ipcRenderer } from "electron";
  import { getContext } from "svelte/internal";
  import { cubicOut } from 'svelte/easing'
  export let tabs;
  export let currentTab;

  const colorTheme = getContext('colorTheme')

  const isOnMac = process.platform == 'darwin';
  const isOnWindows = process.platform == 'win32';
  const isOnLinuxOrBSD = !isOnMac && !isOnWindows;

  function tab_anim(node, { delay = 0, duration = 400, easing = cubicOut, opacity = 0 }) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const od = target_opacity * (1 - opacity);
    const w = parseInt(style.width)
    return {
      delay,
      duration,
      easing,
      css: (t, u) => `
        width: ${Math.round(w * t)}px;
        opacity: ${target_opacity - (od * u)}
      `
    };
  }

  function handleClickF(id) {
    // captial F stands for factory
    return function (e) {
      if (e.button == 1) {
        // middle mb
        ipcRenderer.send('closeTab', id)
      } else if (e.button == 2) {
        // rightclick
        ipcRenderer.send('chrome:menu-of-tab', id)
      }
    }
  }
  function handleSelectF(id) {
    return function (e) {
      if (e.button != 0) return
      // lmb
      ipcRenderer.send('selectTab', id)
    }
  }

  function newTab() {
    ipcRenderer.send('newTab')
  }

  function winActionF(msg) {
    return function () {
      ipcRenderer.send('@window', msg)
    }
  }
</script>


<div class="head">
  <img
    alt="" src="m-res://{$colorTheme}/m.svg" id="monolith-icn"
    style:margin-left={isOnMac ? '100px' /* approximate traffic lights width */ : ''}
  >
  <div class="tabhead">
    <div class="tablist" on:mousedown={e => (e.button == 1) /* middle mb */ ? e.preventDefault() : null}>
      {#each tabs as tab, id (tab)}
        <div
          class="tab"
          class:selected={id == currentTab}
          class:private={tab.private}
          on:mousedown={handleSelectF(id)}
          on:auxclick={handleClickF(id)}
          in:tab_anim={{ x: -50, y: 0, duration: 120 }}
          out:tab_anim={{ x: -50, y: 0, duration: 120 }}
        >
          {#if tab.private && !(id == currentTab)}
            <img src="m-res://{$colorTheme}/tab_privatemode.svg" alt="Private tab" class="favicon decoy">
          {:else}
            <img alt="" src={tab.isLoading ? `m-res://${$colorTheme}/tab_waiting.svg` : (tab.favicon ?? `m-res://${$colorTheme}/tab_webpage.svg`)} class="favicon">
            <span>{tab.title}</span>
          {/if}
          <button
            class="close-tab"
            on:mousedown|stopPropagation={()=>null}
            on:click={() => { console.log('clicked close'); ipcRenderer.send('closeTab', id) }}
          >
            <img alt="Close tab" src="m-res://{$colorTheme}/tab_close.svg" >
          </button>
        </div>
      {/each}
      </div><img alt="" src="m-res://{$colorTheme}/tab_plus.svg" id="addtab" on:click={newTab}>
    </div>
    <div
      class="traffic-lights"
      style:pointer-events={isOnLinuxOrBSD ? '' : 'none'}
      style:visibility={isOnLinuxOrBSD ? '' : 'hidden'}
      style:display={isOnMac ? 'none' : ''}
    >
      <img alt="" src="m-res://{$colorTheme}/win_minimize.svg" on:click={winActionF('min')}>
      <img alt="" src="m-res://{$colorTheme}/win_restore.svg" on:click={winActionF('max')} width="24" height="24">
      <img alt="" src="m-res://{$colorTheme}/win_close.svg" id="tl-end" on:click={winActionF('close')}>
  </div>
</div>