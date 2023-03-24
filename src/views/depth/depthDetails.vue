<template>
<div class="body">
    <article id="depthDetails" class="depthDetails">
        <div class="contentLeft fl">
            <h2 class="title">
                {{contentData.title}}
            </h2>
            <div class="tit_info">
                <img :src="contentData.u_userpic" alt="" class="tit_pic fl">
                <p class="name fl">{{contentData.username}}</p>
                <p class="time fl">{{contentData.create_time}}</p>
                <!-- <p class="time fl">{{contentData.pv}}阅读</p> -->
            </div>
            <div class="content_body" v-html="contentData.content">{{contentData.content}}</div>
            <p class="footer_info clear">Statement: this article is written by the author of AptosEden, it represents only the author's opinion, it does not mean that AptosEden endorses the views or confirms the description.</p>
            <p class="footer_info">Tips: investment is risky, please trade with caution. This information is not intended as investment and financial advice.</p>
        </div>
        <div class="contentRight fr">
            <p v-if="classId == 2">Beginner’s Course</p>
            <p v-if="classId == 3">Advanced Course</p>
            <!-- <div class="line" v-if="depthType == 0">
                <span class="mark" >ta 的文章</span>
            </div> -->
            <p class="list" v-for="item in relatedDepth" :key="item.id" @click="gotoDetails(item)"
                :class="[depthId == item.id ? 'listSelect' : '']">
               {{item.title}}
            </p>
            <!-- <p class="more_depth" v-show="relatedDepth.length > 0"  @click="gotoUser(userId)">更多文章</p> -->
        </div>
        <div class="clear"></div>
    </article>
</div>
</template>
<script> 
import { getDepthDetail, getRightDepth } from "@/api/depth";
import { getUserHomeInfo, getUserightDepth, unfollow, follow } from "@/api/user";
import { Loading } from 'element-ui';
import {getCookie} from "@/utils/cookieUtils";
export default {
    name: "depthDetails",
    data() {
        return {
            html:'',
            contentData:{},
            userInfo:'',
            relatedDepth:[],
            ownType:false,
            follow:0,
            userId:'',
            classId: '',
            depthType: 0,
            depthId:'',
        };
    },
    mounted() {
        // console.log( this.$routes)
        // this.userId = this.$route.query.userId
        this.classId = this.$route.query.classId
        this.depthType = this.$route.query.depthType
        this.depthId = this.$route.query.id
        this.getDetails(this.$route.query.id)
        this.getRightDes()
        // if(this.depthType == 0){
        //     this.getUserightDepth(this.userId)
        // }
        // this.getUserHomeInfo(this.userId)
        // this.ownType = this.userId == this.$store.state.user.userInfo.id
    },
    created() {},
    methods: {
        getDetails(id) {
            let loadingInstance = Loading.service({
                    target: document.querySelector('.contentLeft')
                }
            );
            let data = {
                pid: id,
                // token: getCookie("yueToken")
            }
            getDepthDetail(data).then( res => {
                // console.log(res)
                this.contentData = res.data
                this.$nextTick(() => { 
                    loadingInstance.close();
                });
            }).catch( err => {
                window.scrollTo(0, 0);
                this.$nextTick(() => { 
                });
            })
        },
        getRightDes(){
            let data = {
                class_id : this.classId,
                type : this.depthType
            }
            getRightDepth(data).then( res => {
                // console.log(res)
                this.relatedDepth = res.data
            })
        },
        getUserHomeInfo(id){
            getUserHomeInfo(id).then( res => {
                this.userInfo = res.data
                this.follow = res.data.follow_status
            })
        },
        getUserightDepth(id){
            let data = {
                user_id: id,
                type: 0
            }
            getUserightDepth(data).then( res => {
                this.relatedDepth = res.data
            })
        },
        gotoDetails(item){
            this.$router.push({path:'/depthDetails',query:{ id : item.id,classId: item.class_id, depthType: item.type}})
            this.getDetails(item.id)
            this.depthId = this.$route.query.id
        },
        followUser(id){
            let data = {
                follow_id: id
            }
            follow(data).then( res => {
                if( res ){
                    this.$message.success('Followed')
                    this.getUserHomeInfo(this.userId)
                }
                
            })
        },
        unFollowUser(id){
            let data = {
                follow_id: id
            }
            unfollow(data).then( res => {
                this.$message.success('Unfollowed')
                this.getUserHomeInfo(this.userId)
            })
        },
        gotoUser(id){
            this.$router.push({ path: "/personalCenter",query:{ userId: id} });
        }
    }
};
</script>

<style scoped lang="less">
.body{
    background-color: #FBFBFB ;
    width: 100%;
    padding-bottom: 1px;
}
.depthDetails{
    min-width: 1280px;
}
.contentLeft{
    width: 888px;
    min-height: 200px;
    background-color: #fff;
    margin-top: 40px;
    // margin-bottom: 40px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    padding-bottom: 40px;
    box-shadow: 0 0 6px #cccccc;
    margin-left: 6px;
    .title{
        color: #333333;
        font-size: 18px;
    }
    .tit_info{
        overflow: hidden;
        margin: 20px 0;
    }
    .tit_pic{
        height: 44px;
        width: 44px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .name{
        color: #333333;
        font-size: 14px;
        margin-right: 12px;
        line-height: 44px;
    }
    .time{
        color: #AEAEAE;
        font-size: 14px;
        line-height: 44px;
        margin-right: 40px;
    }
    
}
.contentRight{
    width: 360px;
    border-radius: 6px;
    // height: 200px;
    background-color: #fff;
    box-shadow: 0 0 6px #cccccc;
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 30px;
    box-sizing: border-box;
    color: #181818;
    font-size: 16px;
    margin-right: 6px;
    .tit_pic{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin: 0 auto;
        display: block;
        margin: 10px auto 10px auto;
    }
    .name{
        color: #ffffff;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
    }
    .info_num{
        text-align: center;
        margin-top: 6px;
        color: #AEAEAE;
        font-size: 14px;
    }
    .follow_btn{
        background-color: #333333;
        cursor: pointer;
        width: 100px;
        height: 30px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        line-height: 30px;
        margin: 20px auto;
        margin-bottom: 10px;
    }
    .unfollow_btn{
        background-color: #D0D0D0;
        cursor: pointer;
        width: 100px;
        height: 30px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        line-height: 30px;
        margin: 20px auto;
        margin-bottom: 10px;
    }
    .line{
        width: 100%;
        border-bottom: 1px solid #fff;
        .mark{
            width: 76px;
            margin: 0 auto;
            display: block;
            text-align: center;
            line-height: 20px;
            position: relative;
            top:10px;
            font-size: 14px;
            color: #fff;
            background-color: #1b2447;
        }
    }
    .list{
        margin-top: 10px;
        cursor: pointer;
        color: #999999;
        font-size: 14px;
        text-indent: 20px;
        grid-column-end: 40px;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover{
            background: #070707;
            border-radius: 4px;
            color: #fff;
        }
    }
    .listSelect{
        background: #070707;
            border-radius: 4px;
            color: #fff;
    }
    .more_depth{
        width: 100%;
        height: 36px;
        line-height: 36px;
        background-color: #F3F3F3;
        text-align: center;
        border-radius: 4px;
        margin-top: 20px;
        cursor: pointer;
    }
}
.content_body{
    margin-bottom: 40px;
    overflow: hidden;
}
.footer_info{
    color: #AEAEAE;
    font-size: 12px;
}
</style>
<style lang="less" scoped>
.content_body{
    margin-bottom: 40px;
    overflow: hidden;
    /deep/p{
        margin-bottom: 15px;
        // line-height: 28px;
        color: #333333;
        // font-size: 16px;
        word-wrap:break-word;
    }
    /deep/img{
        width: 100%;
        height: auto;
    }
    /deep/table th, table td , table tr{
        border: 1px solid #000000;
    }
    /deep/.Bash{
        background: #cccccc;
        display: block;
    }
}
</style>
