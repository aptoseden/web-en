<template>
  <article class="new_article">
    <div class="move_box">
      <img src="../../../static/images/move/medium.png" alt="" class="move2">
      <img src="../../../static/images/move/high.png" alt="" class="move2">
    </div>
    <div class="container"  v-loading="loadingFirst">
        <div class="article">
          <div class="block_box">
            <img src="../../../static/images/move/new.png" alt="" class="move1">
          </div>
          <div class="top_head">
            <div class="reac_type">
                <ul>
                    <li :class="[select_type == '0' ? 'activeType' : '']" @click="changeSelect(0)">
                        文档
                        <span class="race_line"></span>
                    </li>
                    <li :class="[select_type == '1' ? 'activeType' : '']" @click="changeSelect(1)">
                        视频
                        <span class="race_line"></span>
                    </li>
                </ul>
            </div>
          </div>
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
                <div class="btn_wen"  @click="gotoDetails(item)">阅读原文</div>
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
      select_type: 0,
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
        type : 0
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
        this.$router.push({path:'/depthDetails',query:{ id : item.id,userId: item.user_id, depthType: 0}})
    },
    gotoUser(id){
        this.$router.push({ path: "/personalCenter",query:{ userId: id} });
    }
    ,
    changeSelect( num ){
        if( this.select_type != num ){
            this.select_type = num
            // this.currentPage = 1
            // this.totalPage = 2
            // if(this.isLogin == false){
            //     return
            // }
            // this.isEnd = false
            // if( num == 0){
            //     this.getTwitterList(1)
            // }
            // if( num == 1){
            //     this.getMediumList(1)
            // }
        }
    },
  }
}
</script>

<style lang="less" scoped>
.new_article{
  .top_head{
    background-color: #ffffff;
    position: relative;
    width: 1000px;
    margin: 0 auto;
    top: 0;
    padding: 0;
    height: 50px;
    .reac_type{
      background-color: #ffffff;
      padding: 0;
      li{
        margin: 0;
        margin-right: 30px;
        font-size: 16px;
      }
    }
  }
}

.new_article{
  position: relative;
  overflow: visible;
  min-width: 1350px;
}
.block_box{
  width: 1000px;
  margin: 0 auto;
  margin-top: 100px;
  // margin-bottom: 30px;
}
.move2{
  width: 137px;
  height: auto;
  margin-bottom: 10px;
  cursor: pointer;
}
.move1{
  width: 137px;
  height: auto;
  margin-bottom: 10px;
}
.move_box{
  position: absolute;
  top: 100px;
  left: 0px;
  z-index: 20000;
}
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
        background: #ffffff;
        // border-radius: 4px;
        // padding: 20px;
        overflow: hidden;
        margin-bottom: 40px;
    }
    .itemTitle{
        font-size: 18px;
        color: #333333;
        line-height: 40px;
        cursor: pointer;
    }
    .blogtext{
        color: #666666;
        font-size: 14px;
        line-height: 20px;
        word-wrap:break-word;
    }
    .btn_wen{
      cursor: pointer;
      width: 90px;
      height: 30px;
      background: #333333;
      color: #ffffff;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
      border-radius: 4px;
    }
    .block-left{
        width: 700px;
        margin-top: 20px;
    }
    .contentPic{
        width: 210px;
        height: 124px;
        border-radius: 4px;
    }
    
    
}
.block-head{
    overflow: hidden;
    .time{
        color: #AEAEAE;
        font-size: 14px;
        float: left;
        line-height: 20px;
    }
    .headPic{
        height: 20px;
        width: 20px;
        border-radius: 50%;
        float: left;
        margin-right: 12px;
        line-height: 20px;
        background-color: #ffffff;
    }
    .name{
        font-size: 14px;
        color: #AEAEAE;
        float: left;
        margin-right: 20px;
        line-height: 20px;
        cursor: pointer;
    }
}
</style>
