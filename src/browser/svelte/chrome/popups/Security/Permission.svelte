<style>
  .permission {
    display: flex;
    flex-direction: column;
    padding: 6px;
  }
  .description {
    color: var(--trivial-text);
  }
  .main {
    display: flex;
    align-content: center;
  }
  .title {
    flex-grow: 1;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .controls {
    display: flex;
  }
  .button-container {
    padding: 4px;
  }
  .button-container.active {
    background: #80808082;
  }
  button {
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 1px;
  }
  .denied {
    background: red;
  }
  .default {
    background: gray;
  }
  .granted {
    background: green;
  }
</style>
<script>
  import { createEventDispatcher, getContext } from "svelte/internal";

  export let name;
  export let value;
  export let defaultValue;

  const { t } = window;
  const _ = {
    NAME: name => t(`common.permissions.${name}.name`),
    DESC: name => t(`common.permissions.${name}.desc`),
    status: {
      ALLOW: t('common.permissions.status.allow'),
      DENY: t('common.permissions.status.deny'),
      DEFAULT: t('common.permissions.status.useDefault'),
      DEFAULT_MARK: t('common.permissions.status.defaultMark'),
      ASK: t('common.permissions.status.ask'),
    }
  }

  const emit = createEventDispatcher()
  const colorTheme = getContext('colorTheme')

  function clickF(newValue) {
    return function () {
      emit('change', newValue)
    }
  }

  const BORDER_RADIUS_VALUE = '4px'

  let isDefault;
  $: isDefault = value == null;

  let didFail = false;

</script>
<div class="permission">
  <div class="main">
    {#if !didFail}
      <img src="m-res://{$colorTheme}/perm_{name}.svg" alt="{_.NAME(name)}" on:error={() => didFail = true}>
    {/if}
    <span class="title">
      {_.NAME(name)}
    </span>
    <div class="controls">
      <div class="button-container"
        class:active={isDefault && defaultValue == true}
        style:border-radius={isDefault ? `${BORDER_RADIUS_VALUE} 0 0 ${BORDER_RADIUS_VALUE}` : ''}
      >
        <button on:click={clickF(true)} class:granted={value == true}>
          <img src="m-res://{value == true ? 'dark' : $colorTheme}/permstatus_granted.svg"
            alt={_.status.ALLOW + ' ' + (defaultValue == true ? _.status.DEFAULT_MARK : '')}
            title={_.status.ALLOW + ' ' + (defaultValue == true ? _.status.DEFAULT_MARK : '')}
          >
        </button>
      </div>
      <div class="button-container"
        class:active={isDefault && defaultValue != null}
        style:border-radius={
          defaultValue == true ?
          `0 ${BORDER_RADIUS_VALUE} ${BORDER_RADIUS_VALUE} 0` :
          `${BORDER_RADIUS_VALUE} 0 0 ${BORDER_RADIUS_VALUE}`
        }
      >
        <button on:click={clickF(null)} class:default={isDefault}>
          <img src="m-res://{value == null ? 'dark' : $colorTheme}/permstatus_default.svg"
            alt={_.status.DEFAULT + ' ' +
              `(${defaultValue == true ? _.status.ALLOW : defaultValue == false ? _.status.DENY : _.status.ASK})`
            }
            title={_.status.DEFAULT + ' ' +
              `(${defaultValue == true ? _.status.ALLOW : defaultValue == false ? _.status.DENY : _.status.ASK})`
            }
          >
        </button>
      </div>
      <div class="button-container"
        class:active={isDefault && defaultValue == false}
        style:border-radius={isDefault ? `0 ${BORDER_RADIUS_VALUE} ${BORDER_RADIUS_VALUE} 0` : ''}
      >
        <button on:click={clickF(false)} class:denied={value == false}>
          <img src="m-res://{value == false ? 'dark' : $colorTheme}/permstatus_denied.svg"
            alt={_.status.DENY + ' ' + (defaultValue == false ? _.status.DEFAULT_MARK : '')}
            title={_.status.DENY + ' ' + (defaultValue == false ? _.status.DEFAULT_MARK : '')}
          >
        </button>
      </div>
    </div>
  </div>
  <span class="description">
    {_.DESC(name)}
  </span>
</div>