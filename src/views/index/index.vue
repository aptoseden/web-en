<template>
    <div class="index">
         <div class="nav_new_top">
            <img src="../../../static/images/newindex/logo.png" alt class="imglogo fl"/>
            <router-link to="/dashbord">
                <div class="btn fr">
                    进入详情
                </div>
            </router-link>
            
        </div>
        <el-carousel height="100vh" direction="vertical" :autoplay="false"
        trigger="click"
        :loop="false"
        ref="carousel"
        @mousewheel.native="rollScroll">
            <el-carousel-item class="medium">
                <img src="../../../static/images/newindex/pic12.png" alt="" class="pic12">
                <div class="content">
                    <div class="fl">
                        <img src="../../../static/images/newindex/pic14.png" alt="" class="pic14">
                        <router-link to="/dashbord">
                           <img src="../../../static/images/newindex/pic13.png" alt="" class="pic13">
                        </router-link>
                    </div>
                        <img src="../../../static/images/newindex/pic11.png" alt="" class="pic11">

                </div>
            </el-carousel-item>
            <!-- 第二屏幕 -->
            <el-carousel-item  class="medium2">
                <img src="../../../static/images/newindex/pic12.png" alt="" class="pic12">
                <div class="content">
                    <div class="fl">
                        <img src="../../../static/images/newindex/pic21.png" alt="" class="pic21">
                    </div>
                    <router-link to="/depth">
                        <img src="../../../static/images/newindex/pic22.png" alt="" class="pic22">
                    </router-link>
                </div>
            </el-carousel-item>
            <!-- 第三屏幕 -->
            <el-carousel-item class="medium2">
                <img src="../../../static/images/newindex/pic12.png" alt="" class="pic12">
                <div class="content">
                    <div class="fl">
                        <img src="../../../static/images/newindex/pic31.png" alt="" class="pic31">
                        <router-link to="/depth">
                           <img src="../../../static/images/newindex/pic33.png" alt="" class="pic33">
                        </router-link>
                    </div>
                        <img src="../../../static/images/newindex/pic32.png" alt="" class="pic32">

                </div>
            </el-carousel-item>
            <!-- 第四屏幕 -->
            <el-carousel-item class="medium2">
                <img src="../../../static/images/newindex/pic12.png" alt="" class="pic12">
                <div class="content">
                    <img src="../../../static/images/newindex/pic41.png" alt="" class="pic41">
                    <div class="foot">
                        <img src="../../../static/images/newindex/pic42.png" alt="" class="pic42 fl">
                        <router-link to="/depth">
                           <img src="../../../static/images/newindex/pic43.png" alt="" class="pic43 fr">
                        </router-link>
                    </div>

                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
    
</template>
<script>
export default {
    name: "about",
    data() {
        return {
            select: "#anchor0",
            screenHeight:300,
            scrollBox:{
                time: 0
            }
        };
    },
    mounted() {
        this.screenHeight = document.documentElement.clientHeight;
        // console.log(222)
    },
    created() {
        this.$router.push({path:'/dashbord'})
    },
    methods: {
        goAnchor(selector) {
            this.select = selector
            var anchor = this.$el.querySelector(selector);
            // document.body.scrollTop = anchor.offsetTop;
            // console.log(anchor.offsetTop)
            window.scrollTo( 0, anchor.offsetTop)
        },
        rollScroll(event) {
            // console.log(111)
            let _that = this;
            let scrollVal = event.wheelDelta || event.detail;
            if(_that.scrollBox.time){
                clearTimeout(_that.scrollBox.time)
            }
            _that.scrollBox.time = setTimeout(() => {
                scrollVal>0?_that.$refs.carousel.prev():_that.$refs.carousel.next();
            }, 150);
        },
    }
};
</script>
<style scoped lang="less">
.index{
    width: 100%;
    // background-color: transparent;
    height: 100vh;
    position: relative;
    // min-height: 500px;
    overflow: visible;
    .pic12{
        width: 174px;
        height: auto;
        position: absolute;
        right: 30px;
        top: 130px;
    }
    .content{
        width: 1300px;
        margin: 0 auto;
        padding-top: 70px;
        box-sizing: border-box;
        .pic14{
            width: 700px;
            height: auto;
            margin-top: 70px;
        }
        .pic13{
            width: 630px;
            height: auto;
            margin-top: 100px;
            cursor: pointer;
        }
        .pic11{
            width: 410px;
            height: auto;
            float: right;
            margin-top: 188px;
            margin-right: 40px;
        }
        .pic21{
            width: 600px;
            height: auto;
        }
        .pic22{
            width: 300px;
            height: auto;
            float: right;
            margin-top: 420px;
            margin-right: 80px;
        }
        .pic31{
            width: 638px;
            height: auto;
            margin-top: 70px;
        }
        .pic32{
            width: 514px;
            height: auto;
            float: right;
            margin-top: 270px;
            margin-right: 40px;
        }
        .pic33{
            width: 300px;
            height: auto;
            margin-top: 10px;
            cursor: pointer;
        }
        .pic41{
            width: 610px;
            height: auto;
            display: block;
            margin: 0 auto;
            // margin-top: 70px;
        }
        .pic42{
            width: 660px;
            height: auto;
        }
        .pic43{
            width: 300px;
            height: auto;
            margin-top: 140px;
        }
    }
}
 .medium{
     background: #1EE9B7;
    //  position: relative;
 }
 .medium2{
     background: #F9F9F9;
    //  position: relative;
 }
 /deep/.el-carousel__button{
    background: #181818;
    width: 2px;
    height: 20px;
    opacity: .3;
}
.nav_new_top {
    height: 70px;
    position: absolute;
    z-index: 10;
    width: 100%;
    top: 0;
    left: 0;
    // background-color: rgba(0, 0, 0, 0);
    // background-color: transparent;
    // border-bottom: 1px solid rgb(27, 36, 71);
    .imglogo {
        height: 46px;
        width: auto;
        margin-top: 20px;
        margin-left: 70px;
    }
    .btn{
        height: 30px;
        width: 80px;
        border-radius: 15px;
        margin-top: 20px;
        margin-right: 30px;
        background-color: #181818;
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
}


</style>
