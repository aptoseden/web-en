<template>
   <div class="userInfo">
       <div class="item">
           <p class="tit fl">头像</p>
           <img :src="userInfo.userpic" alt="" class="pic fr">
       </div>
       <div class="item">
           <p class="tit fl">UID</p>
           <p class="tit fr">{{userInfo.osn}}</p>
       </div>
       <div class="item">
           <p class="tit fl">个人认证</p>
           <p class="tit fr" v-show="!userInfo.common_auth_status">已认证</p>
           <a href="javascript:;" class="btn fr" @click="goto" v-show="userInfo.common_auth_status">去认证</a>
       </div>
       <div class="item">
           <p class="tit fl">大V认证</p>
           <p class="tit fr" v-show="userInfo.depth_admin_status == 0">已认证</p>
           <p class="tit fr" v-show="userInfo.depth_admin_status == 1 ">审核中</p>
           <a href="javascript:;" class="btn fr" @click="goto" v-show="userInfo.depth_admin_status == 2 || userInfo.depth_admin_status == null">去认证</a>
       </div>
   </div>
</template>
<script>
export default {
    name: "userInfo",
    data() {
        return {
            userInfo: {},
        };
    },
    mounted() {
        this.$nextTick(() => { 
            this.userInfo = this.$store.state.user.userInfo
        });
    },
    created() {},
    // 
    methods: {
        changeBtn(item){
            this.btn_select = item
        }, 
        goto(){
            this.$router.push({path:'/useCertification'})
        }
    }
};
</script>

<style scoped lang="less">
.userInfo{
    margin:0 auto;
    margin-top: 50px;
    width: 420px;
    
}
.item{
    height: 60px;
    .tit{
        font-size: 14px;
        color: #333333;
        line-height: 60px;
    }
    .pic{
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-top: 10px;
    }
    .btn{
        width: 70px;
        height: 30px;
        background-color: #333333;
        font-size: 14px;
        color: #ffffff;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
        margin-top: 15px;
    }
}
</style>
