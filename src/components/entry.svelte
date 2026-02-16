<script>
  let { title, address, content } = $props();
</script>

<div
  class="group p-4 rounded-xl border border-gray-200 bg-white
         shadow-sm hover:shadow-md transition-shadow
         cursor-pointer m-1"
>
  <div class="flex flex-col gap-1">
    <h1
      class="text-sm font-semibold text-gray-900 leading-snug
             line-clamp-2"
    >
      {title}
    </h1>

    <h2 class="text-xs text-gray-800">
      {address}
    </h2>
  </div>

  <p
    class="mt-2 text-sm text-gray-700 leading-relaxed
           line-clamp-3"
  >
    {content}
  </p>
</div>
