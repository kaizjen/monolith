<script>
  import { TextBlock, ComboBox, Checkbox, InfoBar, Slider } from "mth://js/fluent-svelte/index.js";
  import { getContext } from "svelte/internal";
  import noFirstTime from "mth://js/nft.js"

  function throttle(func, ms = 200) {
    let timeout;
    return function wrapper() {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(func, ms);
    }
  }
  
  let config = getContext('config')
  const theme = {
    select({ detail }) {
      console.log('selected', detail);
      $config.ui.theme = detail.value;
      window.monolith.userdata.config.set($config)
    },
    value: $config.ui.theme
  }

  let bookmarkBar = $config.ui.showBookmarks;
  const updateBookmarkBar = noFirstTime(() => {
    console.log('bm-b', bookmarkBar);
    $config.ui.showBookmarks = bookmarkBar;
    window.monolith.userdata.config.set($config)
  })
  $: {bookmarkBar; updateBookmarkBar()}

  let defaultPageZoom = $config.ui.defaultZoomFactor * 100;
  let defaultPageZoom_proxy = defaultPageZoom; // proxy to not trigger write operation EVERY time the slider is changed
  const updatePageZoom = noFirstTime(() => {
    console.log('z-page', defaultPageZoom);
    $config.ui.defaultZoomFactor = Number((defaultPageZoom / 100).toPrecision(2));
    window.monolith.userdata.config.set($config)
  })
  $: {defaultPageZoom; updatePageZoom()}
  const pageZoomThrottled = throttle(() => {
    defaultPageZoom = defaultPageZoom_proxy
  })
  $: {defaultPageZoom_proxy; pageZoomThrottled()}

  let chromeZoom = $config.ui.chromeZoomFactor * 100;
  let chromeZoom_proxy = chromeZoom;
  const updateChromeZoom = noFirstTime(() => {
    console.log('z-chr', chromeZoom);
    $config.ui.chromeZoomFactor = Number((chromeZoom / 100).toPrecision(2));
    window.monolith.userdata.config.set($config)
  })
  $: {chromeZoom; updateChromeZoom()}
  const chromeZoomThrottled = throttle(() => {
    chromeZoom = chromeZoom_proxy
  });
  $: {chromeZoom_proxy; chromeZoomThrottled()}
</script>

<div class="s-option">
  <TextBlock> Theme: </TextBlock>
  <ComboBox
    items={[
      { name: 'Dark', value: 'dark' },
      { name: 'Light', value: 'light' },
      { name: 'Same as system', value: 'system' },
    ]}
    bind:value={theme.value}
    on:select={theme.select}
  />
</div>
<div class="s-option">
  <Checkbox
    bind:checked={bookmarkBar}
  > Show bookmarks panel </Checkbox>
</div>
{#if bookmarkBar}
  <InfoBar closable={false} severity="caution" title="This feature is not yet available" />
{/if}
<div class="s-option">
  <TextBlock> Default page zoom: </TextBlock>
  <Slider
    suffix="%"
    bind:value={defaultPageZoom_proxy}
    min={1} max={200}
  />
</div>
<div class="s-option">
  <TextBlock> Monolith's UI zoom: </TextBlock>
  <Slider
    suffix="%"
    bind:value={chromeZoom_proxy}
    min={1} max={200}
  />
</div>