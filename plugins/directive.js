import Vue from 'vue'

Vue.directive('pin', {
  bind: (el, binding, vnode) => {
    // el.style.position = 'fixed'
    // el.style.top = binding.value + 'px'
  },
})
