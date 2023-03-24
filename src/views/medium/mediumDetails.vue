<template>
    <article class="medium_article">
        <div class="top_info">
            <p class="fl">{{ desInfo.title_en }}</p>
            <p class="fr">Participant: <span>{{desInfo.kb_count}}</span></p>
        </div>
        <div class="body_left">
            <div class="top_head new_head">
                <div class="reac_type">
                    <ul class="new_ul">
                        <li :class="[select_type == '0' ? 'activeType' : '']" @click="changeSelect(0)">
                            Problem Description
                            <span class="race_line"></span>
                        </li>
                        <li :class="[select_type == '1' ? 'activeType' : '']" @click="changeSelect(1)">
                            Answer
                            <span class="race_line"></span>
                        </li>
                        <!-- <li :class="[select_type == '2' ? 'activeType' : '']" @click="changeSelect(2)">
                            <span class="race_line"></span>
                        </li> -->
                        <img class="edenAi" src="../../../static/images/medium/edenAI.png" alt=""  @click="changeSelect(2)">
                    </ul>
                </div>
            </div>
            <div v-if="select_type == 0">
                <p class="tit">Questioner</p>
                <p class="user_info"><img :src="desInfo.userpic" alt=""> {{desInfo.username ? desInfo.username : '' | nameFilter}}</p> 
                <p class="tit">Describe</p>
                <p class="des">{{ desInfo.content_en }}</p>
            </div>
            <div v-show="select_type == 1">
                <el-scrollbar style="height:500px">
                    <div class="answer_input">
                        <el-input
                        type="textarea"
                        :rows="8"
                        resize="none"
                        placeholder="Please fill in the content"
                        v-model="content">
                        </el-input>
                        <div class="answer_btn" @click="answer">Reply</div>
                    </div>
                    <div class="item_list" v-for="item in desList" :key="item">
                        <p class="user_info"><img :src="item.userpic" alt=""> {{item.username ? item.username : ''  | nameFilter}} <span>{{ item.create_time }}</span></p>
                        <p class="des">{{ item.content }}</p>
                    </div>
                </el-scrollbar>
            </div>
            <div v-show="select_type == 2" v-loading="loadingFirst">
                <el-scrollbar style="height:500px">
                    <div class="item_list" v-if="aiAnswer != null">
                        <p class="user_info"><img :src="aiAnswer.userpic" alt=""> {{ aiAnswer.username ? aiAnswer.username : '' | nameFilter }} <span>{{ aiAnswer.create_time }}</span></p>
                        <p class="des">{{ aiAnswer.content }}</p>
                    </div>
                    <p v-if="aiAnswer == null" class="empty_p">The problem cannot be solved using Eden Ai</p>
                </el-scrollbar>
            </div>
        </div>
        <div class="body_right">
            <el-scrollbar style="height:500px">
                <div class="content">{{ desInfo.code_snippet }}</div> 
            </el-scrollbar>
        </div>
    </article>
</template>

<script>

import { getKnowledgeDetail, getAnswerDetail, createAnswer, getAiList,
        postQuestion, upErrorAi} from '@/api/medium'
export default {
    filters: {
        nameFilter(name) {
            if(name.length > 10){
                let a = name.slice(0,3)
                let b = name.slice(7,10)
                return a+'****'+b;
            }else{
                return name;
            }
            
        }
    },
    data () {
        return {
        select_type: 0,
        isEnd:false,//是否到底
        loading:false,//加载中
        loadingFirst: false,
        desInfo: {},
        aiAnswer: {},
        desList:[],
        k_id: 0,
        sort: 1,
        content:'',
        }
    },
    components: {
        // 注册组件
    },
    mounted () { 
        this.k_id = this.$route.query.id
        this.getInfo( this.k_id )
        this.getAnswerList( this.k_id )
    },
    created () {
    //   this.getList(1)
    },
    methods: {
        changeSelect( num ){
            if( this.select_type != num ){
                this.select_type = num
                if(this.isLogin == false){
                    return
                }
                // this.isEnd = false
                if( num == 0){
                }
                if( num == 1){
                }
                if( num == 2){
                    this.getAiList()
                    // this.postQuestion()
                }
            }
        },
        answer(){
            let data = {
                k_id: this.k_id,
                content: this.content
            }
            createAnswer(data).then( res => {
                this.getAnswerList( this.k_id )
            })
        },
        loadContent () {
            this.currentPage++
            this.getList(this.currentPage)
        },
        getInfo(id){
            let data = {
                k_id: id
            }
            getKnowledgeDetail(data).then( res => {
                this.desInfo = res.data
                // console.log( this.desInfo )
            })
        },
        getAnswerList(id){
            let data = {
                k_id: id
            }
            getAnswerDetail(data).then( res => {
                this.desList = res.data
                // console.log( this.desList )
            })
        },
        //ai助手
        getAiList(){
            let data = {
                kb_id: this.k_id
            }
            getAiList(data).then( res => {
                // console.log(res)
                this.aiAnswer = res.data
                if( this.aiAnswer == null && this.desInfo.ai_status == 0){
                    this.postQuestion()
                }
            })
        },
        postQuestion(){
            let data = {
                title: this.desInfo.title_en,
                description: this.desInfo.content_en,
                code: this.desInfo.code_snippet,
                kb_id: this.k_id
            }
            this.loadingFirst = true
            postQuestion(data).then( res => {
                console.log(res)
                this.loadingFirst = false
                this.getAiList()
            }).catch( err => {
                this.loadingFirst = false
                if(err.response.data.errorCode == 40000)
                upErrorAi(data).then( res => {
                    console.log(res)
                })
            })
        },
    }
}
</script>

<style lang="less" scoped>
.medium_article{
    background: #1C1D20;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-top: 100px;
    padding: 30px;
    box-sizing: border-box;
}
.top_info{
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    p:first-child{
        color: #FFFFFF;
        font-size: 16px;
    }
    p:last-child{
        color: #6E767E;
        font-size: 14px;
        span{
            color: #1DE4B3;
        }
    }
}
.item_list{
    margin-bottom: 20px;
    .user_info{
        margin-bottom: 20px;
    }
}
.edenAi{
    width: 170px;
    height: auto;
    position: absolute;
    left: 220px;
    top: -10px;
    cursor: pointer;
}
.body_left{
    width: 40%;
    float: left;
    .user_info{
        height: 33px;
        line-height: 33px;
        color: #FFFFFF;
        font-size: 14px;
        img{
            height: 32px;
            width: 32px;
            border-radius: 50%;
            margin-right: 10px;
            float: left;
        }
        span{
            margin-left: 10px;
            color: #6E767E;
            font-size: 10px;
        }
        
    }
    .tit{
        color: #FFFFFF;
        font-size: 16px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .des{
        color: #FFFFFF;
        font-size: 14px;
    }
    /deep/.el-textarea__inner{
        background-color: #232529;
        border: none;
        color: #FFFFFF;
    }
    .answer_input{
        padding: 10px;
        width: 100%;
        background-color: #232529;
        box-sizing: border-box;
        margin-bottom: 20px;
        margin-top: 10px;
        border-radius: 10px;
        overflow: hidden;
    }
    .answer_btn{
        width: 70px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        color: #FFFFFF;
        background: #1C1D20;
        cursor: pointer;
        float: right;
        margin-top: 10px;
        border-radius: 5px;
    }
}
.top_head{
    position: static;
    padding: 0;
    min-width: 10px;
    .reac_type{
        width: 100%;
        padding: 0;
    }
}
.new_head{
    height: 50px;
    background: #1C1D20;
    .reac_type{
        background: #1C1D20;
        li{
            margin-left: 0 !important;
            margin-right: 30px !important;
        }
    }
    .race_line{
        height: 2px !important;
        background: #1DE4B3 !important;
    }
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.body_right{
    width: 59%;
    float: right;
    height: 100%;
    background: #151616;
    border-radius: 10px;
    min-height: 450px;
    padding: 40px;
    box-sizing: border-box;
    .content{
        color: #1DE4B3;
        white-space: pre-wrap;
        word-break: break-all;
        width: 100%;
        line-height: 30px;
    }
}
/deep/.el-loading-mask{
    background-color: rgba(0,0,0,.8) !important;
}
.empty_p{
    margin-top: 20px;
}
</style>
  