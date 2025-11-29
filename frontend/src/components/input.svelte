<script>
  let { 
    value = $bindable(),
    id,
    label,
    placeholder,
    handleInput,
    type = 'text',
    textarea = false
  } = $props();
</script>

<label for={id} class="block text-sm font-medium mb-1">
  {label}
</label>

{#if textarea}
  <textarea
    bind:value={value}
    class="mb-1 w-full px-3 py-2 border border-black focus:outline-none focus:ring-1 focus:ring-black"
    required
  >
  </textarea>
{:else}
<input
  bind:value={value}
  type={type}
  id={id}
  placeholder={placeholder}
  oninput={handleInput}
  class="mb-1 w-full px-3 py-2 border border-black focus:outline-none focus:ring-1 focus:ring-black"
  required
/>
{/if}
