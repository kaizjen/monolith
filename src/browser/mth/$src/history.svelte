<style>
  header {
    padding-inline: 20px;
    padding-block: 4px;
    border-bottom: 1px solid var(--default-gray);
    position: fixed;
    width: 100%;
    top: 0;
    backdrop-filter: blur(4px);
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 85px;
  }
  main {
    width: 24cm;
  }

  .action-bar {
    display: flex;
    padding: 8px;
    justify-content: space-between;
  }
</style>
<script>
  import { IconButton, Button, ProgressRing } from "fluent-svelte";
import { setContext } from "svelte";
  import Header from "./common/Header.svelte";
  import ByDate from "./History/ByDate.svelte";
  import * as Icons from "./icons.js";

  const { t } = window.monolith.i18n;
  function tt(str, ...args) {
    return t(`pages.history.${str}`, ...args)
  }

  const fmt = Intl.DateTimeFormat()

  const ENTRIES_BY_PAGE = 50;
  let currentPage = 0;
  
  let entries = [];
  let promise;

  function update() {
    promise = new Promise(async(y) => {
      let unfiltered = await window.monolith.userdata.history.get({ entries: ENTRIES_BY_PAGE, offset: ENTRIES_BY_PAGE * currentPage })
      entries = unfiltered.filter(o => !!o); // current impl returns always the amount specified by "entries"
      y();

      requestIdleCallback(async() => {
        let next = await window.monolith.userdata.history.get({ entries: 1, offset: ENTRIES_BY_PAGE * (currentPage + 1) })
        if (next[0] == undefined) {
          endReached = true
        }
      })
    })
  }

  let endReached = false;
  const page = {
    fwd() {
      if (endReached) return;

      currentPage += 1;
      update()
    },
    back() {
      if (currentPage == 0) return;

      currentPage -= 1;
      endReached = false;
      update()
    }
  }

  let entriesByDate = {};
  function updateEntriesByDate() {
    entriesByDate = {};
    entries.forEach((e, i) => {
      const day = fmt.format(e.timestamp);
      const dateKey = (new Date(day)).getTime();

      e.originalIndex = i; // need to keep this

      if (dateKey in entriesByDate) {
        entriesByDate[dateKey].push(e)

      } else {
        entriesByDate[dateKey] = [ e ]
      }
    })
  }
  $: {entries; updateEntriesByDate()}

  update()

  setContext('update', update)
</script>

<svelte:head>
  <title>{t('common.history')}</title>
</svelte:head>

<header>
  <Header name="history">
    <Icons.History />
  </Header>
</header>
<div class="container">
  <main>
    <div class="action-bar">
      <div>
        <IconButton on:click={page.back} style="opacity: {currentPage == 0 ? "0.5" : "1"};">
          <Icons.ArrowBack title={t('navigation.back')} />
        </IconButton>
        <IconButton on:click={page.fwd} style="opacity: {endReached ? "0.5" : "1"};">
          <Icons.ArrowFwd title={t('navigation.forward')} />
        </IconButton>
      </div>
      <Button>
        {tt('button-clear')}
      </Button>
    </div>
    {#await promise}
      <ProgressRing />
    {:then _}
      {#each Object.keys(entriesByDate) as date}
        <ByDate {date} entries={entriesByDate[date]} />
      {:else}
        {tt('empty')}
      {/each}
    {:catch}
      Error!
    {/await}
  </main>
</div>