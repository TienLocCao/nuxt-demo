<template>
  <v-modal name="products-action" class="dialog-products">
    <p class="dialog-products__header mb-3">{{ title }}</p>
    <form class="dialog-products__form">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="products.title"
          type="text"
          name="title"
          placeholder="Title.."
        />
        <div class="invalid-feedback">
          <span
            v-if="!$v.products.title.required"
            :class="{ show: !$v.products.title.required }"
            >Title is required!</span
          >
        </div>
      </div>
      <div class="form-group">
        <label for="img">Image</label>
        <input
          id="img"
          v-model="products.img"
          type="text"
          name="img"
          placeholder="Image.."
        />
        <div class="invalid-feedback">
          <span
            v-if="!$v.products.img.required"
            :class="{ show: !$v.products.img.required }"
            >Image is required!</span
          >
        </div>
      </div>
      <div class="form-group form-group--bottom">
        <base-button
          v-if="data"
          color="success"
          class="mx-3"
          @click.prevent="edit"
          >EDIT</base-button
        >
        <base-button v-else color="success" class="mx-3" @click.prevent="add"
          >ADD</base-button
        >
        <base-button @click.prevent="cancel">Cancel</base-button>
      </div>
    </form>
  </v-modal>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
import BaseButton from '@/components/Elements/BaseButton.vue'
export default {
  components: { BaseButton },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          title: String,
          img: String,
        }
      },
    },
  },
  data() {
    return {
      title: 'Create Products',
      products: {
        title: '',
        img: '',
      },
      dataDefault: '{"title":"","img":""}',
    }
  },
  validations() {
    return {
      products: {
        title: {
          required,
        },
        img: {
          required,
        },
      },
    }
  },
  watch: {
    data(val) {
      if (val) {
        this.title = 'Edit Products'
        this.products = {
          id: val.id,
          title: val.title,
          img: val.img,
        }
        this.dataDefault = JSON.stringify(this.products)
      } else {
        this.title = 'Create Products'
        const dataDefault = {
          title: '',
          img: '',
        }
        this.products = dataDefault
      }
      this.dataDefault = JSON.stringify(this.products)
    },
  },
  created() {
    this.abc = false
    this.$nextTick(() => {
      this.$v.$reset()
      this.abc = true
    })
  },
  methods: {
    add() {
      const item = {
        img: this.products.img,
        title: this.products.title,
      }
      axios
        .post(
          'https://fir-page-a18be-default-rtdb.firebaseio.com/products.json',
          item
        )
        .then(() => {
          this.$emit('callback', '')
          this.close()
          // eslint-disable-next-line no-console
        })
        .catch((err) => {
          console.err(err)
        })
    },
    edit() {
      axios
        .put(
          `https://fir-page-a18be-default-rtdb.firebaseio.com/products/${this.products.id}.json`,
          this.products
        )
        .then(() => {
          this.$emit('callback', '')
          this.close()
          // eslint-disable-next-line no-console
        })
        .catch((err) => {
          console.err(err)
        })
    },
    cancel() {
      const dataDefault = JSON.parse(this.dataDefault)
      if (
        this.products.title === dataDefault.title &&
        this.products.img === dataDefault.img
      ) {
        // Object.assign(this.$data, this.$options.data.call(this));
        this.close()
      } else {
        // this.dialog = true;
        console.log('has change')
        this.close()
      }
    },
    close() {
      this.products = {
        title: '',
        img: '',
      }
      this.$modal.close({ name: 'products-action' })
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-products {
  &__header {
    font-size: 22px;
    font-weight: bold;
  }
  &__form {
    input {
      width: 100%;
      padding: 12px 20px;
      box-sizing: border-box;
      font-size: 16px;
    }
    .form-group {
      margin-bottom: 16px;
      label {
        font-size: 15px;
      }
      &.form-group--bottom {
        display: flex;
        justify-content: flex-end;
        margin-top: 26px;
      }
      .btn {
        font-size: 16px;
        &:hover {
          opacity: 0.8;
        }
      }
      .invalid-feedback span {
        color: var(--error);
        font-size: 12px;
        transform: translateY(-8px);
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        opacity: 0;
        &.show {
          transform: translateY(0);
          transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
          opacity: 1;
        }
      }
    }
  }
}
</style>
