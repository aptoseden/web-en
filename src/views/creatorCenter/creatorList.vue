<template>
   <div class="creatorList" v-loading.lock="loading">
       <div class="top_info">
           <img src="../../../static/images/creator/warn.png" alt="" class="warn_img fl">
           <p class="info fr">亲爱的悦财经作者：为了提高您的文章通过率，自2021年1月1日起，在悦财经投稿的所有文章均不能包含任何形式的外链及联系方式（包括但不限于：交易所链接、项目链接、二维码、微信公众号、微信号等）。</p>
       </div>
       <div style="width:600px" class=" fl">
            <p class="tips">如遇到发布问题(包括但不限于长时间审核中，审核未通过),请联系悦财经客服:</p>
            <p class="tips">客服:陆壹 微信号:yuecaijing555,客服:伍壹 微信号:ycjlh666,客服:千千 微信号:GDD170909</p>
       </div>
       <div class="item fr" v-show="accountOptions.length > 1">
          <el-select v-model="userId" placeholder="请选择" class="optionsClass" @change="getList(1)">
            <el-option
              v-for="item in accountOptions"
              :key="item.user_id"
              :label="item.username"
              :value="item.user_id">
            </el-option>
          </el-select>
        </div>
        <Empty style="margin-top:200px" class="clear" v-if="false"></Empty>
        <div style="height:20px" class="clear"></div>
        <div class="list_content">
            <div class="list_item" v-for="(item,index) in tableData" :key="index">
                <el-image :src="item.titlepic" lazy class="list_pic fl"></el-image>
                <div class="list_body fl">
                    <p class="list_tit">{{item.title}}</p>
                    <div class="list_mid">
                        <p>{{item.brief}}</p>
                    </div>
                    <p class="list_time fl">{{item.time}}</p>
                    <p class="list_type fl" v-if="item.isopen == 1">发布成功</p>
                    <p class="list_type red fl" v-if="item.isopen == 2">审核中</p>
                    <p class="list_type red fl" v-if="item.isopen == 3">发布失败</p>
                    <p class="list_err fl" v-if="item.isopen == 3">{{item.remake}}</p>
                </div>
                <div class="lsit_btn fr">
                    <a href="javacript:;" class="edit" @click="editUser(item)">编辑</a>
                    <a href="javacript:;" class="del" @click="delDepth(item)">删除此文</a>
                </div>
            </div>
        </div>
        <div class="clear"> </div>
        <el-pagination
            background
            @current-change="handlePageChange"
            layout="prev, pager, next"
            :total="total"
            :current-page="page"
            class="pag fr">
        </el-pagination>
        <div class="clear" style="height:60px"></div>
   </div>
</template>
<script> 
import { getDepthAccountList, getPostlist, postDel} from '@/api/creator'
export default {
    name: "creatorList",
    data() {
        return {
            userInfo: {},
            accountOptions:[],
            tableData:[],
            userId:'',//子账户id
            page:1,
            total:10,
            loading:false,
        };
    },
    mounted() {
        this.$nextTick(() => { 
            if(this.$store.state.user.userInfo.depth_admin_status == 0){
                this.getAccountList()
            }
            
        });
    },
    created() {},
    methods: {
        getAccountList(){
            getDepthAccountList().then( res => {
                // console.log(res)
                this.accountOptions = res.data.list
                if(this.accountOptions){
                    this.userId = this.accountOptions[0].user_id
                }
                this.getList(1)
            }).catch( err => {
                this.$message.error(err.response.data.msg);
            })
        },
        getList(page){
            this.loading = true;
            const data = {
                page: page,
                user_id: this.userId
            };
            getPostlist(data).then( res => {
                this.loading = false;
                // console.log(res)
                this.tableData = res.data.data;
                this.total = res.data.total;
            }).catch(() => {
                this.loading = false;
                this.$message.error('查询失败');
            });
        },
        delDepth(item){
            this.$confirm('是否要删除?')
                .then(_ => {
                    const data = {
                        depthId : item.id,
                    };
                    postDel(data).then(res => {
                        // if (res.success) {
                            this.$message.success('删除成功！');
                            this.getList(this.page);
                        // } else {
                        //     this.$message.error(res.errorMessage);
                        // }
                    }).catch(() => {
                        this.$message.error('删除失败！');
                    });
                })
                .catch(_ => {});
        },
        handlePageChange(val){
            // console.log(val)
            this.getList(val)
        },
        editUser(row){
            this.$router.push({path:'/creatorCenter/edit',query:{ id : row.id, imgpath : row.titlepic}})
        }
    }
};
</script>

<style scoped lang="less">
.creatorList{
    .top_info{
        overflow: hidden;
        margin-bottom: 20px;
    }
    .warn_img{
        width: 52px;
        height: 52px;
    }
    .info{
        width: 820px;
        font-size: 14px;
        color: #333333;
        line-height: 26px;
    }
    .tips{
        font-size: 12px;
        color: #999999;
        line-height: 24px;
    }
    .list_content{
        margin-bottom: 20px;
        width: 100%;
        overflow: hidden;
        border-top: 1px solid #E7E7E7;
        .list_item{
            overflow: hidden;
            border-bottom: 1px solid #E7E7E7;
            padding: 20px 0;
        }
        .list_pic{
            width: 200px;
            height: 128px;
            border-radius: 4px;
        }
        .list_body{
            width: 480px;
            margin-left: 20px;
            .list_tit{
                font-size: 16px;
                color: #333333;
                font-weight: bold;
            }
            .list_mid{
                margin-top: 15px;
                height: 75px;
                overflow: hidden;
                p{
                    font-size: 14px;
                    color: #333333;
                    line-height: 26px;
                    word-wrap:break-word;
                }
            }
            .list_time{
                color: #AEAEAE;
                font-size: 12px;
                margin-right: 40px;
            }
            .list_type{
                width: 60px;
                height: 20px;
                background-color: #333333;
                color: #ffffff;
                font-size: 12px;
                margin-right: 10px;
                text-align: center;
                line-height: 20px;
            }
            .red{
                background-color: #E66564;
            }
            .list_err{
                color: #E95957;
                font-size: 12px;
            }
        }
        .lsit_btn{
            a{
                font-size: 14px;
                color: #333333;
                margin-left: 30px;
            }
            .edit{
                color: #4380FE;
            }
        }
    }
    .pag{
        margin-top: 20px;
        /deep/ .active{
            background-color: #333333 !important;
        }
    }
}
</style>
