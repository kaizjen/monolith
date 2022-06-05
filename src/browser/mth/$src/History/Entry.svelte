<style>
  .item {
    display: flex;
  }
  .item:hover {
    background: #80808073;
  }
  .item > a {
    padding: 10px;
    padding-inline: 20px;
    flex-grow: 1;
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .wrapper {
    white-space: nowrap;
  }
  .wrapper:not(:last-child) {
    border-bottom: 1px solid var(--default-gray);
  }

  .host {
    color: gray;
    margin-right: 10px;
    width: 3.5cm;
    overflow: hidden;
    flex-shrink: 0;
  }
</style>

<script>
  import { TextBlock, ContextMenu, MenuFlyoutItem, MenuFlyoutDivider, IconButton } from "fluent-svelte";
  import * as Icons from "../icons.js";

  export let entry;

  const { t } = window.monolith.i18n;
  function tt(str, ...args) {
    return t(`pages.history.${str}`, ...args)
  }

  function getTime() {
    function smartToString(num) {
      num = num.toString()
      if (num.length < 2) {
        num = '0' + num;
        return smartToString(num)
      }
      return num
    }

    const date = new Date(entry.timestamp);
    return `${smartToString(date.getHours())}:${smartToString(date.getMinutes())}`
  }

  function getHostname(url) {
    try {
      return (new URL(url)).hostname

    } catch (_) {
      return null;
    }
  }

  function del() {
    console.log("del", entry.originalIndex);
  }
</script>

<div class="wrapper">
  <ContextMenu style="white-space: nowrap;">
    <div class="item">
      <a href={entry.url}>
        <TextBlock variant="caption" style="margin-right: 10px">
            {getTime()}
        </TextBlock>
        {#if entry.faviconURL}
          <img src={entry.faviconURL} alt={tt('favicon')}>
        {/if}
        <span class="host">
          <TextBlock variant="caption">
            {getHostname(entry.url)}
          </TextBlock>
        </span>
        <TextBlock>
          {entry.title}
        </TextBlock>
      </a>
      <IconButton on:click={del}>
        <Icons.Delete title={tt('deleteEntry')}></Icons.Delete>
      </IconButton>
    </div>
  
    <svelte:fragment slot="flyout">
      <MenuFlyoutItem on:click={() => window.monolith.tab.create(entry.url)}>
        {t('menu.contextMenu.open.newTab')}
      </MenuFlyoutItem>
      <MenuFlyoutItem on:click={() => location = entry.url}>
        {t('menu.contextMenu.open.thisTab')}
      </MenuFlyoutItem>
      <MenuFlyoutDivider />
      <MenuFlyoutItem on:click={del}>
        {tt('deleteEntry')}
      </MenuFlyoutItem>
    </svelte:fragment>
  </ContextMenu>
</div>