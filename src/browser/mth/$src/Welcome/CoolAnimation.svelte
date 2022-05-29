<style>
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fg {
    color: white;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    z-index: 1;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
  .backshadow {
    box-shadow: #000000ab 0 0 19px 20px;
    background: #000000ab;
    width: 100%;
    text-align: center;
  }
  .button-wr {
    position: absolute;
    bottom: 8vh;
  }
</style>
<script>
  import { Button, TextBlock } from "fluent-svelte"
  import { draw, scale, fade } from "svelte/transition"
  import { expoOut } from "svelte/easing"

  export let next;

  let animationDone = false;
  let toggled = false;
  let currentFill = 'none';

  const finalScaleOptions = { duration: 200, start: 0.8 };
  const svgAnimDuration = 700;
  
  setTimeout(() => {
    toggled = true
    setTimeout(() => {
      currentFill = 'white'
    }, 400);
  }, 100);
</script>

{#if toggled}
  <div class="fg" out:scale={finalScaleOptions}>
    <div class="backshadow" in:scale={{ delay: svgAnimDuration + 100, duration: svgAnimDuration + 100, start: 0.7, easing: expoOut }} on:introend={() => animationDone = true}>
      <TextBlock variant="display">
        Welcome
      </TextBlock>
    </div>
    {#if animationDone}
      <div in:fade class="button-wr">
        <Button variant="hyperlink" on:click={next}>
          Begin
        </Button>
      </div>
    {/if}
  </div>
  <div class="bg" style:--current-fill={currentFill} out:fade={{ duration: finalScaleOptions.duration }}>
    <svg
      in:scale={{ delay: 200, duration: svgAnimDuration - 200, start: 1.3, opacity: 1, easing: expoOut }}
      out:scale={finalScaleOptions}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 752 752" width="500" height="500"
    >
      <g style="" transition:fade={{ delay: 100, duration: svgAnimDuration - 100 }} transform="matrix(2.007472, 0, 0, 2.007472, -384.660797, -351.768585)">
        <path
          in:draw={{ duration: svgAnimDuration }}
          d="m487.86 482.21h-221.15c-1.6406 0-3.1641-0.85156-4.0273-2.2461l-29.117-47.129c-0.92578-1.5-0.94531-3.3789-0.046875-4.8984l113.8-192.54c0.85156-1.4414 2.4023-2.3281 4.0781-2.3281h50.25c1.6797 0 3.2383 0.89453 4.0859 2.3398l112.77 192.54c0.85156 1.457 0.86719 3.25 0.039063 4.7227l-26.555 47.129c-0.84375 1.4883-2.4219 2.4102-4.1328 2.4102zm-218.51-9.4727h215.74l23.863-42.344-110.02-187.85h-44.836l-110.97 187.75z"
          style="stroke-linecap: round;stroke-miterlimit: 1;stroke: white;stroke-width: 9.46464px;"
          fill="var(--current-fill)"
        />
        <path in:draw={{ duration: svgAnimDuration }} d="M 483.76 479.85 L 444.309 411.945 L 404.858 344.04 L 392.035 364.116 L 379.213 384.192 C 378.777 384.874 378.184 385.421 377.497 385.797 C 376.81 386.173 376.029 386.38 375.221 386.38 L 347.16 386.38 L 319.1 386.38 C 318.254 386.38 317.442 386.154 316.735 385.746 C 316.028 385.338 315.426 384.747 315.002 384.016 C 314.578 383.286 314.365 382.469 314.364 381.652 C 314.362 380.836 314.572 380.018 314.994 379.286 L 356.266 307.366 L 397.537 235.446 L 401.645 237.805 L 405.752 240.165 L 366.514 308.535 L 327.275 376.905 L 349.949 376.905 L 372.623 376.905 L 386.838 354.647 L 401.053 332.389 C 401.498 331.693 402.103 331.125 402.805 330.741 C 403.507 330.357 404.307 330.158 405.143 330.201 C 405.969 330.219 406.76 330.451 407.449 330.858 C 408.137 331.264 408.723 331.846 409.139 332.56 L 450.545 403.83 L 491.951 475.1 L 487.855 477.475 Z"
          style="stroke-linecap: round;stroke-miterlimit: 1;stroke: white;stroke-width: 9.46464px;" fill="var(--current-fill)"/>
        <path in:draw={{ duration: svgAnimDuration }} d="m403.48 435.05h-165.89v-9.4727h157.66l-24.129-41.555 8.1914-4.7539 28.258 48.668c0.85156 1.4648 0.85156 3.2695 0.007812 4.7383s-2.4062 2.375-4.1016 2.375z"
        style="stroke-linecap: round;stroke-miterlimit: 1;stroke: white;stroke-width: 9.46464px;" fill="var(--current-fill)"/>
      </g>
    </svg>
  </div>
{:else}
  <div class="bg"></div>
{/if}