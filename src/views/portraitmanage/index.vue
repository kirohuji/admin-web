<template>
  <div>
    <!-- <Card style="padding: 14px;padding-bottom: 0">
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
    </Card> -->
    <Card style="padding: 32px;padding-top: 0;display: flex;flex-wrap: wrap;justify-content: flex-start;">
      <el-card
        v-for="(card, index) in cards.data"
        :key="index"
        :body-style="{ padding: '0px' }"
        style="min-width: 320px;height:255px;margin: 24px;"
      >
        <img :src="require(`../../assets/${cards.map.get(card.name)}.png`)" style="width: 320px;height:180px">
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
import Card from '@/components/atoms/Card'
import config from './config'
import { service } from './service'
export default {
  components: {
    Card
  },
  data() {
    return {
      config: config,
      cards: {
        map: new Map([
          ['疫情多点预警', 'epidemicearlywarning'],
          ['健康画像', 'healthyportrait'],
          ['两慢监管', 'keygroups'],
          ['就医行为分析', 'residentbehavior'],
          ['红黄绿', 'ryg']
        ]),
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
