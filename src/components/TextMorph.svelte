<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    text: string;
    class?: string;
    as?: string;
    baseSpeed?: number;
  }

  let {
    text,
    class: className = "",
    as: tag = "div",
    baseSpeed = 85,
  }: Props = $props();

  let displayed = $state("");
  let typing = $state(false);

  function delay(char: string): number {
    if (",.!?;".includes(char)) return baseSpeed * 3 + Math.random() * baseSpeed * 2;
    if (char === " ") return baseSpeed * 0.4 + Math.random() * baseSpeed * 0.3;
    if ("'\"".includes(char)) return baseSpeed + Math.random() * baseSpeed * 0.5;
    return baseSpeed * 0.6 + Math.random() * baseSpeed * 0.9;
  }

  onMount(() => {
    let i = 0;
    typing = true;

    function typeNext() {
      if (i >= text.length) {
        typing = false;
        return;
      }
      displayed = text.slice(0, ++i);
      setTimeout(typeNext, delay(text[i - 1]));
    }

    setTimeout(typeNext, 300);
  });
</script>

<svelte:element this={tag} class={className}>
  {displayed}{#if typing}<span class="cursor">&#x2502;</span>{/if}
</svelte:element>

<style>
  .cursor {
    margin-left: 1px;
    animation: blink 0.55s step-end infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
