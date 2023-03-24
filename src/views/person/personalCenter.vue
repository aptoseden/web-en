<template>
    <article class="new_article">
        <div class="content_head">
            <img :src="userInfo.userpic" alt="" class="fl">
            <div class="info fl">
                <div class="info_top">
                    <span class="name">{{userInfo.username | nameFilter}}</span>
                    <span class="name_btn" @click="dialogVisible = true">Edit Name</span>
                </div>
                <div class="info_bo">
                    <span>My Question: <i>{{userInfo.kb}}</i></span>
                    <span>My Answer: <i>{{userInfo.ka}}</i></span>
                </div>
            </div>
        </div>
        <div class="top_head new_head">
            <div class="reac_type">
                <ul class="new_ul">
                    <li :class="[select_type == '0' ? 'activeType' : '']" @click="changeSelect(0)">
                        My Question
                        <span class="race_line"></span>
                    </li>
                    <li :class="[select_type == '1' ? 'activeType' : '']" @click="changeSelect(1)">
                        My Answer
                        <span class="race_line"></span>
                    </li>
                </ul>
                <div class="watch_list">
                   Total: <span class="col_g">11</span>
                </div>
            </div>
        </div>
        <div class="new_container"  v-loading="loadingFirst">
          <div class="article">
            <div class="block" v-show="select_type == 0">
                <div
                  v-for=" (item , index ) in itemByDate"
                  :key="item.id"
                >
                <div class="items unTop">
                    <div class="block-left">
                        <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title_en}}</h2>
                        <p class="blogtext">Participant: {{item.ka_count}}</p>
                    </div>
                    <div class="listIcon fr">
                        <img src="../../../static/images/medium/next.png" alt="">
                    </div>
                </div>
              </div>
            </div>
            <div class="block" v-show="select_type == 1">
                <div
                  v-for=" (item , index ) in itemByDate2"
                  :key="item.id"
                >
                <div class="items unTop">
                    <div class="block-left">
                        <h2 class="itemTitle" @click="gotoDetails(item)">{{item.title_en}}</h2>
                        <p class="blogtext">Participant: {{item.ka_count}}</p>
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
      <!-- 弹窗 -->
      <el-dialog
        :visible.sync="dialogVisible"
        custom-class="nameDialog"
        width="400px"
        >
        <el-input v-model="newName" placeholder="Please enter a name"  class="qContent"></el-input>
        <span slot="footer" class="dialog-footer">
            <div class="primary_btn" @click="editName">Submit</div>
        </span>
      </el-dialog>
    </article>
  </template>
  
  <script>
  import { getUserInfo, getSelfKnowList, getSelfAnswerList, editUserInfo } from '@/api/medium'
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
        select_type: 0,
        isEnd:false,//是否到底
        loading:false,//加载中
        loadingFirst: false,
        dialogVisible: false,
        currentPage: 1,
        pageSize: 10,
        totalPage:2,
        itemByDate:[],
        itemByDate2:[],
        class_id: 1,
        userInfo: {},
        newName: '',
        sort: 1,
      }
    },
    components: {
      // 注册组件
    },
    mounted () { 
        this.getUserInfo()
        this.getQuestionList()
    },
    created () {
    },
    methods: {
        changeSelect( num ){
            if( this.select_type != num ){
                this.select_type = num
                this.currentPage = 1
                this.isEnd = false
                if( num == 0){
                    this.getQuestionList(1)
                }
                if( num == 1){
                    this.getAnswerList(1)
                }
                if( num == 2){
                }
            }
        },
        getUserInfo(){
            getUserInfo().then( res => {
                this.userInfo = res.data
            })
        },
        getQuestionList(page){
            let data = {
                page : page,
                pageSize :  10,
            }
            getSelfKnowList(data).then(res => {
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
            })
        },
        getAnswerList(page){
            let data = {
                page : page,
                pageSize :  2,
            }
            getSelfAnswerList(data).then(res => {
                if(page == 1){
                    this.itemByDate2 = res.data.data
                }else{
                    this.itemByDate2 = [...this.itemByDate2,...res.data.data]
                }
                
                this.totalPage = res.data.totalPage
                if( this.currentPage == this.totalPage){
                    this.isEnd = true
                }
            })
        },
        gotoDetails(item){
          this.$router.push({path:'/moveBaseDetails',query:{ id : item.id }})
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
        editName(){
            let data = {
                name: this.newName
            }
            editUserInfo(data).then( res => {
                this.$message.success('success')
                this.getUserInfo()
                this.dialogVisible = false
            })
        },
        loadContent () {
            this.currentPage++
            if( this.select_type == 0){
                this.getQuestionList(this.currentPage)
            }
            if( this.select_type == 1){
                this.getAnswerList(this.currentPage)
            }
        },
    }
  }
  </script>
  
  <style lang="less" scoped>
.new_article{
    width: 1000px;
    margin-top: 100px;
    background: #1C1D20;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 30px;

}

.content_head{
    width: 100%;
    overflow: hidden;
    background: #232529;
    border-radius: 10px;
    padding: 30px;
    box-sizing: border-box;
    img{
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .info{
        margin-top: 40px;
        margin-left: 20px;
        .name{
            color: #FFFFFF;
            font-size: 20px;
            margin-right: 20px;
        }
        .name_btn{
            color: #1DE4B3;
            font-size: 12px;
            cursor: pointer;
        }
        .info_top{
            margin-bottom: 10px;
        }
        .info_bo{
            span{
                color: #6E767E;
                font-size: 14px;
                margin-right: 20px;
                i{
                    font-style: normal;
                    color: #FFFFFF;
                    margin-left: 10px;
                }
            }
        }
    }
}
.top_head{
    position: static;
    padding: 0;
    .reac_type{
        width: 100%;
        padding: 0;
    }
}
.new_head{
    height: 50px;
    background: #1C1D20;
    .reac_type{
        background: #1C1D20;
    }
    .race_line{
        height: 2px !important;
        background: #1DE4B3 !important;
    }
}
.col_g{
    color: #1DE4B3;
}
.isMore{
    width: 100%;
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
.block{
    width: 100%;
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
}
  .qContent1{
    margin-bottom: 4px;
  }
  .primary_btn{
    float: right;
    width: 120px;
    height: 40px;
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
/deep/.nameDialog{
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
  