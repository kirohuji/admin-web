<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm
        ref="dataSearchForm"
        :forms="config.search"
        label-position="right"
        style="justify-content: space-between;"
        mode="search"
        @search="() => cardData.refresh.call(cardData, searcher)"
      >
        <template v-slot:right>
          <el-button type="primary" @click="$router.push(`/information/infomanage/edit/${0}`)">新建资讯</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 32px;padding-top: 0;display: flex;flex-wrap: wrap;justify-content: space-between;">
      <el-card
        v-for="(card, index) in cards.data"
        :key="index"
        :body-style="{ padding: '0px' }"
        style="min-width: 320px;height:255px;margin: 24px;"
      >
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%;height:180px"
        >
        <div style="padding: 14px;">
          <span>{{ card.name }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="goto(card.url)">查看</el-button>
          </div>
        </div>
      </el-card>
    </Card>
  </div>
</template>

<script>
import DataSearchForm from '@/components/organisms/DataSearchForm'
import Card from '@/components/atoms/Card'
import config from './config'
import { service } from './service'
export default {
  components: {
    Card,
    DataSearchForm
  },
  data() {
    return {
      config: config,
      cards: {
        selected: {},
        data: []
      }
    }
  },
  computed: {
    searcher() {
      return {
        ...this.$refs.dataSearchForm.model
      }
    }
  },

  thenable: {
    cardData() {
      return {
        target: 'cards.data',
        runner: service.getlist.bind(service),
        callback: (res) => {
          return res.list
        },
        immediate: true
      }
    }
  },
  methods: {
    goto(url) {
      window.open(url)
    }
  }
}
</script>
