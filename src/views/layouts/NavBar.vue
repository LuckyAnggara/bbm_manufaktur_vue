<template>
  <div class="navbar mb-2 shadow-lg bg-neutral">
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold"> BBM Manufaktur </span>
    </div>
    <div class="flex-none hidden px-2 mx-2 md:flex">
      <ul class="text-md menu menu-horizontal p-0" v-for="item in navMenu" :key="item">
        <li class="mx-1">
          <router-link :active-class="'bg-base-200'" :to="{ name: item.route }">
            <a>{{ item.title }}</a>
          </router-link>
        </li>
      </ul>
      <div class="mx-2 dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placehold.co/40x40" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52 z-50">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-none md:hidden px-2 mx-2 dropdown dropdown-end">
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </button>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52">
        <li v-for="item in navMenu" :key="item">
          <router-link :active-class="'bg-base-200'" :to="{ name: item.route }">
            <a>{{ item.title }}</a>
          </router-link>
        </li>
        <hr />
        <li>
          <a> Profile </a>
        </li>
        <li><a>Settings</a></li>
        <li>
          <a @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import navMenu from '../../services/menu'
import { useAuthStore } from '../../stores/store'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    async function logout() {
      const response = await authStore.logout()
      console.info(response)
      if (response) {
        router.push({ name: 'login' })
      }
    }
    return {
      logout,
      authStore,
      navMenu,
    }
  },
}
</script>
