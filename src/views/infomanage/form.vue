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
  },
  created() {
    // const id = this.$route.params && this.$route.params.id
    // this.fetchData(id)
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {

  }
}
</script>

<style></style>
