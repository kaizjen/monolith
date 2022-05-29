<script>
  import { AutoSuggestBox, RadioButton, TextBlock } from "fluent-svelte";
  import Codes from "iso-639-1";

  export let selected;
  export let onlyAvailable = false;

  const languages = onlyAvailable ? 
    window.monolith.i18n.getAvailableTranslations() :
    Codes.getAllCodes()
  ;

  let value = Codes.getNativeName(selected);
  let error = false;

  $: {
    if (!Codes.getCode(value)) {
      error = true
    } else {
      selected = Codes.getCode(value);
      error = false;
    }
    if (!languages.includes(selected)) {
      console.log('%o no inc %o', languages, selected);
      error = true;
    }
  }

  console.log(Codes);

  function uniq(value, index, self) {
    return self.indexOf(value) === index;
  }
</script>

<!-- {#each languages as lang}
  <RadioButton bind:group={selected} value={lang}>{Codes.getNativeName(lang)}</RadioButton>
{/each} -->

<AutoSuggestBox bind:value items={languages.map(Codes.getNativeName).filter(uniq)} />

{#if error}
  <TextBlock variant="bodyStrong">Invalid or unsupported language</TextBlock>
{/if}