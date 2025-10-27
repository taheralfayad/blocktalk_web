<script>
  let count = 0;

  function handleClick() {
    count += 1;
    console.log("Button clicked! Count:", count);
  }

	import Search from '$lib/assets/search.svg';
</script>

<div class="border-2 border-black rounded-lg flex justify-start items-center p-2">
  <button on:click={handleClick} class="hover:cursor-pointer">
    <img class="max-w-6 max-h-6" src={Search}/>
  </button>
  <input class="border-none focus:outline-none focus:ring-0"/>
</div>
