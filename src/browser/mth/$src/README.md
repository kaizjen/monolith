### This folder is hidden, because it contains '$' in its name.
In this folder all the things related to svelte are stored.


**You're probably wondering, why do you import from `svelte/internal` and not just `svelte`?**

Because for some reason, electron also isolates context of imported modules. `svelte` module re-exports stuff from `svelte/internal` and the context of `svelte/internal/index.mjs` (re-exported) is different from the world of `VM(number) svelte/internal/index.mjs` (imported from components) and that breaks functions like `onMount` and `createEventDispatcher`. That might be an electron bug, but it needs more research.

Really, this is very strange. It seems to only work with svelte, even though I don't know what's so special about it. I tried it with my own files, but it didn't work: the files weren't run in a `VM`-prefixed context.       
Right now, I have no idea why this is happening, but while I have a solution that, ~~god forbid~~, "just works", I'm gonna use it.