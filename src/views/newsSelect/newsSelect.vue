<template>
  <article>
    <div class="container">
        <div class="article" v-loading="loadingFirst">
          <el-carousel trigger="click" height="348px" :interval="3600" class="banner">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
              <img :src="item.banner_url" alt="" class="banner_Img">
            </el-carousel-item>
          </el-carousel>
          <div class="block clear">
              <div
                v-for="item in itemByDate"
                :key="item.uid"
                class="items"
              >
              <div class="block-head">
                    <img :src="item.userpic" alt="" class="headPic">
                    <p class="name" @click="gotoUser(item.user_id)">{{item.username}}</p>
                    <p class="time">{{item.time}}</p>
                </div>
              <div class="block-left fl">
                <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title}}</h2>
                <p class="blogtext" v-html="item.brief">{{item.brief}}</p>
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
import { getChoiceDepth, getBannerList } from '@/api/depth'
export default {
  data () {
    return {
      itemByDate: [],
      bannerList: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      totalPage:2,
      isEnd:false,//是否到底
      loading:false,//加载中
      loadingFirst: true
    }
  },
  components: {
    // 注册组件
  },
  mounted () { 

  },
  created () {
    this.getList(this.currentPage)
    this.getBanner()
  },
  methods: {
    getList (page) {
        this.loading = true
        getChoiceDepth(page).then( res => {
            this.loading = false
            this.loadingFirst = false
            if(this.page == 1){
                this.itemByDate = res.data.list.data
            }else{
                this.itemByDate = [...this.itemByDate,...res.data.list.data]
            }
            
            this.totalPage = res.data.list.totalPage
            if( this.currentPage == this.totalPage){
                this.isEnd = true
            }
            // console.log(res)
        })
    },
    getBanner(){
      getBannerList().then( res => {
        this.bannerList = res.data
      }).catch( err => {
          this.$message.error(err.response.data.msg);
      })
    },
    loadContent () {
      this.currentPage++
      this.getList(this.currentPage)
    },
    gotoDetails(item){
        this.$router.push({path:'/depthDetails',query:{ id : item.id,userId: item.user_id}})
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
        background-color: #FAFAFA;
        font-size: 14px;
        color: #333333;
        text-align: center;
        line-height: 36px;
    }
    .isLoadEnd{
        font-size: 14px;
        color: #AEAEAE;
        text-align: center;
        width: 100%;
        display: block;
        line-height: 36px;
    }
}
.block{
    width: 1000px;
    margin: 0 auto;
    min-height: 400px;
    .items{
        border-bottom: 1px solid #E7E7E7;
        padding: 20px 0;
        overflow: hidden;
    }
    .itemTitle{
        font-size: 18px;
        color: #333333;
        line-height: 60px;
        cursor: pointer;
    }
    .blogtext{
        color: #666666;
        font-size: 14px;
        line-height: 24px;
        word-wrap:break-word;
    }
    .block-left{
        width: 780px;
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
    }
    .name{
        font-size: 14px;
        color: #333333;
        float: left;
        margin-right: 20px;
        line-height: 44px;
        cursor: pointer;
    }
}
.banner_Img{
  width: 100%;
  height: 348px;
  border-radius: 6px;
}
.banner{
  width: 1000px;
  margin: 0 auto;
  float: none;
  border-radius: 6px;
  height: 348px;
}
</style>
