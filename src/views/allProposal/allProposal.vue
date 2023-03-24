<template>
    <article>
        <div class="top_head">
            <div class="reac_type">
                <ul>
                    <li :class="[select_type == '0' ? 'activeType' : '']" @click="changeSelect(0)">
                        活跃提案
                        <span class="race_line"></span>
                        <span class="race_num">65</span>
                    </li>
                    <li :class="[select_type == '1' ? 'activeType' : '']" @click="changeSelect(1)">
                        待开始提案
                        <span class="race_line"></span>
                        <span class="race_num">65</span>
                    </li>
                    <li :class="[select_type == '2' ? 'activeType' : '']" @click="changeSelect(2)">
                        已结束提案
                        <span class="race_line"></span>
                        <span class="race_num">65</span>
                    </li>
                </ul>
                <p class="search_type">
                    <el-input class="search_input" prefix-icon="el-icon-search" v-model="input" placeholder="请输入"></el-input>
                </p>
            </div>
        </div>
        <div class="proposal_center">
            <div class="proposal_left">
                <div class="ordinary_posal" v-for="o in 8" :key="o">
                    <div class="pro_msg">
                        <div>
                            <p>
                                <img src="../../assets/logo.png" alt="">
                            </p>
                            <p class="pro_name">asdasd</p>
                            <el-button round class="track_btn col_new">提案内容</el-button>
                            <el-button round class="track_btn">查看来源</el-button>
                        </div>
                    </div>
                    <div class="proposal_msg">
                        <div class="data_box">
                            <div class="posal_date">已结束</div>
                        </div>
                        <p class="posal_title"> SCCP-166：将L2 交易所费用降至25个基点 </p>
                        <div class="posal_time">
                            <p><span>开始日期:</span><span>2022-02-17 04:20:55</span></p>
                            <p><span>结束日期:</span><span class="col_red">2022-02-17 04:20:55</span></p>
                        </div>
                        <p>支持</p>
                        <el-progress percentage="20" color="#409eff"></el-progress>
                        <p>反对</p>
                        <el-progress percentage="20" color="#f56c6c"></el-progress>
                    </div>
                </div>
            </div>
            <el-card class="pro_right" style="margin-top:0">
                <div slot="header" class="clearfix">
                    <span>我的自选</span>
                    <el-button style="float: right; padding: 3px 0" type="text">添加自选</el-button>
                </div>
                <div class="list_box">
                    <div v-for="o in 84" :key="o" class="item">
                        <div class="name_box">
                            <img src="../../assets/logo.png" alt="">
                            ox
                            <span>zrx</span>
                        </div>
                        <div class="remove_btn">
                            <i class="el-icon-minus"></i>
                            移除
                        </div>
                    </div> 
                </div>
                
            </el-card>
        </div>
    </article>
</template>
<script>
import {getFollowList } from '@/api/follow'
export default {
  name: 'myFollow',
  components: {
    // 注册组件
  },
  data () {
    return {
      select_type: 0,
      input:'',
      followCoinList:[]
    }
  },
  mounted () {
    this.getList()
  },
  created () {
    
  },
  methods: {
    changeSelect( num ){
        this.select_type = num
    },
    getList(){
        getFollowList().then( res => {
            console.log(res)
            this.followCoinList = res.data
        })
    },
  }
}
</script>
<style lang="less">
.proposal_center{
    margin-top: 94px;
    min-height: 600px;
    height: auto;
    display: flex;
    width: 100%;
    .proposal_left{
        width: 500px;
        flex: 1 1 0%;
        .ordinary_posal{
            margin-bottom: 16px;
            background: #1b2447;
            border-radius: 4px;
            display: flex;
            color: #ffffff;
        }
        .pro_msg{
            box-sizing: border-box;
            width: 240px;
            padding: 24px 24px;
            background: #25345c;
            border-radius: 4px;
            p:first-child {
                text-align: center;
                margin-bottom: 8px;
                vertical-align: baseline;
                img{
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    margin: 0 auto;
                }
            }
            .pro_name{
                font-size: 13px;
                color: #fff;
                font-weight: 700;
                text-align: center;
                margin-bottom: 24px;
            }
            .track_btn{
                width: 100%;
                margin-bottom: 15px;
                margin-left: 0;
                background: #304270;
                border: none;
                color: #fff;
            }
            .col_new{
                background: linear-gradient(90deg,#8433ff,#7970fe);
            }
        }
        .proposal_msg{
            flex: 1;
            height: 100%;
            position: relative;
            padding: 24px;
            box-sizing: border-box;
            .data_box{
                display: flex;
                position: absolute;
                top: 24px;
                right: 24px;
                justify-content: flex-start;
                align-items: center;
                .posal_date{
                    height: 32px;
                    padding: 0 16px;
                    background: rgba(167,240,186,.1);
                    color: #a7f0ba;
                    display: flex;
                    align-items: center;
                    font-size: 13px;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
            }
            .posal_title{
                width: 75%;
                line-height: 23px;
                font-size: 17px;
                color: #fff;
                margin-bottom: 16px;
                display: flex;
            }
            .posal_time{
                width: 100%;
                display: flex;
                margin-bottom: 40px;
                p{
                    display: flex;
                    flex-direction: column;
                    margin-right: 40px;
                    span:first-child {
                        margin-bottom: 4px;
                        color: #a2a5b0;
                        font-size: 12px;
                    }
                    span:last-child {
                            font-size: 13px;
                            color: #a7f0ba;
                    }
                    .col_red{
                        color: #f66 !important;
                    }
                }
            }
            .el-progress__text{
                color: #ffffff;
            }
        }
    }
}
</style>
