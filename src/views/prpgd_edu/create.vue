<template>
  <div>
    <DataForm :forms="config.form" label-position="right" />
  </div>
</template>

<script>
import DataForm from '@/components/organisms/DataForm'
import config from './config'
export default {
  components: {
    DataForm
  },
  data() {
    return {
      config: config
    }
  }
}
</script>

<style></style>
