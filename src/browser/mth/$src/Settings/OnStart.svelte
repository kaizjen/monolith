<script>
  import { RadioButton, TextBlock, TextBox, Button } from "fluent-svelte"
  import { getContext } from "svelte/internal";
  import noFirstTime from "mth://js/nft.js"

  export let update;

  let config = getContext('config');

  let group = $config.behaviour.onStart.type;
  let currentUrl = $config.behaviour.onStart.url ?? '';

  function handleSave() {
    $config.behaviour.onStart = {
      type: 'page',
      url: currentUrl
    };
    update()
  }

  const onGroupChange = noFirstTime(() => {
    if (group == 'page') return; // 'page' is handled by handleSave()
  
    $config.behaviour.onStart = { type: group };
    update()
  })

  function isValidURL(url) {
    try {
      new URL(url);

      return true

    } catch (e) {
      return false
    }
  }

  $: {group; onGroupChange()}
</script>

<div class="s-option">
  <RadioButton bind:group value="new-tab">
    <div>
      <TextBlock> Open a new tab </TextBlock>
    </div>
  </RadioButton>
</div>
<div class="s-option">
  <RadioButton bind:group value="last-tabs">
    <div>
      <TextBlock> Open the tabs from the previous session </TextBlock>
    </div>
  </RadioButton>
</div>
<div class="s-option">
  <RadioButton bind:group value="page">
    <div>
      <TextBlock> Open a specific page </TextBlock>
    </div>
  </RadioButton>
</div>
{#if group == 'page'}
  <div class="s-option" style="margin-left: 25px;">
    <TextBox bind:value={currentUrl} placeholder="The URL of the page that should open." />
    <Button variant="accent" on:click={handleSave} style="margin-left: 20px;" disabled={!isValidURL(currentUrl)}>Save</Button>
  </div>
{/if}