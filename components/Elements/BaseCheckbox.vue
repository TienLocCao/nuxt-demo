<template>
  <div class="base-checkbox">
    <label>
      <input v-model="value" v-indeterminate="indeterminate" type="checkbox" />
      <span><slot></slot></span>
    </label>
  </div>
</template>

<script>
export default {
  directives: {
    indeterminate(el, binding) {
      el.indeterminate = Boolean(binding.value)
    },
  },
  props: {
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: false,
    }
  },
}
</script>
