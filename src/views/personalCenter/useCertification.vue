<template>
   <article>
       <div class="title">
           认证
       </div>
       <p class="tit_warn">
           提示：实名认证，请先绑定手机号码，请前往APP账号与安全页面进行绑定
       </p>
       <div class="img_content">
       </div>
       <p class="notice">【公告】应国家相关政策要求，即日起，悦财经用户上传发表专栏内容（包括但不限于文字、图片、视频、动画等形式内容）需要通过实名认证，未认证的用户将无法上传并发布内容，望知悉，诸多不便，敬请谅解！感谢一直以来对悦财经的支持与信任！</p>
       <div class="content_box">
           <p>请下载"<span class="col_blu">悦财经</span>"APP</p>
           <p>在“我的->认证管理”进行认证</p>
           <p>只有在完成“个人认证”以后才可以进行大V认证</p>
           <img src="../../../static/images/load.png" alt="" class="load">
      </div>
   </article>
</template>
<script>
// import { getFollowList } from '@/api/userInfo'
// import phone from './second/phone'
// import userInfo from './second/userInfo'
export default {
    name: "useCertification",
    data() {
        return {
            btn_select: "1",
            userInfo: {},
            currentPage: 1,
            totalPage:2,
            loading:false,
            isEnd:false
        };
    },
    mounted() {
        this.$nextTick(() => { 
            // this.getList(this.userId,1)
        });
    },
    created() {},
    // 
    methods: {
        
    }
};
</script>

<style scoped lang="less">
.title{
    width: 100%;
    height: 80px;
    background-color: #FAFAFA;
    border-radius: 6px;
    text-align: center;
    margin-top: 40px;
    color: #333333;
    font-size: 18px;
    line-height: 80px;
    font-weight: bold;
}
.tit_warn{
    text-align: center;
    font-size: 18px;
    color: #333333;
    margin-top: 40px;
    margin-bottom: 30px;
}
.img_content{
    text-align: center;
    img{
        width: 240px;
        height: 140px;
        border-radius: 6px;
        display: inline-block;
        margin-right: 130px;
    }
}
.notice{
    font-size: 18px;
    color: #333333;
    margin-top: 30px;
}
.col_blu{
    color: #4380FE !important;
}
.content_box{
    width: 100%;
    height: 258px;
    border-radius: 6px;
    background-color: #FAFAFA;
    padding: 30px;
    box-sizing: border-box;
    margin-bottom: 80px;
    margin-top: 30px;
    p{
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        color: #333333;
    }
}
.load{
    margin: 0 auto;
    width: 100px;
    height: 100px;
    margin-top: 10px;
}
</style>
