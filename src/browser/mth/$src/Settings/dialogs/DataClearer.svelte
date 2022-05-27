<script>
  import { ContentDialog, Button, Checkbox, TextBlock } from "fluent-svelte"
  import { getContext } from "svelte/internal";
  export let open = false;

  const { session, userdata } = window.monolith;
  const config = getContext('config')

  let isLoading = false;

  let clear = {
    cache: true,
    cookies: true,
    storages: false,
    history: false,
    downs: false,
    siteSettings: false,
  }

  async function clearSelected() {
    isLoading = true;
    let clearObj = {}

    if (clear.cache) {
      clearObj.appcache = true
      clearObj.shadercache = true
      clearObj.cachestorage = true
    }
    if (clear.cookies) {
      clearObj.cookies = true
    }
    if (clear.storages) {
      clearObj.filesystem = true
      clearObj.indexdb = true
      clearObj.localstorage = true
      clearObj.websql = true
    }

    await session.clearData(clearObj)

    if (clear.history) {
      userdata.history.set([])
    }
    if (clear.downs) {
      let dls = await userdata.downloads.get();
      dls.forEach((_, i) => {
        userdata.downloads.delete(i)
      });
    }
    if (clear.siteSettings) {
      $config.privacy.sitePermissions = {};
      userdata.config.set({ privacy: $config.privacy });
    }
    isLoading = false;
    open = false;
  }
</script>

<ContentDialog size="max" title="Choose what to erase" append={document.body} bind:open closable={false}>
  <Checkbox bind:checked={clear.cache}>Site cache</Checkbox><br>
  <Checkbox bind:checked={clear.cookies}>Cookies</Checkbox><br>
  <Checkbox bind:checked={clear.storages}>Databases and local storage</Checkbox><br>
  <Checkbox bind:checked={clear.history}>All history</Checkbox><br>
  <Checkbox bind:checked={clear.downs}>All downloads</Checkbox><br>
  <TextBlock variant="caption" style="color: gray;">
    The pages for history and downloads provide more control over what to clear.
  </TextBlock>
  <Checkbox bind:checked={clear.siteSettings}>Site permissions</Checkbox><br>

  <svelte:fragment slot="footer">
    <Button on:click={() => open = false}>Cancel</Button>
    <Button on:click={clearSelected} variant="accent" disabled={isLoading}>{isLoading ? "Loading..." : "Clear"}</Button>
  </svelte:fragment>
</ContentDialog>