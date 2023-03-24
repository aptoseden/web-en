<template>
  <article class="new_article">
    <!-- <div class="move_box">
      <img src="../../../static/images/move/medium.png" alt="" class="move2" @click="loadingFun">
      <img src="../../../static/images/move/high.png" alt="" class="move2" @click="loadingFun">
    </div> -->
    <div class="container"  v-loading="loadingFirst">
        <div class="article">
          <!-- <div class="block_box">
            <img src="../../../static/images/move/new.png" alt="" class="move1" v-show="class_id == 2">
            <img src="../../../static/images/move/unnew.png" alt="" class="move1" @click="changeFaSelect(2)" v-show="class_id != 2">
            <img src="../../../static/images/move/medium.png" alt="" class="move1" v-show="class_id == 3">
            <img src="../../../static/images/move/unmid.png" alt="" class="move1" @click="changeFaSelect(3)" v-show="class_id != 3">
            <img src="../../../static/images/move/unhigh.png" alt="" class="move1" @click="loadingFun">
          </div> -->
          <div class="top_head">
            <div class="reac_type new_head">
                <ul class="new_ul">
                    <li :class="[class_id == '2' ? 'activeType' : '']" @click="changeFaSelect(2)">
                      Beginner’s Course
                        <span class="race_line"></span>
                    </li>
                    <!-- <li :class="[class_id == '3' ? 'activeType' : '']" @click="loadingFun"> -->
                    <li :class="[class_id == '3' ? 'activeType' : '']" @click="changeFaSelect(3)">

                      Advanced Course
                        <span class="race_line"></span>
                    </li>
                    <li :class="[class_id == '4' ? 'activeType' : '']" @click="loadingFun">
                      Practice Course
                        <span class="race_line"></span>
                    </li>
                </ul>
            </div>
          </div>
          <!-- <div class="top_head">
            <div class="reac_type">
                <ul class="new_ul">
                    <li :class="[select_type == '0' ? 'activeType' : '']" @click="changeSelect(0)">
                      Document tutorial
                        <span class="race_line"></span>
                    </li>
                    <li :class="[select_type == '1' ? 'activeType' : '']" @click="changeSelect(1)">
                      Video tutorial
                        <span class="race_line"></span>
                    </li>
                </ul>
            </div>
          </div> -->
          <div class="block"  v-if="select_type == '0'">
              <div
                v-for="item in itemByDate"
                :key="item.id"
                class="items"
              >
              <el-image :src="item.titlepic" lazy class="contentPic fl"></el-image>
              <div class="block-left fl">
                <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title}}</h2>
                <p class="blogtext" v-html="item.remark">{{item.remark}}</p>
                <div class="block-head">
                      <img :src="item.u_userpic" alt="" class="headPic">
                      <p class="name">{{item.username}}</p>
                      <p class="time">{{item.create_time}}</p>
                </div>
              </div>
              <div class="btn_wen fr"  @click="gotoDetails(item)">Start Reading</div>
                <!-- <img :src="item.titlepic" alt="" class="contentPic fr"> -->
            </div>
          </div>
          <!-- 视频 -->
          <div class="block_video" v-if="select_type == '1'">
              <div
                v-for="item in itemByDate"
                :key="item.id"
                class="items"
              >
                <el-image :src="item.titlepic" lazy class="contentPic"  @click="gotoDetails(item)"></el-image>
                <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title}}</h2>
                <div class="block-head">
                    <img :src="item.u_userpic" alt="" class="headPic">
                    <p class="name">{{item.username}}</p>
                    <p class="time fr">{{item.create_time}}</p>
                </div>
              
              </div>
              <!-- 假数据 -->
              <!-- <div class="items">
               <el-image src="../../../static/images/move/vidoe.png" lazy class="contentPic"  @click="loadingFun"></el-image>
                <h2 class="itemTitle" @click="loadingFun">[预]初级教程-小试牛刀</h2>
                <div class="block-head">
                    <img src="../../../static/images/move/head.jpeg" alt="" class="headPic">
                    <p class="name">Aptos Eden</p>
                    <p class="time fr">{{item.create_time}}</p>
                </div>
              </div> -->
             
              
              <!-- 展位 -->
              <div class="items vis"></div>
              <div class="items vis"></div>
              <div class="items vis"></div>
          </div>
        </div>
        <div class="isMore">
            <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">To load more …</div>
            <div class="loadContent" v-if="!isEnd&&loading">Loading...</div>
            <span v-if="isEnd" class="isLoadEnd">End~</span>
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
      select_type: 1,
      // sort: 0,
      count: 0,
      currentPage: 1,
      pageSize: 12,
      totalPage:2,
      isEnd:false,//是否到底
      loading:false,//加载中
      loadingFirst: false,
      class_id: 2,
      sort: 1,
      // type: 
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
        type : this.select_type,
        class_id : this.class_id,
        sort: this.sort,
        pageSize: this.pageSize
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
    loadingFun(){
      this.$message.success('Coming soon!');
    },
    loadContent () {
      this.currentPage++
      this.getList(this.currentPage)
    },
    gotoDetails(item){
        this.$router.push({path:'/depthDetails',query:{id : item.id,classId: item.class_id, depthType: item.type}})
    },
    gotoUser(id){
        this.$router.push({ path: "/personalCenter",query:{ userId: id} });
    }
    ,
    changeSelect( num ){
        if( this.select_type != num ){
            this.itemByDate = []
            this.select_type = num
            this.currentPage = 1
            this.totalPage = 2
            this.isEnd = false
            this.getList(1)
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
    changeFaSelect(num){
      if( this.class_id != num ){
            this.itemByDate = []
            this.class_id = num
            // this.select_type = 0
            this.currentPage = 1
            this.totalPage = 2
            this.isEnd = false
            this.getList(1)
            
        }
    }
  }
}
</script>

<style lang="less" scoped>
.new_article{
  .top_head{
    // background-color: #ffffff;
    position: relative;
    width: 1200px;
    margin: 0 auto;
    top: 0;
    padding: 0;
    height: 50px;
    .reac_type{
      // background-color: #ffffff;
      width: 100%;
      padding: 0;
      li{
        margin: 0;
        margin-right: 30px;
        font-size: 14px;
      }
    }
    .new_head{
      li{
        font-size: 18px;
      }
    }
  }
}

.new_article{
  position: relative;
  overflow: visible;
  min-width: 1400px;
}
.block_box{
  width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
  overflow: hidden;
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
  cursor: pointer;
  margin-right: 50px;
  float: left;
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
        background-color: #030303;
        font-size: 14px;
        color: #1DE7B5;
        text-align: center;
        line-height: 36px;
    }
    .isLoadEnd{
        font-size: 14px;
        color: #999;
        text-align: center;
        line-height: 36px;
        display: block;
        width: 100%;
    }
}
.block_video{
    width: 1200px;
    margin: 0 auto;
    min-height: 400px;
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content:space-between;
    box-sizing: border-box;
    .items{
        width: 24%;
        border-radius: 8px;
        background: #030303;
        overflow: hidden;
        margin-bottom: 20px;
        height: 296px;
        .contentPic{
          width: 100%;
          // height: 160px;
          cursor: pointer;
        }
        .itemTitle{
          color: #fff;
          font-size: 14px;
          // line-height: 40px;
          margin: 10px 0;
          padding: 0 10px;
          box-sizing: border-box;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;				//溢出内容隐藏
          text-overflow: ellipsis;		//文本溢出部分用省略号表示
          display: -webkit-box;			//特别显示模式
          -webkit-line-clamp: 2;			//行数
          line-clamp: 2;					
          -webkit-box-orient: vertical;
        }
        .block-head{
          padding: 0 10px;
          margin-bottom: 10px;
          margin-top: 0px;
          .time{
            float: right;
          }
        }
    }
}
.block{
    width: 1200px;
    margin: 0 auto;
    min-height: 400px;
    .items{
        // border-bottom: 1px solid #E7E7E7;
        margin-top: 20px;
        background: #151515;
        // border-radius: 4px;
        // padding: 20px;
        overflow: hidden;
        margin-bottom: 40px;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
    }
    .itemTitle{
        font-size: 18px;
        color: #fff;
        line-height: 40px;
        cursor: pointer;
    }
    .blogtext{
        color: #AEAEAE;
        font-size: 14px;
        line-height: 20px;
        word-wrap:break-word;
    }
    .btn_wen{
      cursor: pointer;
      width: 160px;
      height: 48px;
      background: #fff;
      color: #181818;
      line-height: 48px;
      font-size: 14px;
      text-align: center;
      // margin-top: 10px;
      border-radius: 10px;
      align-self:center;
    }
    .block-left{
        width: 700px;
        // margin-top: 20px;
        margin-left: 30px;
        margin-right: 30px;
    }
    .contentPic{
        width: 210px;
        height: 124px;
        border-radius: 4px;
    }
    
    
}
.block-head{
    overflow: hidden;
    margin-top: 20px;
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
.vis{
  background: #030303 !important;
  height: 10px !important;
}
</style>
