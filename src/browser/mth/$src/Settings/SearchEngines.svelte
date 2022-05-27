<style>
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
</style>

<script>
  import { Expander, TextBlock, ComboBox, Button, ContentDialog, TextBox, Flyout } from "fluent-svelte";
  import { getContext } from "svelte/internal";
  import noFirstTime from "mth://js/nft.js"

  export let update;

  let config = getContext('config')
  let selectedIndex = $config.search.selectedIndex;
  let items = []
  $: items = $config.search.available.map(({ name }, i) => ({
    name,
    value: i
  }));

  let editEngineDialog = false;
  let backupEngine = null;
  let currentEngine = null;
  let delEngineDialog = false;

  let newEngineDialog = false;

  const handleSelect = noFirstTime(() => {
    console.log('selecting', selectedIndex);
  
    $config.search.selectedIndex = selectedIndex;
    update()
  })
  $: { selectedIndex; handleSelect() }


  function getHost(url) {
    try {
      let { hostname } = new URL(url);

      return hostname;
      
    } catch (e) {
      return `[Error: ${e}]`
    }
  }


  function editEngineF(engine) {
    return function () {
      currentEngine = engine;
      backupEngine = Object.assign({}, engine)
      editEngineDialog = true;
    }
  }
  function delEngineF(engine) {
    return function () {
      currentEngine = engine;
      backupEngine = Object.assign({}, engine)
      delEngineDialog = true;
    }
  }
</script>

<ContentDialog title="Edit search engine" closable={false} append={document.body} bind:open={editEngineDialog}>
  <div class="flex">
    <TextBlock> Name: </TextBlock>
    <TextBox placeholder="Must not be empty" bind:value={currentEngine.name} />
  </div>
  <div class="flex">
    <TextBlock> Search URL (with "%s" instead of search query): </TextBlock>
    <TextBox placeholder="Must not be empty" bind:value={currentEngine.searchURL} />
  </div>
  <div class="flex">
    <TextBlock> Suggestion query URL: </TextBlock>
    <TextBox placeholder="Leave empty to disable hints" bind:value={currentEngine.suggestURL} />
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={() => {
      Object.assign(currentEngine, backupEngine) // need to undo all changes
      currentEngine = null;
      editEngineDialog = false;
    }}>Cancel</Button>
    <Button variant="accent" on:click={() => {
      $config = $config; // object reference is alredy updated every time a change is made, we have to update the store manually though
      update()
      editEngineDialog = false;
    }} disabled={currentEngine.name == '' || currentEngine.searchURL == ''}>Save changes</Button>
  </svelte:fragment>
</ContentDialog>

<ContentDialog
  title="Confirm your choice"
  append={document.body}
  bind:open={delEngineDialog}
  on:backdropclick={() => { currentEngine = null; delEngineDialog = false; }}
>
  <TextBlock>Are you sure you want to delete the search engine {currentEngine.name}?</TextBlock>
  
  <svelte:fragment slot="footer">
    <Button on:click={() => { currentEngine = null; delEngineDialog = false }}>Cancel</Button>
    <Button on:click={() => {
      let i = $config.search.available.indexOf(currentEngine);
      if (i == -1) throw(new Error("This should NOT happen"))

      $config.search.available.splice(i, 1);
      if (i <= selectedIndex) {
        // shift the selected engine so it stays the same
        selectedIndex--;
        $config.search.selectedIndex--;
      }
      $config = $config;
      update()
      delEngineDialog = false;
    }}>Delete</Button>
  </svelte:fragment>
</ContentDialog>

<div class="s-option">
  <TextBlock> Default search engine: </TextBlock>
  <ComboBox 
    bind:value={selectedIndex}
    {items}
  /> <!-- on:select fires every time the items array is changed. Probably a bug in fluent-svelte -->
</div>
<Expander>
  <TextBlock variant="bodyStrong">Manage search engines</TextBlock>
  <svelte:fragment slot="content">
    {#each $config.search.available as SE, i}
      <div class="flex">
        <TextBlock>
          {SE.name}<br>
          <TextBlock variant="caption" style="color: gray;">
            Host: {getHost(SE.searchURL)}
          </TextBlock>
        </TextBlock>
        <div>
          <Button on:click={editEngineF(SE, i)}>
            Edit
          </Button>
          <Button on:click={delEngineF(SE, i)} disabled={items.length == 1}>
            Delete
          </Button>
        </div>
      </div>
    {/each}
    <br>
    <Button variant="accent" on:click={() => {currentEngine = {}; newEngineDialog = true}}> 
      Add a new search engine
    </Button>
    <ContentDialog
      title="New search engine"
      bind:open={newEngineDialog} append={document.body}
      on:close={() => currentEngine = null}
    >
      <div class="flex">
        <TextBlock> Name: </TextBlock>
        <TextBox placeholder="Must not be empty" bind:value={currentEngine.name} />
      </div>
      <div class="flex">
        <TextBlock> Search URL (with "%s" instead of search query): </TextBlock>
        <TextBox placeholder="Must not be empty" bind:value={currentEngine.searchURL} />
      </div>
      <div class="flex">
        <TextBlock> Suggestion query URL: </TextBlock>
        <TextBox placeholder="Leave empty to disable hints" bind:value={currentEngine.suggestURL} />
      </div>
      <svelte:fragment slot="footer">
        <Button on:click={() => newEngineDialog = false}>
          Cancel
        </Button>
        <Button on:click={() => {
          console.log('setting $available.push()');
          $config.search.available.push({ ...currentEngine, suggestAlgorithm: 'find' });
          $config = $config;

          update()

          currentEngine = null;
          newEngineDialog = false;
        }} variant="accent" disabled={currentEngine.name == '' || currentEngine.searchURL == ''}> Done </Button>
      </svelte:fragment>
    </ContentDialog>
  </svelte:fragment>
</Expander>