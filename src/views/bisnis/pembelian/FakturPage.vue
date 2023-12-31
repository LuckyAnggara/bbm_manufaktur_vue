<template>
  <div class="font-sans bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-md p-8 shadow-md">
      <!-- Invoice Header -->
      <div class="mb-4">
        <h2 class="text-2xl font-semibold">Invoice</h2>
        <p class="text-gray-600">
          Faktur No: <span class="font-semibold">12345</span>
        </p>
        <p class="text-gray-600">
          Nama Supplier: <span class="font-semibold">Supplier XYZ</span>
        </p>
      </div>

      <!-- Invoice Items -->
      <div class="mb-4">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-200">
              <th class="py-2 px-4 border">Jumlah</th>
              <th class="py-2 px-4 border">Harga</th>
              <th class="py-2 px-4 border">Diskon</th>
              <th class="py-2 px-4 border">Total</th>
            </tr>
          </thead>
          <tbody>
            <!-- Item 1 -->
            <tr>
              <td class="py-2 px-4 border">2</td>
              <td class="py-2 px-4 border">Rp 50,000</td>
              <td class="py-2 px-4 border">Rp 5,000</td>
              <td class="py-2 px-4 border">Rp 95,000</td>
            </tr>
            <!-- Item 2 -->
            <tr>
              <td class="py-2 px-4 border">1</td>
              <td class="py-2 px-4 border">Rp 80,000</td>
              <td class="py-2 px-4 border">Rp 0</td>
              <td class="py-2 px-4 border">Rp 80,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Invoice Summary -->
      <div>
        <div class="flex justify-between">
          <p class="text-gray-600">Total:</p>
          <p class="font-semibold">Rp 175,000</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-600">Diskon:</p>
          <p class="font-semibold">Rp 5,000</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-600">Pajak:</p>
          <p class="font-semibold">Rp 0</p>
        </div>
        <div class="flex justify-between mt-4">
          <p class="text-xl font-semibold">Grand Total:</p>
          <p class="text-xl font-semibold">Rp 170,000</p>
        </div>
      </div>
    </div>
  </div>
</template>
