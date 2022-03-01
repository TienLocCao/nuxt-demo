<template>
  <page-container>
    <div class="management-page">
      <header-main>
        Page Management
        <template #action>
          <div class="d-flex">
            <base-button color="primary" @click="showModal()"
              >Create</base-button
            >
            <base-button
              color="success"
              class="mx-3"
              :disabled="isDisableEdit"
              @click="showModal(products.find((f) => f.id === selected[0]))"
              >Edit</base-button
            >
            <base-button
              color="error"
              :disabled="isDisableDelete"
              @click="$modal.open({ name: 'delete-item' })"
              >Delelte</base-button
            >
          </div>
        </template>
      </header-main>
      <div class="management-page_main">
        <base-data-table :headers="headers" :items="products">
          <template #header="{ props }">
            <tr class="header-table">
              <th class="w-50 center">
                <!-- <base-checkbox @click.stop.native.prevent="toggleAll" /> -->
              </th>
              <th
                v-for="header in props"
                :key="header.text"
                :class="[header.align, header.width]"
              >
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
              </th>
            </tr>
          </template>
          <template #item="{ props }">
            <tr class="pointer" @click="avatar(props.id)">
              <td class="center">
                <base-checkbox
                  hide="true"
                  :data="selected.some((val) => val === props.id)"
                />
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
          <template #[`item.id`]="{ item }">
            {{ isShortString(item.id) }}
          </template>
          <template #[`item.img`]="{ item }">
            <img :src="item.img" alt="" style="width: 100px; height: auto" />
          </template>
        </base-data-table>
        <!-- <base-pagination
          :total-pages="3"
          :total="113"
          :per-page="10"
          :current-page="currentPage"
          @pagechanged="onPageChange"
        /> -->

        <dialog-products :data="dataSend" @callback="init()" />
        <dialog-delete-item
          :loading-delete.sync="loadingDelete"
          @delete-item="deleteItem()"
        />
      </div>
    </div>
  </page-container>
</template>

<script>
import axios from 'axios'
import PageContainer from '@/components/Containers/PageContainer.vue'
import BaseDataTable from '@/components/Elements/BaseDataTable.vue'
import HeaderMain from '@/components/Common/HeaderMain.vue'
import DialogProducts from '@/components/Admin/DialogProducts.vue'
// import BasePagination from '@/components/Elements/BasePagination.vue'
import BaseCheckbox from '@/components/Elements/BaseCheckbox.vue'
import BaseButton from '@/components/Elements/BaseButton.vue'
import DialogDeleteItem from '@/components/Common/Dialog/DialogDeleteItem.vue'
export default {
  name: 'ManagementPage',
  components: {
    PageContainer,
    BaseDataTable,
    HeaderMain,
    DialogProducts,
    BaseCheckbox,
    BaseButton,
    DialogDeleteItem,
  },
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
        { text: 'id', value: 'id', align: 'center', width: 'w-100' },
        {
          text: 'Title',
          value: 'title',
          method: () => this.handleSortNameTokenExchange(),
        },
        { text: 'Img', value: 'img' },
      ],
      modalCreate: false,
      selected: [],
      dataSend: null,
      loadingDelete: false,
    }
  },
  computed: {
    isDisableEdit() {
      return this.selected.length !== 1
    },
    isDisableDelete() {
      return this.selected.length === 0 || this.loadingDelete
    },
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.products = await axios
        .get('https://fir-page-a18be-default-rtdb.firebaseio.com/products.json')
        .then((response) => {
          const productsArr = []
          for (const key in response.data) {
            productsArr.push({ ...response.data[key], id: key })
          }

          return productsArr
        })
    },
    handleSortNameTokenExchange() {
      const data = this.products || []
      // eslint-disable-next-line no-console
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
    isShortString(value) {
      const lenAddress = value.length

      const getFirst = value.slice(0, 3)
      const getEnd = value.slice(lenAddress - 3)

      return `${getFirst}...${getEnd}`
    },
    showModal(item) {
      if (item) {
        this.dataSend = item
        this.$modal.open({ name: 'products-action' })
      } else {
        this.dataSend = null
        this.$modal.open({ name: 'products-action' })
      }
    },
    avatar(id) {
      if (this.selected.find((val) => val === id)) {
        this.selected = this.selected.filter((val) => val !== id)
      } else {
        this.selected.push(id)
      }
    },
    deleteItem() {
      const lengthData = this.selected.length
      for (let i = 0; i < lengthData; i++) {
        axios
          .delete(
            `https://fir-page-a18be-default-rtdb.firebaseio.com/products/${this.selected[i]}.json`
          )
          .then(
            () =>
              // this.status
              //   ? [
              // window.getApp.$emit("ALERT_MESSAGE", "success", this.message),
              // this.$emit("fetch-data",this.selected[i]),
              this.filterProductsByDelete(this.selected[i])
            // ]
            // : this.error.map(m =>
            //     // window.getApp.$emit("ALERT_MESSAGE", "error", m),
            //     // this.$emit("delete-fail")
            //     // this.deleteFail();
            //     console.log('erroraaaaaaa')
            //   )
          )
          .then(() => {
            if (lengthData === i + 1) this.loadingDelete = false
          })
          .catch((err) => console.error(err))
      }
    },
    filterProductsByDelete(id) {
      this.products = this.products.filter((f) => f.id !== id)
      this.selected = this.selected.filter((f) => f.id !== id)
      this.init()
    },
    // deleteFail(){
    //   this.selected=this.selected.map(o => JSON.stringify(o)).map(s => JSON.parse(s));
    // },
  },
}
</script>
