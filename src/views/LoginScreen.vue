<template>
  <section class="h-screen">
    <div
      class="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 to-amber-700"
    >
      <form class="p-10 bg-white rounded-xl drop-shadow-lg space-y-5" action="">
        <h1 class="text-center text-3xl font-black">
          Berkah Baja Makur <br />
          <small class="text-center text-xl">Manufaktur</small>
        </h1>

        <div class="flex flex-col space-y-2">
          <label class="text-sm font-light" for="email">User</label>
          <input
            v-model="authStore.username"
            class="w-96 px-3 py-2 rounded-md border border-slate-400"
            type="text"
            placeholder="Isi username"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label class="text-sm font-light" for="password">Password</label>
          <input
            v-model="authStore.password"
            class="w-96 px-3 py-2 rounded-md border border-slate-400"
            type="password"
            placeholder="Isi password"
          />
        </div>

        <div>
          <input type="checkbox" name="remember" id="remember" />
          <label class="text-sm font-light" for="remember"> Remember me</label>
        </div>

        <!-- <div class="card-actions justify-end mt-10"> -->
        <button
          :disabled="authStore.isLoading"
          type="submit"
          class="btn btn-secondary modal-button"
          @click="login"
        >
          <template v-if="authStore.isLoading">
            <svg
              role="status"
              class="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </template>
          <template v-else><span>Masuk</span></template>
        </button>
        <!-- </div> -->

        <!-- <button
          class="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
          type="submit"
        >
          Masuk
        </button> -->
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '../stores/store'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    async function login() {
      const response = await authStore.login()
      if (response) {
        router.push({ name: 'dashboard' })
      }
    }
    return {
      login,
      authStore,
    }
  },
}
</script>
