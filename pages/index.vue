<template>
  <page-container>
    <div class="product">
      <header-main>
        Featured Products
        <template #action>
          <nuxt-link to="/products">View All</nuxt-link>
        </template>
      </header-main>
      <div class="product_list">
        <product-item
          v-for="item in products"
          :key="item.id"
          :img="item.img"
          :title="item.title"
        />
      </div>
    </div>
  </page-container>
</template>

<script>
import PageContainer from '@/components/Containers/PageContainer.vue'
import ProductItem from '@/components/Products/item.vue'
import HeaderMain from '@/components/Common/HeaderMain.vue'
export default {
  name: 'IndexPage',
  components: {
    PageContainer,
    HeaderMain,
    ProductItem,
  },
  layout: 'index',
  asyncData(context) {
    return new Promise((resolve, reject) => {
      resolve({
        products: [
          {
            id: 1,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 1',
          },
          {
            id: 2,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 2',
          },
          {
            id: 3,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 3',
          },
          {
            id: 4,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 4',
          },
        ],
      })
    })
      .then((data) => {
        return data
      })
      .catch((e) => context.error('404'))
  },
}
</script>

<style lang="scss">
.product {
  &_list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
</style>
