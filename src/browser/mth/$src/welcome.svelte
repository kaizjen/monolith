<script>
  import CoolAnimation from "./Welcome/CoolAnimation.svelte";
  import Eula from "./Welcome/EULA.svelte";
  import LanguageChooser from "./Welcome/LanguageChooser.svelte";
  import ThemeChooser from "./Welcome/ThemeChooser.svelte";
  import YoureGoodToGo from "./Welcome/YoureGoodToGo.svelte";

  let config;

  try {
    monolith.view.requestFullWindowView()

  } catch (_) {}

  let slide = -1;

  void async function () {
    config = await window.monolith.userdata.config.get();
    if (config.welcomePhase > 4) {
      await monolith.view.leaveFullWindowView()
      window.location = 'mth://newtab'
    }
    slide = config.welcomePhase;
  }()

  async function next() {
    slide++;
    config.welcomePhase = slide;
    await window.monolith.userdata.config.set(config)
  }
</script>

{#if slide == 0}
  <CoolAnimation {next} />
{/if}

{#if slide == 1}
  <LanguageChooser {next} {config} />
{/if}

{#if slide == 2}
  <ThemeChooser {next} {config} />
{/if}

{#if slide == 3}
  <Eula {next} />
{/if}

{#if slide >= 4}
  <YoureGoodToGo {next} />
{/if}