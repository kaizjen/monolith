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
  img#close:hover {
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
    transition: 0.1s;
    display: inline-block;
    position: relative;
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
  .tabhead :global(.tab.dragover) {
    opacity: 0.5;
  }
  /* .tab.private.selected {
    background: #684a86;
  } */
  .tab img {
    height: 14px;
  }
  .tab img.favicon {
    padding: 3px;
  }
  .tab img.favicon.decoy {
    flex-grow: 1;
  }
  .tab img.audio-control {
    transform: translate(9px, 5px);
    position: absolute;
    padding: 3px;
    border-radius: 50%;
    transition: 0.2s;
  }
  .tab img.audio-control:hover {
    background: var(--tool-hover);
    transition: 0s;
  }
  .tab img.audio-control:active {
    background: var(--tool-active);
  }
  .tab img.audio-control.playing {
    filter: invert(0.3) sepia(1) saturate(5) hue-rotate(177deg); /* creates a cyan color */
  }
  .tab span {
    padding-left: 8px;
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
    display: flex;
  }
  #addtab:hover {
    background: var(--button-hover)/* #ffffff40 */;
  }
  #addtab:active {
    background: var(--button-active); /* #ffffff78; */
  }
</style>

<script>
  const { ipcRenderer } = window.monolith;
  import { getContext } from "svelte/internal";
  import { cubicOut } from 'svelte/easing'
  export let tabs;
  export let currentTab;

  const { t } = window;
  const _ = {
    PRIVATE_TAB: t('ui.tabs.private'),
    AUDIBLE: t('ui.tabs.playingAudio'),
    MUTED: t('ui.tabs.muted'),
  }

  const colorTheme = getContext('colorTheme')

  const isOnMac = process.platform == 'darwin';
  const isOnLinux = process.platform == 'linux';

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
  function handleDropF(id, zoneUID) {
    /**
     * @param {DragEvent} e
     */
    return function (e) {
      console.log('dropped, uid: %o', e.dataTransfer.getData('text/tabUID'));
      let movedUID = Number(e.dataTransfer.getData('text/tabUID') || NaN);

      if (isNaN(movedUID)) return;
      if (movedUID == zoneUID) return;

      ipcRenderer.send('chrome:crossMoveTab', movedUID, id)
    }
  }

  function dropzone(el) {
    let counter = 0;
    function dragenter() {
      el.classList.add('dragover')
      counter++;
    }
    function dragleave() {
      counter--;
      if (counter == 0) {
        el.classList.remove('dragover')
      }
    }

    el.addEventListener('dragenter', dragenter, true)
    el.addEventListener('dragleave', dragleave, true)
    el.addEventListener('drop', dragleave, true)

    return {
      destroy() {
        el.removeEventListener('dragenter', dragenter)
        el.removeEventListener('dragleave', dragleave)
        el.removeEventListener('drop', dragleave)
      }
    }
  }


  function smoothlyScroll(element, left, frames = 6) {
    let framesLeft = frames;
    function scroll() {
      console.log("scrolling!", { framesLeft, scLeft: Math.ceil(left / frames) });
      element.scrollLeft += Math.ceil(left / frames)
      framesLeft--;
      if (framesLeft == 0) return;
      requestAnimationFrame(scroll)
    }
    scroll()
  }

  function toggleMuteF(tab) {
    return function () {
      ipcRenderer.send('setMutedTab', tabs.indexOf(tab), !tab.isMuted)
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
    style:margin-left={isOnMac ? '3.8cm' /* approximate traffic lights width */ : ''}
  >
  <div class="tabhead">
    <div
      class="tablist"
      on:mousedown={e => (e.button == 1) /* middle mb */ ? e.preventDefault() : null}
      on:wheel={e => e.deltaX == 0 ? smoothlyScroll(e.currentTarget, e.deltaY) : null}
    >
      {#each tabs as tab, id (tab)}
        <div
          class="tab"
          draggable="true"
          on:dragstart={e => e.dataTransfer.setData('text/tabUID', tab.uid)}
          on:dragover|preventDefault={e => {}}
          on:drop|capture={handleDropF(id, tab.uid)}
          use:dropzone
          class:selected={id == currentTab}
          class:private={tab.private}
          on:mousedown={handleSelectF(id)}
          on:auxclick={handleClickF(id)}
          in:tab_anim={{ x: -50, y: 0, duration: 120 }}
          out:tab_anim={{ x: -50, y: 0, duration: 120 }}
          title={tab.title}
          role="tab"
        >
          {#if tab.private && !(id == currentTab)}
            <img src="m-res://{$colorTheme}/tab_privatemode.svg" alt={_.PRIVATE_TAB} class="favicon decoy">
          {:else}
            <img alt="" src={tab.isLoading ? `m-res://${$colorTheme}/tab_waiting.svg` : (tab.favicon ?? `m-res://${$colorTheme}/tab_webpage.svg`)} class="favicon">
            {#if tab.isPlaying || tab.isMuted}
              <img
                role="button"
                tabindex="0"
                alt={tab.isMuted ? _.MUTED : _.AUDIBLE }
                src="m-res://{$colorTheme}/tab_{tab.isMuted ? 'muted' : 'audible'}.svg"
                on:click={toggleMuteF(tab)}
                on:mousedown|stopPropagation={()=>{}}
                class="audio-control"
                class:playing={tab.isPlaying}
              >
            {/if}
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
      </div>
      <button id="addtab" on:click={newTab}>
        <img alt="" src="m-res://{$colorTheme}/tab_plus.svg">
      </button>
    </div>
    <div
      class="traffic-lights"
      style:pointer-events={isOnLinux ? '' : 'none'}
      style:visibility={isOnLinux ? '' : 'hidden'}
      style:display={isOnMac ? 'none' : ''}
    >
      <img alt="" src="m-res://{$colorTheme}/win_minimize.svg" on:click={winActionF('min')}>
      <img alt="" src="m-res://{$colorTheme}/win_restore.svg" on:click={winActionF('max')} width="24" height="24">
      <img alt="" src="m-res://{$colorTheme}/win_close.svg" id="close" on:click={winActionF('close')}>
  </div>
</div>