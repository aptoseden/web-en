<template>
    <div>
        <!-- <div class="article"> -->
          <Empty v-if="itemByDate.length == 0"></Empty>
          <div class="block1">
              <div
                v-for="item in itemByDate"
                :key="item.id"
                class="items"
              >
              <div class="block-head">
                    <img :src="item.userpic" alt="" class="headPic">
                    <p class="name">{{item.username}}</p>
                    <p class="time">{{item.time}}</p>
                </div>
              <div class="block-left fl">
                <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title}}</h2>
                <p class="blogtext" v-html="item.brief">{{item.brief}}</p>
              </div>
                <!-- <img :src="item.photoUrl" alt="" class="contentPic fr"> -->
                <el-image :src="item.titlepic" lazy class="contentPic fr"></el-image>
            </div>
          </div>
        <!-- </div> -->
        <div class="isMore" v-if="itemByDate.length != 0">
            <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">加载更多</div>
            <div class="loadContent" v-if="!isEnd&&loading">加载中...</div>
            <span v-if="isEnd" class="isLoadEnd">我也是有底线的~</span>
        </div>
    </div>
</template>

<script>
import { getUserDepthList } from '@/api/userInfo'
export default {
  props:[
    'ownType',
    'userId'
  ],
  data () {
    return {
      selectBlogUid: '',
      reverse: false,
      activities: [],
      itemByDate: [],
      articleByDate: {},
      count: 0,
      currentPage: 1,
      totalPage:2,
      pageSize: 10,
      isEnd:false,//是否到底
      loading:false,//加载中
    }
  },
  components: {
    // 注册组件
  },
  mounted () { 
    this.$nextTick(() => { 
        this.getList(this.userId,1)
    });
  },
  created () {
    // this.getBlogList()
  },
  methods: {
    getList (id,page) {
      this.loading = true
      let data = {
        user_id:id,
        page:page
      }
      getUserDepthList(data).then( res => {
        this.loading = false
        if(this.page == 1){
              this.itemByDate = res.data.list.list.data
          }else{
              this.itemByDate = [...this.itemByDate,...res.data.list.list.data]
          }
          
          this.totalPage = res.data.list.list.totalPage
          if( this.currentPage == this.totalPage){
              this.isEnd = true
          }
      })
    },
    loadContent () {
      this.currentPage++
      this.getList(this.userId,this.currentPage)
    },
    gotoDetails(item){
        this.$router.push({path:'/depthDetails',query:{ id : item.id,userId: item.user_id}})
    }
  }
}
</script>

<style lang="less" scoped>
.isMore{
    width: 880px;
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
        line-height: 36px;
        display: block;
        width: 100%;
    }
}
.block1{
    width: 880px;
    // margin: 0 auto;
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
        width: 650px;
    }
    .contentPic{
        width: 188px;
        height: 120px;
        border-radius: 4px;
    }
    
    
}
.block-head{
    overflow: hidden;
    .time{
        color: #AEAEAE;
        font-size: 16px;
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
        font-size: 16px;
        color: #333333;
        float: left;
        margin-right: 20px;
        line-height: 44px;
    }
}
</style>
