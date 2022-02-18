<template>
  <page-container>
    <div class="products-page">
      <h3 class="page-title mb-4">Page Products</h3>
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
import PageContainer from '@/components/Containers/PageContainer.vue'
import ProductItem from '@/components/Products/item.vue'
export default {
  name: 'FooterPage',
  components: {
    PageContainer,
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
            title: 'item 01',
          },
          {
            id: 2,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 02',
          },
          {
            id: 3,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 03',
          },
          {
            id: 4,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 04',
          },
          {
            id: 5,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 05',
          },
          {
            id: 6,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 06',
          },
          {
            id: 7,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 07',
          },
          {
            id: 8,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 08',
          },
          {
            id: 9,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 09',
          },
          {
            id: 10,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 10',
          },
          {
            id: 11,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 11',
          },
          {
            id: 12,
            img: 'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg',
            title: 'item 12',
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
.product-page {
  &_list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
</style>
