<template>
    <article>
        <div class="top_head">
            <div class="reac_type">
                <ul class="new_ul">
                    <li :class="[select_type == '0' ? 'activeType' : '']" @click="changeSelect(0)">
                        Twitter News
                        <span class="race_line"></span>
                    </li>
                    <li :class="[select_type == '1' ? 'activeType' : '']" @click="changeSelect(1)">
                        Medium News
                        <span class="race_line"></span>
                    </li>
                    <li :class="[select_type == '2' ? 'activeType' : '']" @click="changeSelect(2)">
                        Forum News
                        <span class="race_line"></span>
                    </li>
                    <!-- <li :class="[select_type == '3' ? 'activeType' : '']" @click="changeSelect(3)">
                        交易所公告
                        <span class="race_line"></span>
                    </li> -->
                </ul>
                <!-- <p class="search_type">
                    <el-input class="search_input" prefix-icon="el-icon-search" v-model="input" placeholder="请输入"></el-input>
                </p> -->
                <div @click="drawer = true" class="watch_list">
                    <span class="col_point"></span> WatchList</div>
            </div>
        </div>
        <div class="proposal_center">
            <div class="proposal_left"  
                v-loading="vLoading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <img src="../../../static/images/enpty.png" alt="" v-if="dataList.length == 0" class="unfollow">
                <p v-if="dataList.length == 0" class="unfollow1">You haven’t added any projects yet, please add some to your watchlist</p>
                <div class="center_list" v-for="(item,index) in dataList" :key="item">
                    <div class="content_box">
                        <div class="content_title">
                            <div class="title_info">
                                <div class="logo_img">
                                    <img :src="item.logo" alt="">
                                </div>
                                <div class="title_msg">
                                    <p> {{item.ctitle}}</p>
                                    <p>
                                        <span class="twitter_role" v-if="select_type == 0">
                                            <font>Twitter</font>
                                             @{{item.projectName}}
                                        </span>
                                        <span class="time"  v-if="select_type == 0"> Time: {{item.time}}</span> 
                                        <span class="time"  v-if="select_type != 0"> Time: {{item.create_time}}</span> 
                                        <!-- <span class="trans_remark"> 翻译由DEEPL提供 </span> -->
                                    </p>
                                </div>
                            </div>
                            <div class="like_box">
                                <span class="icon_btn"  v-if="select_type == 1" @click='openDes(item)'>
                                    <el-tooltip class="item" effect="dark" content="Detail" placement="top-start">
                                        <span>D</span>
                                    </el-tooltip>
                                </span>
                                <span class="icon_btn"  v-if="select_type == 2" @click='openDes2(item)'>
                                    <el-tooltip class="item" effect="dark" content="Detail" placement="top-start">
                                        <span>D</span>
                                    </el-tooltip>
                                </span>
                                <span class="icon_btn" v-if="select_type != 0" @click="gotoInfo(item)">
                                    <el-tooltip class="item" effect="dark" content="Source" placement="top-start">
                                        <!-- <span class="el-icon-link"></span> -->
                                        <span>S</span>
                                    </el-tooltip>
                                </span>
                            </div>
                        </div>
                        <div class="content_inner" v-if="select_type == 0">
                            <div class="inner_text" v-if="!item.type">
                                {{item.content_en}}
                            </div>
                            <div class="inner_text" v-if="item.type">
                                {{item.content_en}}
                            </div>
                            <div class="img_inner" v-if="item.imgs">
                                <p v-for="imgItem in item.imgs" :key="imgItem">
                                    <img :src="imgItem.img_url" alt="">
                                </p>
                            </div>
                        </div>
                        <div class="content_inner" v-if="select_type != 0">
                            <div class="inner_text">
                                {{item.title_cn}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isMore">
                    <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">To load more …</div>
                    <div class="loadContent" v-if="!isEnd&&loading">Loading...</div>
                    <span v-if="isEnd" class="isLoadEnd">End~</span>
                </div>
            </div>
        </div>
        <el-dialog
        title="Detail"
        :visible.sync="centerDialogVisible"
        width="80%"
        center>
            <div class="des_content">
                    <div class="content_body" v-html="contentData">{{contentData}}</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" plain @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="success"  @click="centerDialogVisible = false">Submit</el-button>
            </span>
        </el-dialog>
        <el-drawer
            title=""
            :visible.sync="drawer"
            :with-header="false"
            :custom-class="pro_drawer"
            :size="390">
            <div class="pro_right">
                <div  class="clearfix">
                    <span style="color:#fff">Watchlist</span>
                    <router-link to="/myFollow">
                        <span style="float: right; margin-right: 20px; color: #37A9A5; font-size: 28px;">+</span>
                    </router-link>
                </div>
                <div class="list_box">
                    <div  v-if="followCoinList.length == 0" class="box_empty">You have reached the bottom, please add more projects</div>
                    <div v-for="item in followCoinList" :key="item" class="item">
                        <div class="name_box">
                            <img :src="item.logo" alt="">
                            {{item.title}}
                            <!-- <span>{{item.symbol}}</span> -->
                        </div>
                        <div class="remove_btn" @click="unFollow(item)">
                            Remove
                        </div>
                    </div> 
                </div>
            </div>
            </el-drawer>
    </article>
</template>
<script>
import {getFollowList, toUnFollow } from '@/api/follow'
import {twitterList, forumList, mediumList, getMediumDetail, getForumDetail } from '@/api/express'
export default {
  name: 'myFollow',
  components: {
    // 注册组件
  },
  data () {
    return {
      select_type: 0,
      input:'',
      followCoinList: [],
      dataList: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      totalPage:2,
      isEnd:true,//是否到底
      loading:false,//加载中,
      isLogin: this.$store.state.user.isLogin,
      vLoading: false,
      coin_id: '',
      centerDialogVisible: false,
      contentData: '',
      drawer: false
    }
  },
  mounted () {
    if(this.isLogin){
        this.getList()
        this.getTwitterList(1)
    }
  },
  created () {
    
  },
  watch: {
        "$store.state.user.isLogin": function(newFlag, oldFlag) {
            this.isLogin = newFlag;
            if(this.isLogin == true){
                this.getList()
                this.getTwitterList(1)
            }
        }
    },
  methods: {
    changeSelect( num ){
        if( this.select_type != num ){
            this.select_type = num
            this.currentPage = 1
            this.totalPage = 2
            if(this.isLogin == false){
                return
            }
            // this.isEnd = false
            if( num == 0){
                this.getTwitterList(1)
            }
            if( num == 1){
                this.getMediumList(1)
            }
            if( num == 2){
                this.getForumList(1)
            }
        }
    },
    clear(){
        this.coin_id = ''
        this.checkCoin('')
    },
    openDes(item){
        this.centerDialogVisible = true
        let data = {
            pid : item.pmid
        }
        getMediumDetail(data).then( res => {
            console.log(res)
            this.contentData = res.data.content_cn
        })
    },
    openDes2(item){
        this.centerDialogVisible = true
        let data = {
            pfid : item.pfid
        }
        getForumDetail(data).then( res => {
            console.log(res)
            this.contentData = res.data.content_cn
        })
    },
    checkCoin(id){
        this.coin_id = id
        this.currentPage = 1
        this.totalPage = 2
        if( this.select_type == 0){
            this.getTwitterList(1)
        }
        if( this.select_type == 1){
            this.getMediumList(1)
        }
        if( this.select_type == 2){
            this.getForumList(1)
        }
    },
    //去详情页
    gotoInfo(row){
        if(row.url){
            window.open(row.url,'_blank');
        }
    },
    getList(){
        getFollowList().then( res => {
            this.followCoinList = res.data
        })
    },
    getTwitterList(page){
        let data = {
            coin_id : this.coin_id ? this.coin_id : '',
            page: page
        }
        this.vLoading = true
        twitterList(data).then( res => {
            this.loading = false
            if(page == 1){
                this.dataList = res.data.list.data
            }else{
                this.dataList = [...this.dataList,...res.data.list.data]
            }
            this.vLoading = false
            this.totalPage = res.data.list.totalPage
            if( this.currentPage == this.totalPage){
                this.isEnd = true
            }else{
                this.isEnd = false
            }
        })
    },
    //论坛
    getForumList(page){
        let data = {
            coin_id : this.coin_id ? this.coin_id : '',
            page: page
        }
        this.vLoading = true
        forumList(data).then( res => {
            this.loading = false
            this.vLoading = false
            if(page == 1){
                this.dataList = res.data.list.data
            }else{
                this.dataList = [...this.dataList,...res.data.list.data]
            }
            
            this.totalPage = res.data.list.totalPage
            if( this.currentPage == this.totalPage){
                this.isEnd = true
            }else{
                this.isEnd = false
            }
        })
    }, 
    //medium
    getMediumList(page){
        let data = {
            coin_id : this.coin_id ? this.coin_id : '',
            page: page
        }
        this.vLoading = true
        mediumList(data).then( res => {
            this.loading = false
            this.vLoading = false
            if(page == 1){
                this.dataList = res.data.list.data
            }else{
                this.dataList = [...this.dataList,...res.data.list.data]
            }
            
            this.totalPage = res.data.list.totalPage
            if( this.currentPage == this.totalPage){
                this.isEnd = true
            }else{
                this.isEnd = false
            }
        })
    },
    loadContent(){
        this.currentPage++
        if( this.select_type == 0){
            this.getTwitterList(this.currentPage)
        }
        if( this.select_type == 1){
            this.getMediumList(this.currentPage)
        }
        if( this.select_type == 2){
            this.getForumList(this.currentPage)
        }
    },
    changeLanguage(index,type){
        this.dataList[index]['type'] = type
        this.$forceUpdate();
        this.loading = true
    },
    // 取消关注
    unFollow(item){
        let data = {
            coin_id: item.id
        }
       toUnFollow(data).then( res => {
           this.$message.success('Unfollowed')
           this.getList()
           if( this.select_type == 0){
                this.getTwitterList(this.currentPage)
           }
            if( this.select_type == 1){
                this.getMediumList(this.currentPage)
            }
            if( this.select_type == 2){
                this.getForumList(this.currentPage)
            }
       }) 
    }
  }
}
</script>
<style lang="less" scoped>
.watch_list{
    color: #fff;
    font-size: 14px;
    line-height: 48px;
    cursor: pointer;
    // float: right;
}
.col_point{
    width:2px;
    height: 16px;
    display: inline-block;
    background: #1EE9B7;
    position: relative;
    top:3px;
    margin-right: 3px;
}
.content_body{
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    /deep/article{
        width: 100%;
        margin-top: 0;
    }
    /deep/p{
        margin-bottom: 8px;
        line-height: 20px;
        // color: #333333;
        // font-size: 16px;
        word-wrap:break-word;
    }
    /deep/h1{
        font-size: 24px;
        p{
            line-height: 40px;
        }
    }
    /deep/img{
        width: 100%;
        height: auto;
    }
}
.unfollow{
    width: 230px;
    height: auto;
    margin: 0 auto;
    display: block;
    margin-top: 10%;
    margin-bottom: 10%;
}
.unfollow1{
    color: #fff;
    text-align: center;
}
.img_inner{
    width: 100%;
    // display: flex;
    // justify-content: space-between;
    p{
        width: 40%;
        margin-top: 10px;
        img{
            width: 100%;
            height: auto;
        }
    }
}
.active{
    background: rgb(48, 66, 112) !important;
}
.des_content{
    height: 55vh;
    overflow-y: scroll;
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
.proposal_center{
    margin-top: 94px;
    min-height: 600px;
    height: auto;
    display: flex;
    width: 100%;
    .proposal_left{
        width: 500px;
        flex: 1 1 0%;
    }
    .center_list{
        // display: flex;
        margin-bottom: 4px;
        // background: #1e1e2f;
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
    }
    .content_box{
        // padding-bottom: 30px;
        .content_title{
            display: flex;
            justify-content: space-between;
            .title_info{
                padding-top: 2px;
                .logo_img{
                    margin-bottom: 4px;
                    width: 48px;
                    height: 48px;
                    max-height: 48px;
                    padding: 2px;
                    border-radius: 50%;
                    background: #fff;
                    overflow: hidden;
                    float: left;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .title_msg{
                    float: left;
                    margin-left: 16px;
                    p:first-child{
                        font-size: 14px;
                        color: #fff!important;
                        font-weight: 700;
                        margin-bottom: 8px;
                        text-align: left;
                    }
                    p:last-child{
                        height: 20px;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        font-size: 12px;
                        color: #a2a5b0;
                        text-align: center;
                    }
                    .twitter_role{
                        // background: rgba(167,240,186,.1);
                        color: #a2a5b0;
                        padding: 2px 8px;
                        margin-right: 16px;
                        border-radius: 4px;
                    }
                    .time{
                        color: #AEAEAE;
                        margin-right: 16px;
                    }
                }
                
            }
            .like_box{
                display: flex;
                align-items: center;
                .icon_btn{
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border: 1px solid #a2a5b0;
                    flex: inherit;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 20px;
                    position: relative;
                    font-weight: 500;
                    cursor: pointer;
                    font-size: 14px;
                    color: #a2a5b0;
                }
            }
        }
        .content_inner{
            margin-top: 16px;
            padding: 24px;
            padding-top: 32px;
            background: #151515;
            border-radius: 4px;
            position: relative;
            .inner_text{
                font-size: 14px;
                color: #fff;
                line-height: 22px;
                overflow: hidden;
            }
        }
    }
    
}
/deep/.el-drawer__body{
    background-color:#0C0C0C;
}
</style>
