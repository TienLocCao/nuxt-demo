<template>
  <div class="main-header mb-4">
    <h3 class="main-header__title">
      <slot></slot>
    </h3>
    <div class="main-header__action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderMain',
}
</script>

<style lang="scss">
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  &__title {
    font-size: 26px;
    color: var(--primary);
  }
  a {
    text-decoration: underline;
    font-weight: 500;
    color: var(--primary);
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
