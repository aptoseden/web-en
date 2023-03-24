<template>
    <article>
        <div class="top_head">
            <div class="reac_type">
                <p class="search_type">
                    <el-input class="search_input" prefix-icon="el-icon-search" v-model="key" placeholder="请输入关键字"></el-input>
                </p>
                <p class="search_type">
                    <el-select v-model="sort_by" clearable placeholder="请选择筛选项">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p class="search_type">
                    <el-select v-model="sort_order" clearable placeholder="请选择正序倒序">
                        <el-option
                        v-for="item in sort_order_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p class="search_btn1" @click="getProjectList()" >搜索</p>  
            </div>
        </div>
        <div class="data_box">
            <el-table
            :data="mediumList"
            style="width: 100%;padding:15px;background-color:#1b2447"
            cell-style="background-color:#1b2447;color:#dddfe6"
            header-row-style="background-color:#1b2447;color:#dddfe6;border:none">
                <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    min-width="50"
                />
                <!-- <el-table-column
                    prop="symbol"
                    label="项目名"
                    width="240">
                </el-table-column> -->
                <el-table-column
                    label="项目名"
                    min-width="200">
                    <template slot-scope="scope">
                        <a :href="scope.row.twitter_url" target="_blank" style="color:#dddfe6">
                            {{scope.row.symbol}}</a>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="created_at"
                    label="twitter创建时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="created_time"
                    label="系统监测时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="daytime"
                    label="创建后天数"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="followers_count"
                    label="关注人数"
                    width="100">
                </el-table-column>
                
                <el-table-column
                    prop="key"
                    label="项目类型"
                    width="120">
                </el-table-column>
                <!-- <el-table-column
                    label="twitter地址"
                    min-width="260">
                    <template slot-scope="scope">
                        <a :href="scope.row.twitter_url" target="_blank" style="color:#dddfe6">
                            {{scope.row.twitter_url}}</a>
                    </template>
                </el-table-column> -->
                <el-table-column
                    label="项目描述"
                    min-width="360">
                    <template slot-scope="scope">
                        {{scope.row.description}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="项目地址"
                    min-width="260">
                    <template slot-scope="scope">
                        <a :href="scope.row.description_url" target="_blank" style="color:#dddfe6">
                            {{scope.row.description_url}}</a>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    label="内容简介"
                    min-width="260">
                    <template slot-scope="scope">
                        {{scope.row.content_cn == '' ? scope.row.content_en : scope.row.content_cn}}
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="gotoInfo(scope.row)" type="text" size="small">查看原文</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getProjectList()" />
        </div>
    </article>
</template>
<script>
import Pagination from '@/components/Pagination';
import {  searchProject } from '@/api/newProject'
export default {
  name: 'myFollow',
  components: { Pagination, },
  data () {
    return {
      vLoading: false,
      mediumList:[],
      key:'',
      total: 10,
      listQuery: {
        page: 1,
        limit: 10
      },
      sort_by: '',//shaixuan 项
      sort_order:'',
      sort_order_options:[
        {
          value: 'asc',
          label: '升序'
        }, {
          value: 'desc',
          label: '降序'
        }
      ],
      newOptions:[{
          value: 'created_at',
          label: '创建时间'
      },{
          value: 'created_time',
          label: '发现时间'
      }],
      options: [{
          value: 'NFT',
          label: 'NFT'
        }, {
          value: 'DAO',
          label: 'DAO'
        }, {
          value: 'Airdrop',
          label: 'Airdrop'
        }, {
          value: 'DeFi',
          label: 'DeFi' 
        }, {
          value: 'GameFi',
          label: 'GameFi'
        }, {
          value: 'P2E',
          label: 'P2E'
        }, {
          value: 'Arbitrum',
          label: 'Arbitrum'
        }, {
          value: 'Layer2',
          label: 'Layer2'
        }, {
          value: 'Layer0',
          label: 'Layer0'
        }, {
          value: 'Starknet',
          label: 'Starknet'
        }, {
          value: 'ZK-rollup',
          label: 'ZK-rollup'
        }, {
          value: 'Optimism',
          label: 'Optimism'
        }],
        value: ''
    }
  },
  mounted () {
    this.getProjectList()
  },
  created () {
    
  },
  methods: {
    getProjectList(){
        let data = {
            key: this.key,
            page: this.listQuery.page,
            sort_by: this.sort_by,
            sort_order: this.sort_order
            // （desc/asc）
        }
        searchProject(data).then( res => {
            this.mediumList = res.data.data
            this.total = res.data.total
            console.log(res)
        })
    },
  }
}
</script>
<style lang="less" scoped>
.data_box{
    margin-top: 90px;
}
// 自选模块
/deep/.el-table th.el-table__cell{
    background-color:#1b2447;
    border: none !important;
}
/deep/.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
        // border-bottom: .0625rem solid #e3e3e3 !important;
        border: none !important;
}
/deep/.el-table table>tbody>tr>td, .table>tbody>tr>td {
    color: #dddfe6!important;
}
/deep/.el-table--border::after, .el-table--group::after, .el-table::before{
    height: 0;
}
/deep/.el-select .el-input{
    background: #25345c;
    border-radius: 14px;
}  
/deep/.el-input__inner{
    background: #25345c;
    color: #dddfe6;
    border: none;
    border: none;
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    color: #dddfe6;
}           
/deep/.el-input__icon{
    line-height: 28px;
}
.reac_type{
    display: block;
}
.search_type{
    float: left;
    margin-right: 50px !important;
}
.search_btn1{
    cursor: pointer;
    float: left;
    background: linear-gradient(90deg,#8433ff,#7970fe);
    width: 80px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    text-align: center;
    border-radius: 14px;
}
.type_row{
    margin-top: 94px;
    min-height: 600px;
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    box-sizing: border-box;
    .item{
        box-sizing: border-box;
        max-width: 33%;
        flex: 0 0 33%;
        position: relative;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
    }
    .track_tent{
        box-sizing: border-box;
        cursor: pointer;
        background: #1b2447;
        min-height: 345px;
        margin-bottom: 24px;
        border-radius: 4px;
        padding: 24px;
        overflow: hidden;
        .track_icon{
            width: 100%;
            height: 64px;
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
        }
        .track_logo{
            width: 64px;
            height: 64px;
            border-radius: 50%;
            padding: 2px;
            background: #fff;
            img{
                width: 100%;
                border-radius: 50%;
                height: 100%;
            }
        }
        .track_name{
            margin-top: 24px;
            font-size: 17px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 8px;
        }
        .track_race{
            display: flex;
            flex-wrap: wrap;
            span{
                padding: 0 4px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                background: rgba(167,240,186,.1);
                color: #a7f0ba;
                margin-right: 8px;
                border-radius: 4px;
            }
        }
        .num_box_parant{
            display: flex;
            height: 80px;
            width: 110%;
            margin-left: -5%;
            justify-content: space-between;
            align-items: center;
            margin-top: 24px;
            .num_box{
                width: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;
                p{
                    color: #ffffff;
                }
            }
        }
        .btn{
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            .track_btn{
                width: 48%;
                border: none;
            }
            .btn_bg{
                background: linear-gradient(to bottom left,#304270,#304270,#304270);
                color: #fff;
            }
        }
    }
}
.col_del{
    color: #F56C6C !important;
}
</style>