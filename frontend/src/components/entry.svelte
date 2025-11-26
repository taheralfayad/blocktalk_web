<script>
  let { title, address, content } = $props();
</script>

<div class="p-4 border rounded-xl shadow-sm bg-white max-h-32 overflow-hidden">
  <h1 class="text-xl font-semibold text-gray-800">{title}</h1>
  <h2 class="text-md text-gray-600">{address}</h2>
  <p class="text-gray-700 text-sm mt-2 leading-snug">{content}</p>
</div>
