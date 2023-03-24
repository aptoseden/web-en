<template>
   <article style="position: relative;" id="articleLeft">
       <!-- <Empty></Empty> -->
       <div class="creatLeft" id="creatLeft">
           <router-link to="/creatorCenter">
                <p class="router_btn " :class="[saveTitle == '/creatorCenter' ? 'router_select' : '']">主页</p>
           </router-link>
           <router-link to="/creatorCenter/creat">
                <p class="router_btn"  :class="[saveTitle == '/creatorCenter/creat' ? 'router_select' : '']">发布文章</p>
           </router-link>
       </div>
       <div class="creatRight">
            <router-view />
       </div>
       <div class="clear"></div>
   </article>
</template>
<script>
export default {
    name: "creator",
    data() {
        return {
            userInfo: {},
            saveTitle:'',
            selector:'',
        };
    },
    watch:{
        $route(to, from) {
            this.getCurrentPageTitle();
        },
    },
    mounted() {
        this.$nextTick(() => { 
            this.userInfo = this.$store.state.user.userInfo
            // console.log(this.userInfo)
            this.isCreator()
            this.getCurrentPageTitle()
        });
        // window.addEventListener("scroll", function() {
        //     let scrollTop = document.documentElement.scrollTop; // 当前的的位置
        //     this.selector.style.top = scrollTop + 40 + 'px';
        //      console.log(scrollTop)
        // });
    },
    created() {
        // this.selector = document.querySelector('#creatLeft')
    },
    destroyed () {//离开该页面需要移除这个监听的事件
        // window.removeEventListener('scroll', function(){})
    },
    // 
    methods: {
        /**
         * 获取当前所在页面的标题
         * @returns {{}}
         */
        getCurrentPageTitle: function() {
            var test = window.location.href;
            var start = 0;
            var end = test.length;
            for (var i = 0; i < test.length; i++) {
                if (test[i] == "#") {
                    start = i;
                }
                if (test[i] == "?" && i > start) {
                    end = i;
                }
            }
            var result = test.substring(start + 1, end);
            this.saveTitle = result;
            // console.log(this.saveTitle);
        },
        isCreator(){
            if( this.userInfo.depth_admin_status != 0){
                this.$message.error('您需要完成大V认证!');
                this.$router.push({ path: "/useCertification" });
            }
        }
    }
};
</script>

<style scoped lang="less">
.creatLeft{
    width: 280px;
    height: 500px;
    border-radius: 6px;
    background-color: #FAFAFA;
    padding: 30px;
    box-sizing:  border-box;
    // margin-top: 40px;
    // float: left;
    position: absolute;
    left: 0;
    top: 40px;
    .router_btn{
        width: 210px;
        display: block;
        margin: 0 auto;
        margin-bottom: 20px;
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        color: #333333;
        text-indent: 20px;
        cursor: pointer;
    }
    .router_select{
        background-color: #4380FE;
        color: #fff;
        box-shadow:  0 0 10px rgba(67, 128, 254, 0.59);
    }
}
.creatRight{
    width: 890px;
    float: right;
    margin-top: 40px;
    // height: calc(100vh - 130px);
    // overflow-y: scroll;
    // box-sizing: border-box;
}
</style>
