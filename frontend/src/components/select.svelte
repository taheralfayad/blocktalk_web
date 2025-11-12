<script>
  let { value = $bindable(), id, label, options, multiple = false, required = false} = $props();
</script>

<label for={id} class="block text-sm font-medium mb-1">
  {label}
</label>

<select 
  id={id}
  bind:value={value}
  class:required={required}
>
  {#each options as option}
    <option value={option}>{option}</option>
  {/each}
</select>
