<template>
<html>
    <body>
        <!-- :class="[saveTitle == '/' ? 'index_select' : '']" -->
        <head>
            <meta charset="utf-8" />
            <title>{{info.title}}</title>
            <meta name="keywords" :content="info.keyword" />
            <meta name="description" :content="info.summary" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <!-- :class="isVisible?'header-navigation slideDown':'header-navigation slideUp'" -->
        <!-- v-show="saveTitle != '/'"  -->
        <header class="header-navigation slideDown" id="header">
            <nav>
                <div class="nav_top">
                    <img src="../../static/images/logo_en.png" alt class="imglogo fl"/>
                     <ul id="starlist" :style="showHead?'display: block':''">
                    <!-- <li :class="[saveTitle == '/' ? 'title1' : '']">
                        <router-link to="/">
                            <a
                                href="javascript:void(0);"
                                :class="[saveTitle == '/' ? 'title' : '']"
                            >首页</a>
                        </router-link>
                    </li> -->
                    <li :class="[saveTitle == '/dashbord' ? 'title1' : '']">
                        <router-link to="/dashbord">
                            <a
                                href="javascript:void(0);"
                                :class="[saveTitle == '/dashbord' ? 'title' : '']"
                            >Project Ecology</a>
                        </router-link>
                        <span class="race_line"></span>
                    </li>
                    <li :class="[saveTitle == '/express' ? 'title1' : '']">
                        <router-link to="/express">
                            <a
                                href="javascript:void(0);"
                                :class="[saveTitle == '/express' ? 'title' : '']"
                            >Latest Information</a>
                        </router-link>
                        <span class="race_line"></span>
                    </li>
                    <li :class="[saveTitle == '/moveBase' ? 'title1' : '']">
                        <router-link to="/moveBase">
                            <a
                                href="javascript:void(0);"
                                :class="[saveTitle == '/moveBase' ? 'title' : '']"
                            >Move Base</a>
                        </router-link>
                        <span class="race_line"></span>
                    </li>
                    <li :class="[(saveTitle == '/depth' || saveTitle == '/depthDetails') ? 'title1' : '']">
                        <router-link to="/depth">
                            <a
                                href="javascript:void(0);"
                                :class="[(saveTitle == '/depth' || saveTitle == '/depthDetails') ? 'title' : '']"
                            >Move Classroom</a>
                        </router-link>
                        <span class="race_line"></span>
                    </li>
                    <li :class="[(saveTitle == '/aptosDepth' || saveTitle == '/aptosDetails') ? 'title1' : '']">
                        <router-link to="/aptosDepth">
                            <a
                                href="javascript:void(0);"
                                :class="[(saveTitle == '/aptosDepth' || saveTitle == '/aptosDetails') ? 'title' : '']"
                            >In-depth</a>
                        </router-link>
                        <span class="race_line"></span>
                    </li>
                    <!-- <li>
                        <router-link to="/newProject">
                            <a
                                href="javascript:void(0);"
                                :class="[saveTitle == '/newProject' ? 'title' : '']"
                            >项目追踪</a>
                        </router-link>
                    </li> -->
                    <li :class="[saveTitle == '/myFollow' ? 'title1' : '']">
                        <router-link to="/myFollow">
                            <a
                                href="javascript:void(0);"
                                :class="[saveTitle == '/myFollow' ? 'title' : '']"
                            >Watchlist</a>
                        </router-link>
                        <span class="race_line"></span>
                    </li>
                </ul>
                    <el-dropdown @command="handleCommand" class="userInfoAvatar">
                        <span class="el-dropdown-link">
                            <!-- <img v-if="!isLogin" src="../../static/images/defaultAvatar.png" /> -->
                            <div v-if="!isLogin"  class="unLogin" @click="login">Sign in</div>
                            <img
                                v-if="isLogin&&userInfo.userpic!=undefined"
                                :src="userInfo.userpic"
                                onerror="onerror=null;src=defaultAvatar"
                            />
                            <img v-if="isLogin&&userInfo.userpic==undefined" :src="defaultAvatar" />
                        </span>
                        <el-dropdown-menu  v-if="isLogin" slot="dropdown">
                            <el-dropdown-item command="login" v-show="!isLogin">登录</el-dropdown-item>
                            <!-- <el-dropdown-item command="goUserInfo" v-show="isLogin">个人中心</el-dropdown-item> -->
                            <!-- <el-dropdown-item command="goCreator" v-show="isLogin">创作者中心</el-dropdown-item> -->
                            <el-dropdown-item command="logout" v-show="isLogin">Logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <router-link to="/about">
                        <a href="javascript:void(0);" class="nav_item fr">关于我们</a>
                    </router-link> -->
                    <!-- <router-link to="/class">
                        <a href="javascript:void(0);" class="nav_item fr img_item">
                            <img src="../../static/images/index/class.png" alt="">
                            
                           <span>区块链课堂</span>
                        
                        </a>
                    </router-link> -->
                </div>

                <h2 id="mnavh" @click="openHead" :class="showHead?'open':''">
                    <span class="navicon"></span>
                </h2>

               
            </nav>
        </header>
        <LoginBox v-if="showLogin" @closeLoginBox="closeLoginBox" @submit="connectWallet"></LoginBox>
        <div>
            <router-view />
        </div>
        <!-- <div style="height:100px"></div> -->
        <footer>
            <div class="footer_content">
                <div class="foot_left">
                    <img src="../../static/images/logo_en.png" alt="" class="foot_logo">
                    <p>Thank you for visiting our website, we have the most systematic Move tutorial, even beginners can learn to develop with Move language here. </p>
                    <p>Moreover, some of Aptos eco projects that worth paying attention to have been chosen by AptosEden through strict review standard, including but not limited to: </p>
                    <p>1.over 60 followers on Twitter; 2. projects with well-designed official website; 3. project that established over a certain period; 4; projects with originality, therefore, we present you with only 100+ projects for your reference.</p>
                </div>
                <div class="footer_right">
                    <p class="foot_tit">Contact Us</p>
                    <div class="foot_item">
                        <a href="https://twitter.com/AptosEden" target="_blank">Twitter</a>
                        <a href="https://t.me/Move_Ecosystem" target="_blank">Telegram</a>
                        <a href="https://discord.gg/Rp72EKMGcn" target="_blank">Discord</a>
                    </div>
                </div>
            </div>
            
        </footer>

        <!-- <div class="btn_nav"  v-show="saveTitle != '/'"> -->
        <div class="btn_nav"  v-show="false">
            <!-- <a
                href="javascript:void(0);"
                @mouseover="mouseOverFnc('qq')"
                @mouseleave="mouseLeaveFnc"
                class="btn_pic"
            > -->
            <a
                href="https://m.weibo.cn/u/5802608973"
                @mouseover="mouseOverFnc('qq')"
                @mouseleave="mouseLeaveFnc"
                target="_blank"
                class="btn_pic"
            >
              <img src="../../static/images/btn/3.png" alt="" v-show="btnSelect != 'qq'">
              <img src="../../static/images/btn/3-2.png" alt="" v-show="btnSelect == 'qq'" class="">
            </a>
            <a
                href="javascript:void(0);"
                @mouseover="mouseOverFnc('wx')"
                @mouseleave="mouseLeaveFnc"
                class="btn_pic"
            >
              <img src="../../static/images/btn/wx.png" alt="" v-show="btnSelect != 'wx'">
              <img src="../../static/images/btn/wx2.png" alt="" v-show="btnSelect == 'wx'" >
            </a>
            <a
                href="https://twitter.com/AptosEden"
                target="_blank"
                @mouseover="mouseOverFnc('db')"
                @mouseleave="mouseLeaveFnc"
                class="btn_pic"
            >
              <img src="../../static/images/btn/tt1.png" alt="" v-show="btnSelect != 'db'">
              <img src="../../static/images/btn/tt2.png" alt="" v-show="btnSelect == 'db'">
            </a>
            <a
                href="javascript:void(0);"
                @click="returnTop"
                @mouseover="mouseOverFnc('top')"
                @mouseleave="mouseLeaveFnc"
                class="btn_pic"
            >
              <img src="../../static/images/btn/top.png" alt="" v-show="btnSelect != 'top'">
              <img src="../../static/images/btn/topS.png" alt="" v-show="btnSelect == 'top'" class="btn_pic_s">
            </a>
            <!-- <a
                href="javascript:void(0);"
                @click="returnTop"
                :class="isCdTopVisible?'cd-top cd-is-visible':'cd-top'"
            >Top</a> -->

            <div class="phone_dialog" v-show="btnSelect == '111'">
              <p class="tit">加入社区</p>
              <p class="btn fl">扫码加入</p>
              <div class="erweima">
                <img src="../../static/images/btn/qun1.jpeg" alt="" class="load">
              </div>
            </div>
            <div class="wx_dialog" v-show="btnSelect == 'wx'">
              <div class="item">
                <div class="erweima fl">
                  <img src="../../static/images/btn/wxh.jpeg" alt="">
                </div>
                <div class="fr">
                  <p class="tit">微信号</p>
                  <p class="info">扫码添加微信号</p>
                </div>
              </div>
            </div>
        </div>
    </body>
</html>
</template>

<script>
import AvatarCropper from "@/components/AvatarCropper";
import { getWebConfig } from "../api/index";
import { delCookie, getCookie, setCookie } from "@/utils/cookieUtils";
import { logout, updateUser } from "../api/user";
import LoginBox from "../components/LoginBox";
// vuex中有mapState方法，相当于我们能够使用它的getset方法
import { mapMutations, mapState } from "vuex";
import { timeAgo } from "../utils/webUtils";

export default {
    name: "index",
    components: {
        LoginBox,
        AvatarCropper
    },
    data() {
        return {
            imagecropperShow: false,
            info: {},
            saveTitle: "/",
            keyword: "",
            showSearch: false, // 控制搜索框的弹出
            showHead: false, // 控制导航栏的弹出
            isCdTopVisible: false,
            isVisible: true, // 控制web端导航的隐藏和显示
            isLogin: false,
            showLogin: false, // 显示登录框
            userInfo: {
                // 用户信息
            },
            defaultAvatar: this.$SysConf.defaultAvatar, // 默认头像
            btnSelect:'',
            walletUser:'',
        };
    },
    // computed: {
    //   ...mapState([
    //     "userInfo"
    //   ])
    // },
    created(){

    },
    mounted() {
        var that = this;
        var offset = 300;
        var after = 0;
        window.addEventListener("scroll", function() {
            let scrollTop = document.documentElement.scrollTop; // 当前的的位置
            let scrollHeight = document.documentElement.scrollHeight; // 最高的位置

            if (scrollTop > offset) {
                that.isCdTopVisible = true;
            } else {
                that.isCdTopVisible = false;
            }

            // if (scrollTop > after) {
            //   that.isVisible = false
            // } else {
            //   that.isVisible = true
            // }
            after = scrollTop;
        });
    },
    watch: {
        $route(to, from) {
            this.getCurrentPageTitle();
        },
        // 判断登录状态位是否改变（用于控制弹框）
        "$store.state.app.loginMessage": function(newFlag, oldFlag) {
            this.showLogin = true;
        },
        "$store.state.user.userInfo": function(newFlag, oldFlag) {
            this.userInfo = newFlag;
        }
    },
    created() {
        this.getCurrentPageTitle();
        this.getToken();
        // this.getKeyword();
        // this.getWebConfigInfo()
    },
    mounted(){
      // this.$store.commit('setLoginMessage',Math.random())
      this.userInfo = this.$store.state.user.userInfo
      // console.log(this.userInfo)
    },
    methods: {
        // 拿到vuex中的写的方法
        ...mapMutations(["setUserInfo", "setLoginState", "setWebConfigData"]),
        // 搜索
        search: function() {
            if (this.keyword == "" || this.keyword.trim() == "") {
                this.$notify.error({
                    title: "错误",
                    message: "关键字不能为空",
                    type: "success",
                    offset: 100
                });
                return;
            }
            this.$router.push({
                path: "/list",
                query: { keyword: this.keyword }
            });
        },
        //划入事件
        mouseOverFnc(name){
          this.btnSelect = name
        },
        //划出事件
        mouseLeaveFnc(){
          this.btnSelect = ''
        },
        /**
         * dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
         * @param dateTimeStamp
         * @returns {string}
         */
        timeAgo(dateTimeStamp) {
            return timeAgo(dateTimeStamp);
        },
        close() {
            this.imagecropperShow = false;
        },
        async connectWallet(){
            this.walletUser = await window.aptos.connect()
            console.log("connectWallet===",response.address)
            this.wallectLogin(response.address)
        },
        //  钱包登陆
        wallectLogin(address){
            let data = {
                address: address,
                // token: '63bcdc6db36e66848ba8854a489c5518c47a15c6'
            }
            newWallectLogin(data).then( res => {
                console.log( res)
                let data = res.data
                setCookie("yueToken", data.token, 7);
                this.setUserInfo(data);
                window.location.reload();
            })
            // setCookie("yueToken", data.token, 7);
            // this.setUserInfo(data);
            //   console.log(this.$store.state.user.userInfo)
        },
        getToken: function() {
            let token = getCookie("yueToken");
            // let token = this.getUrlVars()["token"];
            // // 判断url中是否含有token
            // if (token != undefined) {
            //     // 设置token七天过期
            //     setCookie("yueToken", token, 7);
            // } else {
            //     // 从cookie中获取token
            //     token = getCookie("yueToken");
            // }
            console.log(token);
            
            if (token != undefined) {
                this.isLogin = true;
                // this.setLoginState(this.isLogin);
                updateUser().then( res => {
                    // console.log(res)
                    this.userInfo = res.data;
                    this.setUserInfo(this.userInfo);
                    this.setLoginState(this.isLogin)
                })
                // this.userInfo = response.data;
            } else {
                this.isLogin = false;
                this.setLoginState(this.isLogin);
            }

            // (token!= undefined) {
            //   authVerify(token).then(response => {
            //     if (response.code == this.$ECode.SUCCESS) {
            //       this.isLogin = true
            //       this.userInfo = response.data
            //       this.setUserInfo(this.userInfo)
            //     } else {
            //       this.isLogin = false
            //       delCookie('token')
            //     }
            //     this.setLoginState(this.isLogin)
            //   })
            // } else {
            //   this.isLogin = false
            //   this.setLoginState(this.isLogin)
            // }
        },
        getKeyword: function() {
            var tempValue = decodeURI(this.getUrlVars()["keyword"]);
            if (
                tempValue == null ||
                tempValue == undefined ||
                tempValue == "undefined"
            ) {
            } else {
                this.keyword = tempValue;
            }
        },
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
        /**
         * 获取网站配置
         */
        getWebConfigInfo: function() {
            let webConfigData = this.$store.state.app.webConfigData;
            if (webConfigData.createTime) {
                this.contact = webConfigData;
                this.mailto = "mailto:" + this.contact.email;
                this.openComment = webConfigData.openComment;
            } else {
                this.$http
                    .get("./static/json/getWebConfig.json")
                    .then(response => {
                        if (response.data.code == this.$ECode.SUCCESS) {
                            this.info = response.data.data;
                            // 存储在Vuex中
                            this.setWebConfigData(response.data.data);
                            this.openComment = this.info.openComment;
                        }
                    });

                // getWebConfig().then(response => {
                //   if (response.code == this.$ECode.SUCCESS) {
                //     this.info = response.data
                //     // 存储在Vuex中
                //     this.setWebConfigData(response.data)
                //     this.openComment = this.info.openComment
                //   }
                // })
            }
        },
        /**
         * 截取URL中的参数
         * @returns {{}}
         */
        getUrlVars: function() {
            var vars = {};
            var parts = window.location.href.replace(
                /[?&]+([^=&]+)=([^&#]*)/gi,
                function(m, key, value) {
                    vars[key] = value;
                }
            );
            return vars;
        },
        clickSearchIco: function() {
            if (this.keyword != "") {
                this.search();
            }
            this.showSearch = !this.showSearch;
            // 获取焦点
            this.$refs.searchInput.focus();
        },
        openHead: function() {
            this.showHead = !this.showHead;
        },
        returnTop: function() {
            window.scrollTo(0, 0);
        },
        userLogin: function() {
            this.showLogin = true;
        },
        login(){
            this.showLogin = true;
        },
        userLogout: function() {
            // deleteUserccessToken(getCookie('token'))
            // let url = window.parent.location.href;
            // let haveToken = url.indexOf("?token");
            // if (haveToken != -1) {
            //     let list = url.split("?token");
            //     this.isLogin = false;
            //     window.location.href = list[0];
            //     let userInfo = {};
            //     this.setUserInfo(userInfo);
            //     this.$router.push({ path: "/" })
            // } else {
              logout().then( res => {
                  delCookie("yueToken");
                  this.logoutWallet()
              })
              this.isLogin = false;
              let userInfo = {};
              this.setUserInfo(userInfo);
              this.$router.push({ path: "/" })
                // window.location.reload();
            // }
        },
        async logoutWallet(){
            // get current connection status
            await window.aptos.disconnect();
            let connectionStatus = await window.aptos.isConnected();
            console.log(connectionStatus)
            // event listener for disconnecting
            window.aptos.onDisconnect(() => {
                connectionStatus = false;
            });
        },
        // 点击头像触发的动作
        handleCommand(command) {
            switch (command) {
                case "logout":
                    {
                        this.userLogout();
                    }
                    break;
                case "login":
                    {
                        this.userLogin();
                    }
                    break;
                case "goUserInfo":
                    {
                        this.$router.push({ path: "/personalCenter",query:{ userId: this.userInfo.id} });
                    }
                    break;
                case "goCreator":
                    {
                        this.$router.push({ path: "/creatorCenter" });
                    }
                    break;
            }
        },
        closeLoginBox: function() {
            this.showLogin = false;
        }
    }
};
</script>

<style>
@import "../assets/css/emoji.css";
.emoji-panel-btn:hover {
    cursor: pointer;
    opacity: 0.8;
}
.emoji-item-common {
    background: url("../assets/img/emoji_sprite.png");
    display: inline-block;
    zoom: 0.3;
}
.emoji-item-common:hover {
    cursor: pointer;
}
.emoji-size-small {
    /* 表情大小 */
    zoom: 0.3;
}
</style>
<style lang="less" scoped>
nav{
  padding-bottom: 2px;
//   border-bottom: 2px solid rgb(27, 36, 71);
}
.nav_top {
    height: 88px;
    // background-color: rgba(0, 0, 0, 0);
    // border-bottom: 1px solid rgb(27, 36, 71);
    padding: 1px;
    .imglogo {
        height: 40px;
        width: auto;
        margin-top: 19px;
    }
    .nav_item {
        line-height: 70px;
        margin-right: 40px;
        color: #333333;
        font-size: 14px;
        &:hover {
            color: #fff;
        }
    }
    .img_item{
        position: relative;
        margin-left: 20px;
        img{
            width: 130px;
            height: auto;
            margin-top: 12px;
        }
        span{
            position: absolute;
            top: 0;
            left: 15px;
            color: #fff;
            width: 100%;
            // text-align: center;
        }
    }
}
</style>
<style scoped>
.el-tag {
    height: 25px;
    line-height: 25px;
    margin-left: 6px;
}
#starlist li {
    /* color: #333333; */
    font-size: 18px;
    position: relative;
}

#starlist li .race_line{
    display: inline-block;
    position: absolute;
    width: 0px;
    height: 2px;
    left: 0px;
    bottom: 15px;
    background: #fff;
    transition: all 0.3s ease 0s;
}
#starlist  .title {
    color: #FFFFFF;
    /* line-height: 40px; */
    /* border-radius: 10px; */
    /* border-bottom: 2px solid #ffffff; */
}
#starlist  .title1 .race_line{
    /* color: #FFFFFF; */
    /* line-height: 40px; */
    /* border-radius: 10px; */
    /* border-bottom: 3px solid #ffffff; */
    width: 100%;
}
.userInfoAvatar {
    width: 30px;
    height: 30px;
    /* position: absolute; */
    float: right;
    margin-right: 60px;
    margin-top: 26px;
}

.userInfoAvatar img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    margin: 0, 0, 0, 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #1EE9B7;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.imgBody {
    width: 100px;
    height: 100px;
    border: solid 2px #ffffff;
    float: left;
    position: relative;
}
.imgBody img {
    width: 100px;
    height: 100px;
}
.unLogin{
    width: 80px;
    height: 36px;
    background: #ffffff;
    border-radius: 10px;
    line-height: 36px;
    font-size: 14px;
    color: #000;
    text-align: center;
    cursor: pointer;
    
}
.uploadImgBody {
    margin-left: 5px;
    width: 100px;
    height: 100px;
    border: dashed 1px #c0c0c0;
    float: left;
    position: relative;
}
.uploadImgBody :hover {
    border: dashed 1px #00ccff;
}
.inputClass {
    position: absolute;
}

.commentList {
    width: 100%;
    margin: 0 auto;
}
.commentList .p1 {
    float: left;
}
.commentList .left {
    display: inline-block;
    width: 10%;
    height: 100%;
}
.commentList .left img {
    margin: 0 auto;
    width: 100%;
    border-radius: 50%;
}
.commentList .right {
    display: inline-block;
    width: 85%;
    margin-left: 5px;
}
.commentList .rightTop {
    height: 30px;
}
.commentList .rightTop .userName {
    color: #303133;
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
}
.commentList .rightTop .timeAgo {
    color: #909399;
    margin-left: 10px;
    font-size: 15px;
}
.commentList .rightCenter {
    margin-left: 20px;
    line-height: 30px;
    height: 60px;
}
</style>
<style lang="less" scoped>
.index_select{
  background: #030303;
  .header-navigation{
    background: #030303;
    color: #fff !important;
  }
  /deep/.content{
    background: #070708;
  }
  .title{
    color: #fff !important;
  }
  #starlist li a,.nav_item{
    color: #fff !important;
  }
  #starlist{
    border: 0;
  }
  .nav_top{
      border: none;
  }
  nav{
      border: none;
  }
}
.btn_nav{
  position: fixed;
  bottom: 60px;
  right: 20px;
  z-index: 2000;
  .btn_pic{
    width: 40px;
    height: 46px;
    margin-bottom: 14px;
    display: block;
    img{
      width: 40px;
      height: 40px;
    }
    .btn_pic_s{
    //   height: 46px;
    }
  }
}
.erweima{
  .load{
    width: 90px;
    height: 90px;
    float: right;
    margin-right: 30px;
  }
}
.wx_dialog{
  width: 200px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  right: 60px;
  top: 0px;
  z-index: 20000;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  .item{
    overflow: hidden;
    .erweima{
      img{
        width: 70px;
        height: 70px;
      }
    }
    .tit{
      color: #333333;
      font-size: 18px;
      margin-bottom: 5px;
    }
    .info{
      color: #333333;
      font-size: 12px;
    }
  }
}
.phone_dialog{
  width: 252px;
  height: 184px;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  z-index: 20000;
  right: 60px;
  top: 0px;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  .tit{
    color: #333333;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .info{
    color: #333333;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .btn{
    background-color: #007AFF;
    width: 80px;
    height: 30px;
    font-size: 12px;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 30px;
  }
}
footer{
    background-color: #0E0E0E;
    height: 350px;
    .footer_content{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }
    .foot_left{
        width: 640px;
        float: left;
        .foot_logo{
            width: 178px;
            margin-top: 40px;
            margin-bottom: 30px;
        }
        p{
            font-size: 14px;
            color: #fff;
            margin-bottom: 26px;
        }
    }
    .footer_right{
        float: left;
        margin-left: 60px;
        .foot_tit{
            margin-top: 40px;
            margin-bottom: 60px;
            color: #fff;
            font-size: 28px;
        }
        .foot_item{
            overflow: hidden;
            a{
                color: #989898;
                font-size: 18px;
                float: left;
                margin-right: 95px;
                &:hover{
                    color: #fff;
                }
            }
        }
    }
}
</style>
<style lang="less">
//头部选择器
.top_head{
    background-color: #030303;
    // background-color: #000;
    height: 80px;
    padding-top: 20px;
    box-sizing: border-box;
    position: fixed;
    top: 76px;
    min-width: 800px;
    // max-width: 1500px;
    width: 100%;
    left: 0;
    z-index: 400;
    .reac_type{
        width: 90%;
        max-width: 1480px;
        margin: 0 auto;
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 0px 12px;
        background: #030303;
        border-radius: 4px;
        box-sizing: border-box;
        .new_ul{
            overflow-x: auto;
            display: flex;
            list-style: none;

            li{
                line-height: 48px;
                white-space: nowrap;
                font-size: 14px;
                color: #AEAEAE;
                cursor: pointer;
                position: relative;
                margin: 0px 12px;
                transition: all 0.3s ease 0s;
                .race_line{
                    display: inline-block;
                    position: absolute;
                    width: 0px;
                    height: 2px;
                    left: 0px;
                    bottom: 10px;
                    background: #fff;
                    transition: all 0.3s ease 0s;
                }
                .race_num{
                    font-size: 12px;
                    display: inline-block;
                    height: 14px;
                    color: rgb(255, 212, 92);
                    line-height: 14px;
                    transform: translateY(-1px);
                    padding: 0px 4px;
                    background: rgba(255, 212, 92, 0.1);
                    border-radius: 4px;
                    transition: all 0.3s ease 0s;
                }
            }
        }
        
        .activeType{
            color: #fff !important;
            .race_line{
                width:100% !important;
            }
            .race_num{
                color: #1EE9B7;
                background: rgba(167, 240, 186, 0.1);
            }
        }
        .search_type{
            width: 160px;
            height: 28px;
            position: relative;
            margin-right: 12px;
            background: #fff;
            border-radius: 18px;
            border: 1px solid #ccc;
        }
        .search_input{
            height: 28px;
            .el-input__inner{
                border: none;
                height: 28px;
                line-height: 28px;
                border-radius: 14px;
                color: #333;
                background: transparent;
            }
            .el-input__icon{
                line-height: 28px;
            }
        }
    }

}
// 右侧自选样式
.pro_right{
    width: 350px;
    margin-left: 20px;
    margin-top: 40px;
    // height: 100px;
    // border: 1px solid #000;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    background: #0C0C0C;
    background-color: #0C0C0C !important;
    border-radius: 4px;
    max-height: 90%;
    .list_box{
        -webkit-box-flex: 1;
        overflow-y: auto;
        max-height: 90%;
        width: 100%;
        flex: 1 1 0%;
        // margin: 16px 0px;
        // padding: 0px 16px 0px 8px;
        
    }
    .clearfix{
        span{
            font-size: 24px;
            // color: #fff;
            line-height: 54px;
        }
    }
    .item{
        // &:hover{
        //     background: rgb(48, 66, 112) !important;
        // }
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 80px;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding-left: 4px;
        padding-right: 4px;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        border-radius: 4px;
        .name_box{
            font-size: 15px;
            font-weight: 700;
            color: #fff;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            img{
                width: 42px;
                height: 42px;
                margin-right: 16px;
                border-radius: 50%;
                background: #fafafa;
            }
            span{
                color: #FFFFFF;
                margin-left: 8px;
                font-weight: 400;
            }
        }
        .remove_btn{
            // display: flex;
            align-items: center;
            // color: #F56C6C;
            font-size: 12px;
            cursor: pointer;
            width: 80px;
            height: 28px;
            border-radius: 14px;
            text-align: center;
            line-height: 28px;
            color: #000;
            background: #fff;
        }
    }
}
.pro_right{
    border: none !important;
    box-shadow: none !important;
    .el-card__header{
        background: #FAFAFA;
        border:none;
        color: #181818;
    }
    .el-card__body{
        background: #FAFAFA;
        border:none;
        color: #181818;
    }
}
.box_empty{
    width: 100%;
    text-align: center;
    color: #333;
    margin-top: 20px;
}
</style>