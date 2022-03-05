import Vue from 'vue'

Vue.directive('pin', {
  bind: (el, binding, vnode) => {
    // el.style.position = 'fixed'
    // el.style.top = binding.value + 'px'
  },
})

// Vue.directive('font-size', {
//   bind: (el, binding, vnode) => {
//     // el.style.position = 'fixed'
//     // el.style.top = binding.value + 'px'
//     let size = 16;
//     switch(binding.arg) {
//       case "small":
//         size = 12;
//         break;
//       case "large":
//         size = 14;
//         break;
//       default:
//         size = 16;
//         break;
//     }
//     el.style.fontSize = size + 'px';
//   },
// })
