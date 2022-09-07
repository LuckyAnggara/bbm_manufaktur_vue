<template>
  <section>
    <div class="mx-auto justify-center w-full md:w-1/2">
      <div class="bg-neutral text-neutral-content rounded-b-lg">
        <div class="card-body">
          <h2 class="card-title">Data Production Order</h2>
          <p>Lengkapi data dibawah</p>
          <form @submit.prevent="">
            <div class="grid gap-y-5">
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Tanggal Order</span>
                  <input
                    id="date"
                    type="date"
                    placeholder="Type here"
                    class="input input-bordered w-3/4"
                    required
                  />
                </label>
              </div>
              <hr />
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Nama Pelanggan</span>
                  <input
                    type="text"
                    class="input input-bordered w-3/4"
                    required
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Penanggung Jawab</span>
                  <input
                    type="text"
                    required
                    class="input input-bordered w-3/4"
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Catatan</span>
                  <textarea
                    class="textarea textarea-bordered w-3/4"
                    placeholder="Bio"
                  ></textarea>
                </label>
              </div>
              <hr />
              <div class="form-control">
                <label class="input-group">
                  <span class="w-1/4">Tanggal Penyelesaian</span>
                  <input
                    id="date"
                    type="date"
                    placeholder="Type here"
                    class="input input-bordered w-3/4"
                    required
                  />
                </label>
              </div>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Next</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    return {}
  },
  components: {},
}
</script>
