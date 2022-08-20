<template>
  <div class="md:flex md:space-x-10 md:space-y-0 space-y-4">
    <div
      class="card md:w-72 w-full bg-neutral hover:bg-secondary hover:cursor-pointer shadow-xl"
    >
      <div class="card-body items-center hover:text-white">
        <router-link :to="{ name: 'produksi-order' }">
          <h2 class="card-title">Production Order</h2>
        </router-link>
      </div>
    </div>

    <div
      class="card md:w-72 w-full bg-neutral hover:bg-secondary hover:cursor-pointer shadow-xl"
    >
      <div class="card-body items-center hover:text-white">
        <h2 class="card-title">Input</h2>
      </div>
    </div>
  </div>
</template>
