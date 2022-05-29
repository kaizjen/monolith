<style>
  .main {
    position: absolute;
    top: 0;
    left: 0;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    z-index: -1;
    padding-inline: 200px;
  }
  .head {
    -webkit-app-region: drag;
    padding-top: 20px;
    margin-bottom: 50px;
  }
  footer {
    display: flex;
    align-items: center;
    bottom: 0;
    position: absolute;
    width: 100%;
    padding-block: 8px;
  }
  @media (prefers-color-scheme: dark) {
    footer {
      background: black;
    }
  }
  @media (prefers-color-scheme: light) {
    footer {
      background: #cacaca;
    }
  }
  .info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 8px;
  }
  .note {
    margin-top: 50px;
    font-size: small;
    color: gray;
    font-style: italic;
  }
</style>
<script>
  import { Button, ContentDialog, TextBlock } from "fluent-svelte";
  import LanguageList from "./LanguageList.svelte";
  import Codes from "iso-639-1";

  export let next;
  export let config;

  let selectedLocale = 'en';
  let selectedLang = 'en';
  let open = false;

  $: {
    let supported = window.monolith.i18n.getSupportedLanguage(selectedLocale);
    selectedLang = supported
  }

  async function endLanguageSelection() {
    if (selectedLang != config.i18n.lang || 
      selectedLocale != config.i18n.locale) {
      requestIdleCallback(() => {
        window.monolith.app.restart();
      })
    }
    config.i18n.lang = selectedLang;
    config.i18n.locale = selectedLocale
    await next(); // next() sets the config
  }
</script>

<ContentDialog style=" overflow: auto; max-height: 100% " bind:open>
  <LanguageList bind:selected={selectedLang} onlyAvailable={true} />
  <svelte:fragment slot="footer">
    <Button on:click={() => open = false}>Close</Button>
  </svelte:fragment>
</ContentDialog>

<div class="main">
  <div class="head">
    <TextBlock variant="titleLarge">Choose your language</TextBlock>
  </div>

  <div>
    <LanguageList bind:selected={selectedLocale} />
  </div>

  <div class="note">
    Note: not all languages are supported by Monolith. If you pick an unsupported language, you will be additionally prompted to select
    the language of Monolith. The websites will still be displayed in your selected language, but Monolith's interface will be in one that
    you have selected for it specifically.
  </div>

</div>
<footer>
  <div class="info">
    {#if selectedLang != selectedLocale}
      <span> Monolith is not translated to your language. Pick a language for Monolith:
      <Button on:click={() => open = true}>{Codes.getNativeName(selectedLang) || '<unknown>'}</Button></span>
    {/if}
    {#if selectedLang != config.i18n.lang || 
      selectedLocale != config.i18n.locale}
      <span>Monolith will restart when you apply the change</span>
    {/if}
  </div>
  <Button on:click={endLanguageSelection}>
    Next
  </Button>
</footer>