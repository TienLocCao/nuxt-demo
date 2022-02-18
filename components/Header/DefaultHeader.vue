<template>
  <header id="header">
    <page-container>
      <h1 class="logo">Logo</h1>
      <ul class="nav">
        <li v-for="(item, index) in links" :key="index">
          <nuxt-link :to="item.to">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </page-container>
  </header>
</template>

<script>
import PageContainer from '../Containers/PageContainer.vue'
export default {
  name: 'HeaderPage',
  components: { PageContainer },
  data() {
    return {
      links: [
        { to: '/', name: 'Home' },
        { to: '/products', name: 'Products' },
        { to: '/contact', name: 'Contact' },
        { to: '/FAQ', name: 'FAQ' },
        { to: '/admin', name: 'Management' },
      ],
    }
  },
}
</script>

<style lang="scss">
#header {
  height: 52px;
  background: var(--color);
  display: flex;
  align-items: center;
  .page-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: 26px;
      text-transform: uppercase;
      color: var(--primary);
    }
    .nav {
      li {
        display: inline-block;
        a {
          padding: 16px;
          font-weight: 500;
          &:hover,
          &.nuxt-link-exact-active {
            color: var(--primary);
          }
        }
      }
    }
  }
}
</style>
