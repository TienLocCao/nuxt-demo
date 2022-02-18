<template>
  <page-container>
    <div class="management-page">
      <div class="mb-4">
        <h3 class="page-title">Page Management</h3>
      </div>
      <div class="management-page_main">
        {{ products }}
        <base-data-table :headers="headers" :items="products">
          <template #header="{ props }">
            <tr class="header-table">
              <th class="w-50 center">
                <!-- <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    hide-details
                    @click.stop.native.prevent="toggleAll"
                    color="primary"
                  ></v-checkbox> -->
                <base-checkbox @click.stop.native.prevent="toggleAll" />
              </th>
              <th
                v-for="header in props"
                :key="header.text"
                :class="[header.align, header.width]"
              >
                <!-- :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '' ,header.align ,header.width?header.width:'']"
                  @click="changeSort(header.value)" -->
                <div
                  v-if="header.method"
                  class="pointer"
                  @click="header.method"
                >
                  {{ header.text
                  }}<svg
                    class="icon-sort"
                    width="24"
                    height="35"
                    viewBox="0 0 24 35"
                    fill="none"
                  >
                    <path d="M7 14L12 9L17 14H7Z" fill="#fff"></path>
                    <path d="M17 21L12 26L7 21L17 21Z" fill="#fff"></path>
                  </svg>
                </div>
                <div v-else>{{ header.text }}</div>
                <!-- {{ header.text }} -->
              </th>
            </tr>
          </template>
          <template #item="{ props }">
            <tr class="cursor-pointer" @click="avatar(props, props.id)">
              <td class="center" :active="props.selected">
                <!-- <v-checkbox
                    color="primary"
                    :input-value="props.selected"
                    primary
                    hide-details
                    @click.stop.native
                    @change="avatar(props.item, props.item.nIdApplicationBox)"
                  ></v-checkbox> -->
                <base-checkbox />
              </td>

              <td class="txt-center">
                {{ props.id }}
              </td>
              <td>
                {{ props.title }}
              </td>
              <td>
                <img
                  :src="props.img"
                  alt=""
                  style="width: 100px; height: auto"
                />
              </td>
            </tr>
          </template>
          <!-- <template #[`item.img`]="{item}">
                
            </template> -->
        </base-data-table>
        <base-pagination
          :total-pages="3"
          :total="113"
          :per-page="10"
          :current-page="currentPage"
          @pagechanged="onPageChange"
        />
      </div>
    </div>
  </page-container>
</template>

<script>
import axios from 'axios'
import PageContainer from '@/components/Containers/PageContainer.vue'
import BaseDataTable from '@/components/Elements/BaseDataTable.vue'
import BasePagination from '@/components/Elements/BasePagination.vue'
import BaseCheckbox from '@/components/Elements/BaseCheckbox.vue'
export default {
  name: 'ManagementPage',
  components: { PageContainer, BaseDataTable, BasePagination, BaseCheckbox },
  layout: 'index',
  asyncData(context) {
    // return new Promise((resolve, reject) => {
    //   resolve({
    //       products: [{
    //       id: 1,
    //       img: "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg",
    //       title: "item 01"
    //     },
    //     {
    //       id: 2,
    //       img: "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg",
    //       title: "item 02"
    //     },
    //     {
    //       id: 3,
    //       img: "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg",
    //       title: "item 03"
    //     },
    //     {
    //       id: 4,
    //       img: "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg",
    //       title: "item 04"
    //     },
    //     {
    //       id: 5,
    //       img: "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg",
    //       title: "item 05"
    //     }]
    //   })
    // }).then((data) => {return data;}).catch(e => context.error('404'));
  },
  data() {
    return {
      currentPage: 1,
      sortNameTokenExchange: true,
      products: [],
      headers: [
        { text: 'id', value: 'id', align: 'center', width: 'w-70' },
        {
          text: 'Title',
          value: 'title',
          method: () => this.handleSortNameTokenExchange(),
        },
        { text: 'Img', value: 'img' },
      ],
    }
  },
  async fetch() {
    this.products = await axios
      .get('https://fir-page-a18be-default-rtdb.firebaseio.com/products.json')
      .then((data) => {
        return data.data
      })
  },
  // created() {
  //   // eslint-disable-next-line no-console
  //   console.log('zo');
  //   const item = {
  //         img: "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg",
  //         title: "item 01"
  //       };
  //   axios.post('https://fir-page-a18be-default-rtdb.firebaseio.com/products.json', item).then((data) => {return data.data;});
  // },
  methods: {
    handleSortNameTokenExchange() {
      const data = this.products || []
      if (this.sortNameTokenExchange) {
        data.sort((a, b) => a.title.localeCompare(b.title))
        this.sortNameTokenExchange = false
      } else {
        data.sort((a, b) => b.title.localeCompare(a.title))
        this.sortNameTokenExchange = true
      }
    },
    onPageChange(page) {
      this.currentPage = page
    },
  },
}
</script>
