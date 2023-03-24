<template>
    <article class="new_article">
      <div class="new_container"  v-loading="loadingFirst">
          <div class="article">
            <div class="block">
                <div
                  v-for=" (item , index ) in itemByDateTop"
                  :key="item.id"
                >
                <div class="items">
                    <div class="block-left">
                        <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title_en}}</h2>
                        <p class="blogtext" v-html="item.code_snippet">{{item.code_snippet}}</p>
                    </div>
                </div>
                </div>
                <div
                  v-for=" (item , index ) in itemByDate"
                  :key="item.id"
                >
                <div class="items unTop">
                    <div class="block-left">
                        <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title_en}}</h2>
                        <div class="item_info_box">
                            <img :src="item.userpic" alt="">
                            <span>{{ item.username ? item.username : '' | nameFilter}}</span>
                            <span class="address">{{ item.address | nameFilter}}</span>
                        </div>
                        <p class="blogtext">Participant: {{item.kb_count}}</p>
                    </div>
                    <div class="listIcon fr">
                        <img src="../../../static/images/medium/next.png" alt="">
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="isMore">
              <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">To load more …</div>
              <div class="loadContent" v-if="!isEnd&&loading">Load...</div>
              <span v-if="isEnd" class="isLoadEnd">End~</span>
          </div>
      </div>
      <div class="body_right">
        <div class="personal" v-if="isLogin">
            <div  @click="gotoUser(1)" class="head_info">
                <img :src="userInfo.userpic" alt="" class="headPic">
                <p class="name">{{userInfo.username ? userInfo.username : ''| nameFilter}}</p>
            </div>
            <p class="line"></p>
            <div class="info_box">
                <div class="item">
                    <p>{{userInfo.kb}}</p>
                    <p>Question</p>
                </div>
                <div class="item">
                    <p>{{userInfo.ka}}</p>
                    <p>Answer</p>
                </div>
                <!-- <div class="item">
                    <p>82</p>
                    <p>评论数</p>
                </div> -->
            </div>
            <div class="enter_btn" @click="dialogVisible = true">
                Question
            </div>
        </div>
        <div class="link_list">
            <p class="link_tit">
                <img src="../../../static/images/medium/tit3.png" alt="">
                <span>Aptos Document</span>
            </p>
            <div v-for="item in linkList" :key="item" >
                <a v-if="item.na_id == 7" class="link_item" :href="item.url" target="_blank"> 
                    {{item.title}}
                </a>
            </div>
            <!-- biaoti  -->
            <p class="link_tit">
                <img src="../../../static/images/medium/tit2.png" alt="">
                <span>Developer Tools</span>
            </p>
            <div v-for="item in linkList" :key="item" >
                <a v-if="item.na_id == 8" class="link_item" :href="item.url" target="_blank"> 
                    {{item.title}}
                </a>
            </div>
        </div>
        <div class="link_list">
            <p class="link_tit">
                <img src="../../../static/images/medium/tit1.png" alt="">
                <span>Move Community</span>
            </p>
            <div v-for="item in linkList" :key="item" >
                <a v-if="item.na_id == 9" class="link_item" :href="item.url" target="_blank"> 
                    {{item.title}}
                </a>
            </div>
        </div>
      </div>
      
      <!-- 弹窗 -->
      <el-dialog
        title="Ask Questions"
        :visible.sync="dialogVisible"
        custom-class="questionDialog"
        width="60%"
        >
        <el-input v-model="title" autofocus="true" placeholder="Please enter a title"  class="qContent"></el-input>
        <el-input
        type="textarea"
        :rows="8"
        resize="none"
        placeholder="Please enter a problem description"
        v-model="content" class="qContent1">
        </el-input>
        <el-input
        type="textarea"
        :rows="8"
        resize="none"
        placeholder="Please enter the code required for the question"
        v-model="code_snippet" class="qContent1">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
            <!-- <el-button type="primary">确 定</el-button> -->
            <div class="primary_btn" @click="createQuestion">Submit </div>
            <div class="primary_btn" @click="dialogVisible = false">Cancel </div>
        </span>
      </el-dialog>
      <div style="height:80px;width: 1px;"></div>
    </article>
  </template>
  
  <script>
  import { getDepthList } from '@/api/depth'
  import { getMediumList, createQuestion, getUserInfo, getMediumTopList, getLinksList} from '@/api/medium'
  export default {
    filters: {
        nameFilter(name) {
            if(name.length > 10){
                let a = name.slice(0,3)
                let b = name.slice(7,10)
                return a+'****'+b;
            }else{
                return name;
            }
            
        }
    },
    data () {
      return {
        itemByDate: [],
        itemByDateTop: [],
        linkList:[],
        select_type: 0,
        count: 0,
        currentPage: 1,
        pageSize: 10,
        totalPage:2,
        userInfo:{},
        isEnd:false,//是否到底
        loading:false,//加载中
        loadingFirst: false,
        class_id: 1,
        sort: 1,
        dialogVisible:false,
        title:'',
        content:'',
        code_snippet:'',
        isLogin: this.$store.state.user.isLogin,
        // type: 
      }
    },
    components: {
      // 注册组件
    },
    mounted () { 
      // this.connectWallet()
      this.getMediumList(1)
      if(this.isLogin){
         this.getUserInfo()
      }
      this.getLinksList()
      
      this.getMediumTopList()
    },
    created () {
    //   this.getList(this.currentPage)
        // console.log(this.isLogin)
    },
    methods: {
      async connectWallet(){
          const response = await window.aptos.connect()
        //   console.log("connectWallet===",response.address)
      },
      getMediumTopList(){
        getMediumTopList().then( res => {
            this.itemByDateTop = res.data
        })
      },
      getLinksList(){
        getLinksList().then( res => {
            this.linkList = res.data
        })
      },
      getMediumList(page){
        let data = {
          page : page,
          pageSize :  10,
        }
        getMediumList(data).then( res => {
            // this.itemByDate = res.data.data
            if(page == 1){
                  this.itemByDate = res.data.data
              }else{
                  this.itemByDate = [...this.itemByDate,...res.data.data]
              }
              
              this.totalPage = res.data.totalPage
              if( this.currentPage == this.totalPage){
                  this.isEnd = true
              }
            // console.log( this.itemByDate )

        })
      },
      getUserInfo(){
        getUserInfo().then( res => {
            this.userInfo = res.data
        })
      },
      createQuestion(){
        let data = {
            title: this.title,
            content: this.content,
            code_snippet: this.code_snippet
        }
        if( this.title.length == 0 || this.content.length == 0 ){
            this.$message.error('The input content cannot be empty')
            return
        }
        createQuestion(data).then( res => {
            // console.log( res)
            this.$message.success('success')
            this.dialogVisible = false
        })
      },
      getList (page) {
        let data = {
          page : page,
          type : this.select_type,
          class_id : this.class_id,
          sort: 0,
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
        this.getMediumList(this.currentPage)
      },
      gotoDetails(item){
          this.$router.push({path:'/moveBaseDetails',query:{ id : item.kb_id }})
      },
      gotoUser(id){
          this.$router.push({ path: "/personalCenter",query:{ } });
      }
      ,
      changeSelect( num ){
          if( this.select_type != num ){
              this.itemByDate = []
              this.select_type = num
              this.currentPage = 1
              this.totalPage = 2
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
    }
  }
  </script>
  
  <style lang="less" scoped>
  .new_article{
    display: flex;
    justify-content: space-between;
    // flex-wrap: wrap;
  }
  .body_right{
    // position: fixed;
    // margin-left: 840px;
    margin-top: 30px;
    float: right;
    // margin-top: 40px;
    .link_list{
        width: 260px;
        background: #1C1D20;
        border-radius: 10px;
        padding: 20px;
        box-sizing: border-box;
        margin-bottom: 20px;
        .link_tit{
            img{
                width: 18px;
                height: auto;
                display: inline-block;
                margin-right: 10px;
                position: relative;
                top: 3px;
            }
            span{
                color: #FFFFFF;
                font-size: 16px;
                line-height: 40px;
            }
        }
        .link_item{
            font-size: 14px;
            text-indent: 30px;
            // margin-left: 30px;
            display: inline-block;
            margin-bottom: 15px;
            width: 100%;
            &:hover{
                color: #1DE4B3;
            }
        }
    }
  }
  .personal{
    height: 235px;
    width: 260px;
    background: #1C1D20;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    // display: flex;
    // top: 150px;
    // right: 40px;
    // justify-content: center;
    .head_info{
        cursor: pointer;
    }
    .headPic{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        // margin-left: 80px;
        float: left;
        margin-right: 20px;
    }
    .name{
        // text-align: center;
        // margin-left: 10px;
        // float: left;
        // clear: left;
        color: #fff;
        font-size: 22px;
        line-height: 40px;
        // margin-top: 20px;
    }
    .line{
        border-bottom: 1px solid #2F323B;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .info_box{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .item{
            width: 48%;
            p:first-child{
                font-size: 16px;
                text-align: center;
                color: #1DE4B3;
                margin-bottom: 6px;
            }
            p:last-child{
                color: #FFFFFF;
                font-size: 14px;
                text-align: center;
            }
        }
    }
    .enter_btn{
        cursor: pointer;
        width: 100%;
        height: 50px;
        border-radius: 10px;
        text-align: center;
        line-height: 50px;
        background: #151616;
        color: #1DE4B3;
    }
  }
  .new_article{
    position: relative;
    overflow: visible;
    width: 1100px;
  }
  .block_box{
    width: 760px;
    margin: 0 auto;
    margin-top: 100px;
    // margin-bottom: 30px;
  }
  .isMore{
      width: 760px;
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
  .article{
    background: #1C1D20;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 30px;
    margin-top: 30px;
  }
  .block{
      width: 760px;
      margin: 0 auto;
      min-height: 400px;
      .items{
          // border-bottom: 1px solid #E7E7E7;
          margin-top: 20px;
          background: #030303;
          // border-radius: 4px;
          // padding: 20px;
          overflow: hidden;
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
      }
      .unTop{
        background: #232529;
        overflow: hidden;
        padding-right: 20px;
        .listIcon{
            height: 100%;
            display: flex;
            justify-content: center;
            img{
                width: 16px;
                height: auto;
            }
        }
      }
      .itemTitle{
          font-size: 18px;
          color: #fff;
          line-height: 40px;
          cursor: pointer;
      }
      .blogtext{
          color: #666666;
          font-size: 14px;
          line-height: 20px;
          word-wrap:break-word;
      }
      .block-left{
          width: 700px;
          padding: 20px;
          box-sizing: border-box;
          border-radius: 10px;
      }
      .contentPic{
          width: 210px;
          height: 124px;
          border-radius: 4px;
      }
      .item_info_box{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img{
            width: 26px;
            height: 26px;
            border-radius: 50%;
            margin-right: 10px;
        }
        span{
            color: #fff;
            font-size: 12px;
            margin-right: 10px;
        }
        .address{
            line-height: 24px;
            border-radius: 12px;
            padding: 0 10px;
            background: #373B43;
        }
      }
      
  }
  .qContent{
    margin-bottom: 20px;
  }
  .qContent1{
    margin-bottom: 4px;
  }
  .primary_btn{
    float: right;
    width: 120px;
    height: 40px;
    margin-left: 30px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #222222;
    border-radius: 8px;
    background: #1DE4B3;
    cursor: pointer;
  } 
  /deep/.dialog-footer,/deep/.el-dialog__footer{
    overflow: hidden;
  }
/deep/.questionDialog{
    background: #1C1D20;
    background-color: #1C1D20;
    .el-dialog__title{
        color: #fff;
    }
    .el-dialog__close{
        color: #fff;
    }
    .el-textarea__inner,.el-input__inner{
        background-color: #232529;
        border: none;
        color: #FFFFFF;
    }
}
  </style>
  