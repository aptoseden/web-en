<template>
   <div class="creat" v-loading.lock="loading">
      <el-input
        placeholder="请输入标题"
        v-model.trim="title"
        class="title_input"
        clearable>
      </el-input>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入简介(推送和分享时显示)"
        class="brief_input"
        v-model="brief">
      </el-input>
      <div ref="editorElem" style="text-align:left;background-color: #FAFAFA !importamt;" id="editorElem"></div>
      <p class="label mt30">文章封面</p>
      <el-upload
        :action="action"
        list-type="picture-card"
        :file-list="fileList2"
        :headers="headers"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisiblImg">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <!-- 剪裁组件弹窗 -->
        <el-dialog style="z-index:2000" :visible.sync="cropperModel" width="1100px" :before-close="beforeClose" append-to-body :close-on-click-modal="false">
            <Cropper :img-file="fileurl" :skuname="skufilekey" ref="vueCropper" v-on:upload="uploadproductimg">
            </Cropper>
        </el-dialog>
        <!-- 专题目录 -->
      <p class="label mt30">专题目录</p>
      <el-select v-model="postspecial" multiple :multiple-limit='3' placeholder="请选择文章所属专题（最多可同时选择三个)" class="optionsClass">
        <el-option
            v-for="item in selectOptions"
            :key="item.id"
            :label="item.title"
            :value="item.id">
        </el-option>
      </el-select>
      <div v-show="accountOptions.length > 1">
          <p class="label mt30">子账号选择</p>
          <el-select v-model="userId" placeholder="请选择" class="optionsClass" >
            <el-option
                v-for="item in accountOptions"
                :key="item.user_id"
                :label="item.username"
                :value="item.user_id">
            </el-option>
          </el-select>
      </div>
      <div class="submit_btn" @click="submit">确认发布</div>
      <div style="height:60px" class="clear"></div>
   </div>
</template>
<script>
import E from "wangeditor";
import Cropper from './cropper';
import {  getCookie } from "@/utils/cookieUtils";
import axios from "axios";
import { getDepthAccountList, getSpecialList, createArticle } from '@/api/creator'
export default {
    name: "creat",
    components: {
        Cropper,
    },
    data() {
        return {
            loading: false,
            title:'',
            brief:'',
            editor: null,//编译器
            headers:{
                token: getCookie("yueToken")
            },
            //上传图片相关
            // action:'admin/image/uploadmore', 
            action:'/api/v1/image/uploadmore',
            imgId:'',
            file:'',
            fileurl:'',
            fileList2:[],
            dialogVisiblImg:false,
            dialogImageUrl:'',
            skufilekey:'',
            cropperModel:false,
            editorContent:'',
            //专题筛选框
            selectOptions:[],
            postspecial:[],
            //子账户
            accountOptions:[],//子账户
            userId: this.$store.state.user.userInfo.id,//子账户id
        };
    },
    mounted(){
        this.editor = new E(this.$refs.editorElem);
        // 设置编辑区域高度为 600px
        this.editor.config.height = 600
        this.editor.config.zIndex = 200
        this.editor.config.border = 'none'
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.config.onchange = html => {
        this.editorContent = html;
        };
        this.editor.config.uploadImgServer = '/api/v1/image/uploadmore'
        this.editor.config.uploadFileName = 'file'
        // this.editor.config.uploadImgShowBase64 = true;
        this.editor.config.uploadImgHeaders = this.headers
        this.editor.config.uploadImgHooks = {
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.data.list.url
                insertImg(url)
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }
        this.editor.create(); 
        this.getSpecial()
        this.getAccountList()
    },
    created() {},
    // 
    methods: {
        getAccountList(){
            getDepthAccountList().then( res => {
                // console.log(res)
                this.accountOptions = res.data.list
                // if(this.accountOptions){
                //     this.userId = this.accountOptions[0].user_id
                // }
                // this.getList(1)
            }).catch( err => {
                this.$message.error(err.response.data.msg);
            })
        },
        getSpecial(){
            getSpecialList().then( res => {
                // console.log(res)
                this.selectOptions = res.data.detail
            }).catch( err => {
                this.$message.error(err.response.data.msg);
            })
        },
        fabuType(){
            if(this.brief == ''){
                this.$message.error('请输入简介')
                return false
            }
            if(this.title == ''){
                this.$message.error('请输入标题')
                return false
            }
            if(this.imgId == ''){
                this.$message.error('请上传首页图片')
                return false
            }
            // if(this.postspecial.length < 1){
            //     this.$message.error('请选择')
            //     return false
            // }
            if(this.editorContent == ''){
                this.$message.error('请输入内容')
                return false
            }
        
            return true
        },
        submit(){
            if(!this.fabuType()){
                return
            }
            this.loading = true
            // console.log(this.editorContent)
            // return
            let data = {
                title : this.title,
                imglist : this.imgId, 
                // imglist : 6286,
                text :  this.editorContent,
                brief : this.brief,
                post_special_id: this.postspecial.join(','),
                user_id: this.userId
            }
            createArticle(data).then( res => {
                this.loading = false
                if(res.errorCode){
                    return
                }else{
                    this.$message.success('发布成功！');
                    this.$router.push({path:'/creatorCenter'})
                }
                
            }).catch( err => {
            
                this.loading = false
                this.$message.error(err.response.data.msg);
            })
        },
        beforeClose () {
            //判断是否点击的商品图片打开的裁剪框
            if (this.skufilekey == ''){
                //点击关闭刷新商品图片展示
                this.fileList2.push(this.file);
                this.fileList2.pop();
            }
            this.cropperModel = false;
        },
        uploadproductimg (data, key) {
            let formData = new FormData();
            let _this = this
            // console.log(data)
            formData.append('file', data, this.file.name);
            if (typeof (key) == "undefined" || key == '') {
                axios.post(this.action, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'token': getCookie("yueToken")
                            }
                }).then(res => {
                // console.log(11111)
                //   this.$message.error(res.msg)
                let currentPic = res.data.data.list.url;
                //   this.form.img = currentPic;
                //   this.form.imgs.push(currentPic);
                this.fileList2.push({
                    url: currentPic,
                    name: '预览图'
                });
                this.$refs.vueCropper.isDisabled = false;
                this.cropperModel = false;
                this.imgId = res.data.data.list.id
                }).catch( err => {
                    this.$refs.vueCropper.isDisabled = false;
                    this.$message.error(err.msg)
                })
            } else {
                // addimg(formData).then(res => {
                //   this.skuimg[key] = res.url;
                //   // 刷新图片
                //   this.isshowskuimg = false;
                //   this.isshowskuimg = true;
                  this.$refs.vueCropper.isDisabled = false;
                //   this.cropperModel = false;
                // })
            }

        },
        //上传图片
        handleRemove(file, fileList) {
            let _index = 0
            fileList.forEach( (item ,index) => {
                if(item.uid == file.uid){
                    _index = index
                }
            });
            this.fileList2.splice(_index , 1)
        },
        uploadSuccess( res, file, fileList){
            // console.log(res)
            this.file = file;
            this.fileurl = file.url;
            this.skufilekey = '';
            this.cropperModel = true;
            // this.imgId = res.data.list.id
        },
        uploadError(err, file, fileList){
        // console.log(JSON.parse(err.message))
        let data = JSON.parse(err.message)
        this.$message.error(data.msg);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisiblImg = true;
        },
        beforeUpload(file){
            // console.log(file)
        },
    }
};
</script>

<style scoped lang="less">
.creat{
    .title_input{
        width: 100%;
        height: 60px;
        line-height: 60px;
        margin-bottom: 30px;
        /deep/.el-input__inner{
            background-color: #FAFAFA;
            border: none;
            height: 60px;
            line-height: 60px;
            font-size: 16px;
        }
    }
    .brief_input{
        width: 100%;
        margin-bottom: 30px;
        /deep/.el-textarea__inner{
            background-color: #FAFAFA;
            border: none;
            font-size: 14px;
        }
    }
    #editorElem{
        /deep/.w-e-toolbar,/deep/.w-e-text-container{
            background: #FAFAFA !important;
            border:none !important;
        }
    }
    .label{
        color: #333333;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .mt30{
        margin-top: 30px;
    }
    /deep/.el-upload--picture-card{
        background: #FAFAFA !important;
        // width: 120px;
        // height: 120px;
    }
    .optionsClass{
        width: 100%;
        /deep/.el-input__inner{
            background-color: #FAFAFA;
            border: none;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
        }
    }
    .submit_btn{
        width: 220px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #333333;
        color: #ffffff;
        border-radius: 4px;
        margin:  0 auto;
        margin-top: 80px;
        cursor: pointer;
    }
}
</style>
