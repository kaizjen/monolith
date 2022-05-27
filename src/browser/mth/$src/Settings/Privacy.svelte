<script>
  import { ListItem, TextBlock, ContentDialog, Button, ToggleSwitch } from "fluent-svelte";
  import { getContext } from "svelte/internal";
  import noFirstTime from "mth://js/nft.js"

  import DataClearer from "./dialogs/DataClearer.svelte";

  let config = getContext('config')

  export let update;

  let clearDialog = false;
  let siteSettingsDialog = location.hash.startsWith('#siteSettings');

  let noCOPermissions = $config.privacy.denyCrossOriginPermissions;
  const updateCOPs = noFirstTime(() => {
    $config.privacy.denyCrossOriginPermissions = noCOPermissions;
    update()
  })
  $: {noCOPermissions; updateCOPs()}

  let useHintingService = $config.privacy.useSuggestions;
  const updateHintingService = noFirstTime(() => {
    $config.privacy.useSuggestions = useHintingService;
    update()
  })
  $: {useHintingService; updateHintingService()}

  let maskSessionWhenHints = $config.privacy.hideSessionForSuggestions;
  const updateMask = noFirstTime(() => {
    $config.privacy.hideSessionForSuggestions = maskSessionWhenHints;
    update()
  })
  $: {maskSessionWhenHints; updateMask()}

  let useHTTPSOnly = $config.privacy.httpsOnly;
  const updateHTTPSOnly = noFirstTime(() => {
    $config.privacy.httpsOnly = useHTTPSOnly;
    update()
  })
  $: {useHTTPSOnly; updateHTTPSOnly()}
</script>

<DataClearer bind:open={clearDialog} />

<ContentDialog size="max" append={document.body} bind:open={siteSettingsDialog} closable={false}>
  Not implemented.
  <svelte:fragment slot="footer">
    <Button on:click={() => {siteSettingsDialog = false; location.hash = ''}}>Done</Button>
  </svelte:fragment>
</ContentDialog>


<ListItem on:click={() => clearDialog = true} style="block-size: 57px;">
  <TextBlock variant="body">Clear your data...</TextBlock><br>
  <TextBlock variant="caption" style="color: gray;">Clear history, cookies, and other data...</TextBlock>
</ListItem>
<div class="separator"></div>

<ListItem on:click={() => {siteSettingsDialog = true; location.hash = '#siteSettings'}} style="block-size: 57px;">
  <TextBlock variant="body">Manage site settings...</TextBlock><br>
  <TextBlock variant="caption" style="color: gray;">Permissions, local storage, cookies</TextBlock>
</ListItem>
<div class="s-option">
  <TextBlock>
    Deny cross-origin permissions <br>
    <TextBlock variant="caption" style="color: gray;">
      Sites embedded in other sites won't be able to request permissions
    </TextBlock>
  </TextBlock>
  <ToggleSwitch bind:checked={noCOPermissions} />
</div>
<div class="separator"></div>

<div class="s-option">
  <TextBlock>
    Use the default search engine hinting service <br>
    <TextBlock variant="caption" style="color: gray;">
      That will send requests to its server each time you're typing in the search bar.
      Requests will not be sent in private mode.
    </TextBlock>
  </TextBlock>
  <ToggleSwitch bind:checked={useHintingService} />
</div>
<div class="s-option">
  <TextBlock>
    Hide your session while getting hints <br>
    <TextBlock variant="caption" style="color: gray;">
      Hiding your session prevents some tracking, but can make hints less personalized.
    </TextBlock>
  </TextBlock>
  <ToggleSwitch bind:checked={maskSessionWhenHints} />
</div>
<div class="separator"></div>
<div class="s-option">
  <TextBlock>
    Only use secure connections (HTTPS)
  </TextBlock>
  <ToggleSwitch bind:checked={useHTTPSOnly} />
</div>