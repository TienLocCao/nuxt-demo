<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        :class="isInFirstPage && 'disable'"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
        @click="onClickPreviousPage"
      >
        &#10096;
      </button>
    </li>

    <li v-for="(page, index) in pages" :key="index" class="pagination-item">
      <button
        type="button"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        :aria-label="`Go to page number ${page.name}`"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        :class="isInLastPage && 'disable'"
        :disabled="isInLastPage"
        aria-label="Go to next page"
        @click="onClickNextPage"
      >
        &#10097;
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }

      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []
      if (this.totalPages < this.maxVisibleButtons) {
        for (let i = 1; i <= this.totalPages; i += 1) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage,
          })
        }
      } else {
        for (let i = this.startPage; i <= this.endPage; i += 1) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage,
          })
        }
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
  template: '#pagination',
}
</script>

<style scope>
/* GENERAL STYLES */
.pagination {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-align: center;
}

.pagination li {
  display: inline-block;
  color: #222;
}

.pagination button {
  width: 40px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
  transition: all 0.2s ease-in-out;
  background: transparent;
  border: none;
}

.pagination button.active,
.pagination button:not(.disable):hover {
  background-color: var(--primary03);
  border-radius: 100%;
  color: #fff;
}
</style>
