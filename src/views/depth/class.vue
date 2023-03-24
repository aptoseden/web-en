<template>
  <article>
    <div class="container"  v-loading="loadingFirst">
        <div class="article">
          <div class="block">
              <div
                v-for="item in itemByDate"
                :key="item.id"
                class="items"
              >
              <div class="block-head">
                    <img :src="item.u_userpic" alt="" class="headPic">
                    <p class="name">{{item.username}}</p>
                    <p class="time">{{item.create_time}}</p>
                </div>
              <div class="block-left fl">
                <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title}}</h2>
                <p class="blogtext" v-html="item.remark">{{item.remark}}</p>
              </div>
                <!-- <img :src="item.titlepic" alt="" class="contentPic fr"> -->
                <el-image :src="item.titlepic" lazy class="contentPic fr"></el-image>
            </div>
          </div>
        </div>
        <div class="isMore">
            <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">加载更多</div>
            <div class="loadContent" v-if="!isEnd&&loading">加载中...</div>
            <span v-if="isEnd" class="isLoadEnd">我也是有底线的~</span>
        </div>
    </div>
  </article>
</template>

<script>
import { getDepthList } from '@/api/depth'
export default {
  data () {
    return {
      itemByDate: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      totalPage:2,
      isEnd:false,//是否到底
      loading:false,//加载中
      loadingFirst: false
    }
  },
  components: {
    // 注册组件
  },
  mounted () { 

  },
  created () {
    this.getList(this.currentPage)
  },
  methods: {
    getList (page) {
      let data = {
        page : page,
        type : 1
      }
        this.loading = true
        getDepthList(data).then( res => {
            this.loading = false
            this.loadingFirst = false
            if(page == 1){
                this.itemByDate = res.data.data
                console.log(this.itemByDate)
            }else{
                this.itemByDate = [...this.itemByDate,...res.data.data]
            }
            
            this.totalPage = res.data.totalPage
            if( this.currentPage == this.totalPage){
                this.isEnd = true
            }
            // console.log(res)
        })
    },
    loadContent () {
      this.currentPage++
      this.getList(this.currentPage)
    },
    gotoDetails(item){
        this.$router.push({path:'/depthDetails',query:{ id : item.id,userId: item.user_id, depthType: 1}})
    },
    gotoUser(id){
        this.$router.push({ path: "/personalCenter",query:{ userId: id} });
    }
    
  }
}
</script>

<style lang="less" scoped>
.isMore{
    width: 1000px;
    margin: 30px auto;
    height: 36px;
    cursor: pointer;
    .loadContent{
        background-color: #1b2447;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
    }
    .isLoadEnd{
        font-size: 14px;
        color: #AEAEAE;
        text-align: center;
        line-height: 36px;
        display: block;
        width: 100%;
    }
}
.block{
    width: 1000px;
    margin: 0 auto;
    min-height: 400px;
    .items{
        // border-bottom: 1px solid #E7E7E7;
        margin-top: 20px;
        background: #1b2447;
        border-radius: 4px;
        padding: 20px;
        overflow: hidden;
    }
    .itemTitle{
        font-size: 18px;
        color: #ffffff;
        line-height: 60px;
        cursor: pointer;
    }
    .blogtext{
        color: #ffffff;
        font-size: 14px;
        line-height: 24px;
        word-wrap:break-word;
    }
    .block-left{
        width: 720px;
    }
    .contentPic{
        width: 200px;
        height: 128px;
        border-radius: 4px;
    }
    
    
}
.block-head{
    overflow: hidden;
    .time{
        color: #AEAEAE;
        font-size: 14px;
        float: left;
        line-height: 44px;
    }
    .headPic{
        height: 44px;
        width: 44px;
        border-radius: 50%;
        float: left;
        margin-right: 12px;
        line-height: 44px;
        background-color: #ffffff;
    }
    .name{
        font-size: 14px;
        color: #ffffff;
        float: left;
        margin-right: 20px;
        line-height: 44px;
        cursor: pointer;
    }
}
</style>
