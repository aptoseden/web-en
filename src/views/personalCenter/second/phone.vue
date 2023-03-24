<template>
   <div class="phone">
       <div class="item" v-show="changeType == 1">
           <p class="tit fl">手机号</p>
           <a href="javascript:;" class="btn fr" @click="showDialog = true">更改</a>
           <p class="tit fr">{{userInfo.phone | phoneFilter}}</p>
       </div>
       <div class="newItem" v-show="changeType == 2">
           <p class="new_tit">绑定新手机</p>
           <div class="phone_input">
               <el-input v-model.trim="newPhone" placeholder="请输入手机号" class="label_input" style="width:260px"></el-input>
           </div>
           <p class="new_tit">短信验证码</p>
           <div class="phone_input">
               <el-input v-model.trim="newCode" placeholder="请输入验证码" class="label_input"></el-input>
               <div class="label_btn" v-show="newCodeType" @click="getNewCode">获取验证码</div>
                <div class="label_btn" v-show="!newCodeType">{{ newCountDown }}</div>
           </div>
           <div class="submit_new_btn" @click="editPhone">确认</div>
       </div>
       <el-dialog
        title=""
        :visible.sync="showDialog"
        width="500px"
        >
        <p class="dialog_tit">请验证您的手机号</p> 
        <p class="dialog_phone">{{userInfo.phone | phoneFilter}}</p>
        <div class="input">
            <span class="label">验证码:</span>
            <el-input v-model.trim="code" placeholder="请输入验证码" class="label_input"></el-input>
            <div class="label_btn" v-show="codeType" @click="getCode">获取验证码</div>
            <div class="label_btn" v-show="!codeType">{{ countDown }}</div>
        </div>
        <div class="submit_btn" @click="sendCode">验证</div>
       </el-dialog>
   </div>
</template>
<script>
import { checkSandCode, checkoutPhone, editUserPhoneCode, editUserPhone } from '@/api/userInfo'
import { Message } from "element-ui";
export default {
    name: "phone",
    filters: {
        phoneFilter(phone) {
            if(phone){
                let a = phone.slice(0,3)
                let b = phone.slice(7,11)
                return a+'****'+b;
            }else{
                return '****';
            }
            
        }
    },
    data() {
        return {
            userInfo: {},
            changeType: 1,
            showDialog: false,
            codeType: true,
            newCodeType:true,
            countDown: 60,
            newCountDown: 60,
            code: '',
            newPhone:'',
            newCode:''
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
        // 验证手机号码
        isPhone() {
            let mPattern = /^1[23456789]\d{9}$/;
            return mPattern.test(this.newPhone);
        },
        getCode() {
             
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
            checkSandCode({phone: this.userInfo.phone,overseas: 0}).then( res => {
                Message({
                    // message: res.data.code,
                    message: '发送成功',
                    type: "success",
                    duration: 3 * 1000
                });
            })
        },
        getNewCode() {
            if (!this.isPhone()) {
                this.newCodeType = true;
                return Message({
                    message: "请输入正确手机号",
                    type: "error",
                    duration: 3 * 1000
                });
            }
            this.newCodeType = false;
            let time = 60,
                _this = this;
            this.newCountDown = time + " s";
            let timeInterval = setInterval(function() {
                time--;
                _this.newCountDown = time + " s";
                if (time == 0) {
                    _this.newCodeType = true;
                    clearInterval(timeInterval);
                }
            }, 1000);
            editUserPhoneCode({phone: this.newPhone,overseas: 0}).then( res => {
                Message({
                    // message: res.data.code,
                    message: '发送成功',
                    type: "success",
                    duration: 3 * 1000
                });
            })
        },
        sendCode(){
            let data = {
                phone: this.userInfo.phone,
                edit_code: this.code
            }
            checkoutPhone(data).then( res => {
                if(res.data == true){
                    this.$message.success('验证成功')
                    this.changeType = 2
                    this.showDialog = false
                }else{
                    this.$message.error('验证失败')
                }
            })
        },
        editPhone(){
            if (!this.isPhone()) {
                return Message({
                    message: "请输入正确手机号",
                    type: "error",
                    duration: 3 * 1000
                });
            }
            let data = {
                old_phone: this.userInfo.phone,
                phone: this.newPhone,
                edit_code: this.newCode
            }
            editUserPhone(data).then( res => {
                if( res.errorCode){
                    return
                }
                this.$message.success('修改成功')
                 window.location.reload();
                    
            }).catch( err => {
                this.$message.error('修改失败')
            })
        }
    }
};
</script>

<style scoped lang="less">
.phone{
    margin:0 auto;
    margin-top: 50px;
    width: 420px;
    
}
.newItem{
    width: 330px;
    margin: 0 auto;
    margin-top: 40px;
    .phone_input{
        width: 330px;
        border-radius: 4px;
        border: 2px solid #333333;
    }
    .new_tit{
        font-size: 14px;
        color: #333333;
        margin-top: 30px;
        margin-bottom: 20px;
    }
}
.item{
    height: 60px;
    .tit{
        font-size: 14px;
        color: #333333;
        line-height: 60px;
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
        margin-left: 20px;
    }
}
.input {
    width: 330px;
    height: 46px;
    border-radius: 4px;
    border: 2px solid #333333;
    margin: 0 auto;
    margin-bottom: 20px;
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
    margin-left: 16px;
}
.label_btn {
    width: 70px;
    float: right;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
}
.submit_btn {
    width: 330px;
    height: 40px;
    border-radius: 4px;
    margin: 0 auto;
    background-color: #000000;
    cursor: pointer;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    margin-top: 40px;
}
.submit_new_btn{
    width: 220px;
    height: 40px;
    border-radius: 4px;
    margin: 0 auto;
    background-color: #000000;
    cursor: pointer;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    margin-top: 200px;
    margin-bottom: 40px;
}
.dialog_tit{
    text-align: center;
    font-size: 18px;
    color: #333333;
    font-weight: bold;
}
.dialog_phone{
    text-align: center;
    font-size: 20px;
    color: #333333;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
}
/deep/.el-input__inner{
    border: none !important;
}
</style>
