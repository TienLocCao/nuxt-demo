<template>
  <footer id="footer">
    <page-container>
      <p>© 2022 CTL.</p>
    </page-container>
  </footer>
</template>

<script>
import PageContainer from '../Containers/PageContainer.vue'
export default {
  name: 'FooterPage',
  components: { PageContainer },
}
</script>

<style lang="scss" scoped>
#footer {
  margin-top: 24px;
  height: 28px;
  background: var(--primary);
  color: var(--primary02);
  display: flex;
  align-items: center;
  p {
    font-size: 12px;
  }
}
</style>
