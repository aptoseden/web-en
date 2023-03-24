<template>
    <div>
        <div class="box loginBox" v-if="showLogin == true" style="height: 500px;width:750px"> 
            <!-- :style="'height:'+ boxHeight + 'px'" -->
            <span class="t2" @click="closeLogin()">X</span>
            <!-- <img class="login_img" src="../../../static/images/login_logo.png" alt=""> -->
            <div class="login_left">
                <img src="../../../static/images/login1.png" alt="">
            </div>
            <div class="login_right">
                <p class="login_title" v-show="boxType == 'login'">Hello, Please login</p>
                <!-- <p class="login_title login_title2" v-show="boxType != 'login'">Forgot password</p>
                <span class="label">Email:</span>
                <div class="input">
                    <el-input v-model="email" placeholder="Email" class="phone_input"></el-input>
                </div>
                <span class="label" v-show="boxType != 'edit'">Password:</span>
                <span class="label" v-show="boxType == 'edit'">New Password:</span>
                <div class="input">
                    <el-input v-model="password" show-password placeholder="Password" class="label_input"></el-input>
                </div> -->
                <img src="../../../static/images/walletIcon.png" alt="" class="walletIcon">
                <div class="submit_btn" @click="connectWallet">
                    Connect Wallet</div>
                <!-- <div class="input" v-show="boxType != 'login'">
                    <span class="label">确认密码:</span>
                    <el-input v-model="password2" show-password placeholder="请再次输入密码" class="label_input"></el-input>
                </div> -->

                <!-- 111 -->
                <!-- <span class="label" v-show="boxType != 'login'">Verification Code:</span>
                <div class="input" v-show="boxType != 'login'">
                    <el-input v-model="code" placeholder="Verification Code" class="label_input"></el-input>
                    <div class="label_btn" v-show="codeType" @click="getCode">Get Code</div>
                    <div class="label_btn" v-show="!codeType">{{ countDown }}</div>
                </div> -->

                <!-- 111 -->
                <!-- <div class="input"  v-show="boxType == 'register'">
                    <span class="label">邀请码:</span>
                    <el-input v-model="inviteCode" placeholder="请输入邀请码(选填)" class="label_input"></el-input>
                </div> -->

                <!-- 222 -->
                <!-- <div class="span_input" v-show="boxType == 'login'">
                    <span class="col_blu fl" @click="changeBoxType('edit')">Forgot password?</span>
                    <span class="col_blu fr" @click="changeBoxType('register')">Create an Account>></span>
                </div>
                <div class="span_input" v-show="boxType != 'login'">
                    <span class="col_blu fr" @click="changeBoxType('login')">Login>></span>
                </div>
                <div class="span_input" >
                    <span class="col_blu fr" @click="connectWallet">钱包登陆</span>
                </div>
                <div class="submit_btn" @click="startLogin" v-show="!loading && boxType == 'login'">SIGN IN</div>
                <div class="submit_btn" @click="startUserReg" v-show="!loading && boxType == 'register'">SUBMIT</div>
                <div class="submit_btn" @click="startEdit" v-show="!loading && boxType == 'edit'">SUBMIT</div>
                <div class="submit_btn" v-show="loading">Wait...</div> -->
            </div>
            <p class="agreement" v-if="false">注册即代表您已阅读并同意
                    <a href="javascript:void(0);" class="col_b" @click="goto('userAgreement')">《用户协议》</a>
                和
                    <a href="javascript:void(0);" class="col_b" @click="goto('privacyAgreement')">《政策隐私》</a>
            </p>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
import { localLogin, getMstrCountry, sendcode, userReg, overseasSendCode, userEditPassowrd , newWallectLogin} from "@/api/user";
import { delCookie, getCookie, setCookie } from "@/utils/cookieUtils";
import { Loading, Message } from "element-ui";
import { mapMutations } from "vuex";
// import { MessageBox, Message } from "element-ui";
export default {
    name: "share",
    data() {
        return {
            loading: false,
            boxHeight: 550,
            options: [
                {
                    id: 1,
                    EN_NAME: "中国",
                    CN_NAME: "中国",
                    CODE: "中国",
                    AREA_CODE: "86"
                }
            ],
            codeType: true, //判断验证码时间
            boxType: 'login',//判断是登陆框，注册框，忘记密码框 login,edit,register
            countDown: "",
            phone: "",
            code: "",
            inviteCode: "",
            invite: true,
            // 显示登录页面
            showLogin: true,
            countryId: "86",
            password: '',//密码
            // password2:'',//确认密码
            email:''
        };
    },
    components: {},
    created() {
        // getMstrCountry().then(res => {
        //     this.options = res.data;
        // });
    },
    methods: {
        // 拿到vuex中的写的方法
        ...mapMutations(["setUserInfo", "setLoginState"]),
        // 验证手机号码
        isPhone() {
            let mPattern = /^1[23456789]\d{9}$/;
            return mPattern.test(this.phone);
        },
        isEmail() {
            let mPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            return mPattern.test(this.email);
        },
        // 
        isAbroadPhone() {
            let mPattern = /^[0-9]*$/;
            return mPattern.test(this.phone);
        },
        changeBoxType(type){
            this.boxType = type
            if( type == 'register' || type == 'edit'){
                this.boxHeight = 600
            }else{
                this.boxHeight = 550
            }
            // console.log(type == 'register')
            this.clear()
        },
        clear(){
            this.email = '';
            this.password = ''
            this.inviteCode = ''
            this.code = ''
            this.codeType = true;
        },
        getCode() {
            if( !this.isEmail()){
                this.codeType = true;
                return Message({
                    message: "请输入正确邮箱",
                    type: "error",
                    duration: 3 * 1000
                });
            }
            this.codeType = false;
            let time = 60,
                _this = this;
            this.countDown = time + " s";
            let timeInterval = setInterval(function() {
                time--;
                _this.countDown = time + " s";
                if (time == 0) {
                    _this.codeType = true;
                    clearInterval(timeInterval);
                }
            }, 1000);
            let data = {
                email : this.email
            }
            sendcode(data).then(res => {
                Message({
                    message: '发送成功',
                    // message: res.data.code.code.toString(),
                    type: "success",
                    duration: 3 * 1000
                });
                // this.invite = !res.data.invite;
                // console.log( res )
            });
        },
        //忘记密码
        startEdit(){
            let data = {
                code: this.code,
                email: this.email,
                password: this.password,
                repassword: this.password
            }
            userEditPassowrd(data).then( res => {
                // console.log( res )
                if( res.errorCode){
                    // console.log(res)
                    return Message({
                        message: res.msg,
                        type: "error",
                        duration: 3 * 1000
                    });
                }else{
                    this.boxType = 'login'
                    this.clear()
                    return Message({
                        message: res.msg,
                        type: "success",
                        duration: 3 * 1000
                    });
                }
            })
        },
        async connectWallet(){
            const response = await window.aptos.connect()
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
        startUserReg(){
            let data = {
                code: this.code,
                email: this.email,
                password: this.password,
                repassword: this.password
            }
            userReg(data).then( res => {
                // console.log( res )
                if( res.errorCode){
                    // console.log(res)
                    return Message({
                        message: res.msg,
                        type: "error",
                        duration: 3 * 1000
                    });
                }else{
                    this.boxType = 'login'
                    this.clear()
                    return Message({
                        message: res.msg,
                        type: "success",
                        duration: 3 * 1000
                    });
                }
            })
        },
        startLogin() {
            // if (this.countryId == 86) {
            //     if (!this.isPhone()) {
            //         this.codeType = true;
            //         return Message({
            //             message: "请输入正确手机号",
            //             type: "error",
            //             duration: 3 * 1000
            //         });
            //     }
            // } else {
            //     if (!this.isAbroadPhone() || !this.phone) {
            //         this.codeType = true;
            //         return Message({
            //             message: "Please input the correct mobile phone number",
            //             type: "error",
            //             duration: 3 * 1000
            //         });
            //     }
            // }
            if( !this.isEmail()){
                this.codeType = true;
                return Message({
                    message: "请输入正确邮箱",
                    type: "error",
                    duration: 3 * 1000
                });
            }
            let data = {
              email: this.email,
              password: this.password
            }
            this.loading = true
            localLogin(data).then( res=> {
              this.loading = false
              setCookie("yueToken", res.data.token, 7);
              this.setUserInfo(res.data);
            //   console.log(this.$store.state.user.userInfo)
              window.location.reload();
            }).catch( err => {
                this.loading = false
            })
            // location.replace(this.vueMoguWebUrl + '/#/?token=169a9b3050fab5dc763375f5637740ee')
            // localLogin(params).then(response => {
            //   if (response.code == this.$ECode.SUCCESS) {
            //     // 跳转到首页
            //     location.replace(this.vueMoguWebUrl + '/#/?token=' + response.data)
            //     window.location.reload()
            //   } else {
            //     this.$message({
            //       type: 'error',
            //       message: response.data
            //     })
            //   }
            // })
        },
        closeLogin: function() {
            this.$emit("closeLoginBox", "");
        },
        goto(url){
            const newHref = this.$router.resolve({path: '/'+url})
            // console.log(newHref)
            window.open(newHref.href,'_blank')
        }
    }
};
</script>

<style>
.box {
    width: 520px;
    /* height: 482px; */
    background: white;
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1210; /* 要比遮罩层大 */
    border-radius: 8px;
}

.registerBox {
    height: 660px;
}
.login_img{
    width: 240px;
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 38px;
}
.box .title {
    /* height: 48px; */
    font-weight: bold;
    text-align: center;
    line-height: 48px;
    
}
.login_title{
    font-size: 20px;
    font-weight: 700;
    color: #111111;
    display: block;
    width: 310px;
    margin: 0 auto;
    margin-top: 70px;
    margin-bottom: 30px;
}
.login_title2{
    margin-top: 10px;
}
.mgb{
    margin-bottom: 46px;
}
.box .t2 {
    font-size: 16px;
    font-weight: bold;
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
    color: #333;
}
.box .title .t1 {
    font-size: 18px;
    margin-top: 60px;
    display: block;
    color: #333333;
}
.box .title .t3 {
    margin-top: 20px;
}

.remarksBox {
    position: fixed;
    left: 50%;
    margin-left: -100px;
    top: 50%;
    margin-top: -50px;
    border: 1px solid red;
    width: 200px;
    height: 100px;
    text-align: center;
    z-index: 1210; /* 要比遮罩层大 */
}

/* 遮罩层 */
.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1200;
}
.loginBox .el-select .el-input.is-focus .el-input__inner,
.loginBox .option .el-input__inner {
    padding: 0;
    background-color: #333333;
    line-height: 46px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border: 0;
}
</style>
<style lang="less" >
.login_left{
    height: 100%;
    width: 50%;
    background: #f8f8f8;
    float: left;
    img{
        width: 100%;
        height: auto;
    }
}
.login_right{
    height: 100%;
    width: 50%;
    /* background: red; */
    float: right;
}
.loginBox {
    
    .input {
        width: 310px;
        height: 46px;
        border-radius: 4px;
        border: 2px solid #333333;
        margin: 0 auto;
        margin-bottom: 20px;
    }
    .span_input{
        overflow: hidden;
        width: 310px;
        height: 26px;
        border-radius: 4px;
        margin: 0 auto;
        .col_blu{
            cursor: pointer;
            color: #37A9A5;
            font-size: 13px;
        }
    }
    .submit_btn {
        width: 310px;
        // height: 40px;
        height: 50px;
        border-radius: 4px;
        margin: 0 auto;
        background-color: #333333;
        cursor: pointer;
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        // box-shadow: 0 0 10px rgba(67, 128, 254, 0.59);
        // margin-top: 10px;
        // margin-top: 150px;
        img{
            width: 40px;
            height: 40px;
            float: left;
            margin-top: 5px;
            margin-left: 10px;
        }
    }
    .option {
        width: 70px;
        height: 46px;
        background-color: #333333;
        line-height: 46px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        position: relative;
        top: -6px;
        left: 6px;
        border-radius: 4px 0 0 4px;
    }
    .el-input__suffix {
        display: none;
    }
    .phone_input {
        width: 200px;
        line-height: 46px;
        margin-left: 2px;
        border: none;
        .el-input__inner {
            border: none;
        }
    }
    .label_input {
        width: 160px;
        line-height: 46px;
        margin-left: 10px;
        border: none;
        .el-input__inner {
            border: none;
            padding: 0;
            padding-left: 10px;
        }
    }
    .label,
    .label_input,
    .label_btn {
        line-height: 46px;
        color: #333333;
        font-size: 14px;
    }
    .label {
        margin-left: 30px;
        line-height: 26px;
    }
    .label_btn {
        width: 70px;
        float: right;
        margin-right: 10px;
        text-align: center;
        cursor: pointer;
        color: #37A9A5;
    }
    .agreement{
        color: #AEAEAE;
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
    }
    .col_b{
        color: #333333;
    }
}
.walletIcon{
    width: 80px;
    height: 80px;
    margin-top: 80px;
    margin-bottom: 80px;
    margin-left: 140px;
}
</style>