<style>
  table {
    display: block;
    overflow: auto;
    margin-bottom: 15px;
    max-height: 40vh;
    white-space: nowrap;
  }
  .val {
    user-select: text;
    color: var(--trivial-text);
  }
  ::selection {
    background: var(--accent-hover);
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
<script>
  import { createEventDispatcher } from "svelte";
  import Button from "//lib/Button.svelte"

  const dispatch = createEventDispatcher()

  export let cookie;
  export let tt;

  const dtf = new Intl.DateTimeFormat(navigator.language, { dateStyle: 'medium', timeStyle: 'medium' });

  function formatProperty(prop) {
    const value = cookie[prop];
    switch (prop) {
      case 'expirationDate': {
        return dtf.format(value)
      }
      case 'sameSite': {
        return tt(`sameSite.${value}`)
      }
    
      default: return value
    }
  }

  function copyJSON() {
    window.monolith.sendInternalSync('clipboard', 'writeText', JSON.stringify(cookie))
  }
</script>

<table>
  {#each Object.keys(cookie) as prop}
    <tr>
      <td class="prop">{tt(`props.${prop}`)}</td><td class="val">{formatProperty(prop)}</td>
    </tr>
  {/each}
</table>
<div>
  <Button on:click={() => dispatch('delete')}>{tt('remove')}</Button>
  <Button on:click={copyJSON}>{tt('copyJSON')}</Button>
</div>