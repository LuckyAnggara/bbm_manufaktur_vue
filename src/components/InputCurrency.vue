<template>
  <input
    :readonly="readOnly"
    class="input input-bordered w-full"
    ref="inputRef"
    type="text"
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    modelValue: Number, // Vue 2: value
    options: Object,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  },
}
</script>
