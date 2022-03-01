<template>
  <div class="item">
    <figure class="p-sec-03__img01">
      <img :src="img" alt="thumbnail" class="img_switch" />
    </figure>
    <h6>{{ title }}</h6>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    img: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.item {
  border: 2px solid var(--color);
  padding: 8px;
  display: flex;
  flex-direction: column;
  figure {
    flex: 1;
    display: flex;
    align-items: center;
    background: #333;
  }
  h6 {
    font-size: 20px;
    font-weight: 300;
  }
}
</style>
