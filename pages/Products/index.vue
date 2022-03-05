<template>
  <page-container>
    <div class="products-page">
      <header-main>Page Products</header-main>
      <div class="product-page_list">
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
import { mapGetters, mapActions } from 'vuex'
import PageContainer from '@/components/Containers/PageContainer.vue'
import ProductItem from '@/components/Products/item.vue'
import HeaderMain from '@/components/Common/HeaderMain.vue'
export default {
  name: 'FooterPage',
  components: {
    PageContainer,
    ProductItem,
    HeaderMain,
  },
  layout: 'index',
  // asyncData(context) {
  //   return new Promise((resolve, reject) => {
  //     resolve({
  //       products: [
  //         {
  //           id: 1,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 01',
  //         },
  //         {
  //           id: 2,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 02',
  //         },
  //         {
  //           id: 3,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 03',
  //         },
  //         {
  //           id: 4,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 04',
  //         },
  //         {
  //           id: 5,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 05',
  //         },
  //         {
  //           id: 6,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 06',
  //         },
  //         {
  //           id: 7,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 07',
  //         },
  //         {
  //           id: 8,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 08',
  //         },
  //         {
  //           id: 9,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 09',
  //         },
  //         {
  //           id: 10,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 10',
  //         },
  //         {
  //           id: 11,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 11',
  //         },
  //         {
  //           id: 12,
  //           img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
  //           title: 'item 12',
  //         },
  //       ],
  //     })
  //   })
  //     .then((data) => {
  //       return data
  //     })
  //     .catch((e) => context.error('404'))
  // },
  computed: {
    ...mapGetters({
      products: 'products/products',
    }),
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
    }),
    init() {
      this.fetchProducts()
    },
  },
}
</script>

<style lang="scss">
.product-page {
  &_list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
  }
}
</style>
