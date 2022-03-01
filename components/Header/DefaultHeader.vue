<template>
  <header id="header">
    <page-container>
      <h1 class="header__logo">Logo</h1>
      <ul class="header__nav" :class="{ isActive: menuActive }">
        <li v-for="(item, index) in links" :key="index">
          <nuxt-link :to="item.to" @click.native="menuActive = false">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
      <!-- @click="menuActive = !menuActive" -->
      <div class="header__menu pointer" @click="isToggleMenu">
        <div class="icon" :class="[menuActive ? 'close' : 'menu']"></div>
      </div>
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
      menuActive: false,
    }
  },
  methods: {
    isToggleMenu() {
      // eslint-disable-next-line no-console
      this.menuActive = !this.menuActive
      const root = document.getElementsByTagName('html')[0] // '0' to assign the first (and only `HTML` tag)
      if (this.menuActive) {
        root.classList.add('overflow-hidden')
      } else {
        root.classList.remove('overflow-hidden')
      }
    },
  },
}
</script>

<style lang="scss">
.close.icon {
  color: #000;
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  width: 21px;
  height: 21px;
}

.close.icon:before {
  content: '';
  position: absolute;
  top: 12px;
  width: 24px;
  height: 2px;
  background-color: currentColor;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.close.icon:after {
  content: '';
  position: absolute;
  top: 12px;
  width: 24px;
  height: 2px;
  background-color: currentColor;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.menu.icon {
  color: #000;
  position: absolute;
  margin-left: 2px;
  margin-top: 10px;
  width: 24px;
  height: 2px;
  background-color: currentColor;
}

.menu.icon:before {
  content: '';
  position: absolute;
  top: -8px;
  left: 0;
  width: 24px;
  height: 2px;
  background-color: currentColor;
}

.menu.icon:after {
  content: '';
  position: absolute;
  top: 8px;
  left: 0;
  width: 24px;
  height: 2px;
  background-color: currentColor;
}

.icon,
.icon:before,
.icon:after,
.icon i,
.icon i:before,
.icon i:after {
  transition: all 0.4s ease;
}
#header {
  height: 52px;
  background: var(--color);
  display: flex;
  align-items: center;
  .page-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header__logo {
      font-size: 26px;
      text-transform: uppercase;
      color: var(--primary);
    }
    .header__nav {
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
      @media screen and (max-width: 768px) {
        transform: translateX(-100vw);
        transition: transform 0.4s ease-in;
        position: fixed;
        top: 52px;
        left: 0;
        right: 0;
        bottom: 0;
        height: calc(100% - 52px);
        background: #fff;
        display: flex;
        flex-direction: column;
        z-index: 999;
        li a {
          display: block;
          text-align: center;
          &:hover,
          &.nuxt-link-exact-active {
            background: var(--primary);
            color: #fff;
            transition: all 0.4s ease-in-out;
          }
        }
        &.isActive {
          transform: translateX(0);
          transition: transform 0.4s ease-in;
        }
      }
    }
    .header__menu {
      display: none;
      width: 20px;
      height: 20px;
      @media screen and (max-width: 768px) {
        display: block;
      }
    }
  }
}
</style>
