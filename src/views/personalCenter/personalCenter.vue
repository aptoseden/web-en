<template>
    <article>
        <div class="content_left fl">
            <img :src="userInfoDes.userinfo.userpic" alt="" class="head_pic">
            <p class="name">{{userInfoDes.userinfo.username}}</p>
            <p class="uid">UID: {{userInfoDes.userinfo.osn}}</p>
            <p class="user_tit" v-if="userInfoDes.topicinfo"><span class="room fl">{{userInfoDes.topicinfo.title}}</span><span class="room_tit fr">会长</span></p>
           <p class="info_num">
                <span>{{userInfoDes.post_count}}文章</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{userInfoDes.fens_count}}粉丝</span>
            </p>
            <div class="follow_btn" v-show="!ownType&&(follow == 0||follow == 3)" @click="followUser(userId)">
                + 关注
            </div>
            <div class="unfollow_btn" v-show="!ownType&&follow == 2" @click="unFollowUser(userId)">
                已关注
            </div>
            <div class="unfollow_btn" v-show="!ownType&&follow == 1" @click="unFollowUser(userId)">
                相互关注
            </div>
            <div style="height:60px"></div>
            <a href="javascript:;" class="btn " :class="btn_select == 1 ? 'btn_select' : ''" @click="changeBtn(1)">文章</a>
            <a href="javascript:;" class="btn" :class="btn_select == 2 ? 'btn_select' : ''" @click="changeBtn(2)">关注</a>
            <a href="javascript:;" class="userInfo" v-if="ownType" @click="gotoUserInfo">编辑个人资料</a>
        </div>
        <div class="content_right fr">
            <Depth v-show="btn_select == 1" :ownType="ownType" :userId="userId"></Depth>
            <Follow v-show="btn_select == 2" :ownType="ownType" :userId="userId"></Follow>
        </div>
        <div class="clear"></div>
    </article>
</template>
<script>
import Depth from './depth'
import Follow from './follow'
import { unfollow, follow } from "@/api/user";
import { getUserHomeInfo } from '@/api/userInfo'
export default {
    name: "about",
    components:{
        Depth,
        Follow
    },
    data() {
        return {
            select: "1",
            btn_select: '1',
            ownType:false,
            userId:'',
            userInfoDes:{},
            follow: 0
        };
    },
    mounted() {
        this.userId = this.$route.query.userId
        this.ownType = (this.userId == this.$store.state.user.userInfo.id)
        this.getUserInfo( this.userId)
    },
    created() {},
    methods: {
        goAnchor(selector) {
            this.select = selector
            var anchor = this.$el.querySelector(selector);
            // document.body.scrollTop = anchor.offsetTop;
            // console.log(anchor.offsetTop)
            window.scrollTo( 0, anchor.offsetTop)
        },
        changeBtn(item){
            this.btn_select = item
        },
        getUserInfo(id){
            getUserHomeInfo(id).then( res => {
                this.userInfoDes = res.data
                this.follow = res.data.follow_status
            })
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
                this.getUserInfo(this.userId)
            })
        },
        gotoUserInfo(){
            this.$router.push({path:'/userInfo',query:{ userId: this.userId}})
        }
    }
};
</script>

<style scoped lang="less">
.content_left{
    width: 280px;
    background-color: #FAFAFA;
    padding: 40px 0;
    margin-top: 40px;
    border-radius: 6px;
    margin-bottom: 50px;
    .head_pic{
        height: 70px;
        width: 70px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        background-color: #fff;
    }
    .name{
        color: #333333;
        font-size: 16px;
        text-align: center;
        margin-top: 30px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .uid{
        color: #AEAEAE;
        font-size: 14px;
        text-align: center;
    }
    .user_tit{
        width: 152px;
        border-radius: 4px;
        margin:0 auto;
        border: 1px solid #333;
        overflow: hidden;
        margin-top: 20px;
        height: 26px;
        .room{
            width: 100px;
            line-height: 26px;
            color: #fff;
            background-color: #333;
            text-align: center;
        }
        .room_tit{
            width: 50px;
            line-height: 26px;
            color: #333;
            background-color: #fff;
            text-align: center;
        }
    }
    .btn{
        width: 220px;
        height: 40px;
        text-align: center;
        font-size: 14px;
        color: #333;
        line-height: 40px;
        display: block;
        border-radius: 4px;
        margin:5px auto
    }
    .btn_select{
        background-color: #4380FE;
        color: #fff;
        box-shadow: 0 0 20px rgba(67, 128, 254, 0.59);
    }
    .userInfo{
        text-align: center;
        font-size: 14px;
        color: #333;
        width: 100%;
        display: block;
        margin: 180px auto;
        margin-bottom: 60px;
    }
    .info_num{
        text-align: center;
        margin-top: 6px;
        color: #AEAEAE;
        font-size: 14px;
        margin-top: 20px;
    }
    .follow_btn{
        background-color: #333333;
        cursor: pointer;
        width: 220px;
        height: 40px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        line-height: 40px;
        margin: 20px auto;
        margin-bottom: 10px;
    }
    .unfollow_btn{
        background-color: #D0D0D0;
        cursor: pointer;
        width: 220px;
        height: 40px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        line-height: 40px;
        margin: 20px auto;
        margin-bottom: 10px;
    }
}
.content_right{
    width: 880px;
    overflow: hidden;
    margin-top: 40px;
}
</style>
