<template>
  <page-container>
    <div class="faq-page">
      <header-main>Page FAQ</header-main>
    </div>
  </page-container>
</template>

<script>
import PageContainer from '../../components/Containers/PageContainer.vue'
import HeaderMain from '@/components/Common/HeaderMain.vue'
export default {
  name: 'FAQPage',
  components: { PageContainer, HeaderMain },
  layout: 'index',
}
</script>
