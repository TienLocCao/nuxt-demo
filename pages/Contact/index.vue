<template>
  <page-container>
    <div class="contact-page">
      <header-main>Page Contact</header-main>
    </div>
  </page-container>
</template>

<script>
import PageContainer from '../../components/Containers/PageContainer.vue'
import HeaderMain from '@/components/Common/HeaderMain.vue'
export default {
  name: 'ContactPage',
  components: { PageContainer, HeaderMain },
  layout: 'index',
}
</script>
