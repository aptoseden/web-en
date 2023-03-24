<template>
    <div>
        <Empty v-if="followList.length == 0"></Empty>
        <div class="follow">
            <div class="folow_item" v-for="item in followList" :key="item.id">
                <div class="item_top">
                    <img :src="item.userpic" alt="" class="head_pic fl">
                    <div class="item_tit fl">
                        <p @click="gotoUser(item)">{{item.username}}</p>
                        <span>{{item.topic_name}}</span>
                        <span>{{item.depth_count}}篇文章</span>
                    </div>
                    <div class="btn fr" v-show="ownType">已关注</div>
                    <div class="btn fr blue" v-show="!ownType" @click="gotoUser(item)">查看</div>
                </div>
            </div>
            <!-- <div class="folow_item" style="height:0;box-shadow:none">
            </div> -->
        </div>
        <div class="isMore" v-if="followList.length != 0">
            <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">加载更多</div>
            <div class="loadContent" v-if="!isEnd&&loading">加载中...</div>
            <span v-if="isEnd" class="isLoadEnd">我也是有底线的~</span>
        </div>
    </div>
</template>
<script>
import { getFollowList } from '@/api/userInfo'
export default {
    name: "follow",
    props:[
        'ownType',
        'userId'
    ],
    data() {
        return {
            select: "1",
            followList:[],
            currentPage: 1,
            totalPage:2,
            loading:false,
            isEnd:false
        };
    },
    mounted() {
        this.$nextTick(() => { 
            this.getList(this.userId,1)
        });
    },
    created() {},
    // 
    methods: {
        getList(id,page){
            let data 
            if(this.ownType){
                data = {
                    page:page
                }
            }else{
                data = {
                    page:page,
                    other_user_id: id
                }
            }
            this.loading = true
            getFollowList(data).then( res => {
               
                this.loading = false
                if(this.page == 1){
                     this.followList = res.data.list.list
                }else{
                    this.followList = [...this.followList,...res.data.list.list]
                }
                
                this.totalPage = res.data.list.totalPage
                if( this.currentPage == this.totalPage){
                    this.isEnd = true
                }
            })
        },
        loadContent () {
            this.currentPage++
            this.getList(this.userId,this.currentPage)
        },
        // gotoDetails(item){
        //     this.$router.push({path:'/depthDetails',query:{ id : item.id,userId: item.user_id}})
        // },
        gotoUser(item){
            this.$router.push({ path: "/personalCenter",query:{ userId: item.id} });
            this.$router.go(0)
        }
    }
};
</script>

<style scoped lang="less">
.follow{
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content:space-between;
    padding: 10px;
    box-sizing: border-box;
    .folow_item{
        width: 416px;
        // height: 124px;
        background-color: #FFFFFF;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 30px;
        padding: 20px;
        box-sizing: border-box;
    }
    .item_top{
        .head_pic{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .item_tit{
            p{
                font-size: 16px;
                color: #2B2B2D;
                cursor: pointer;
            }
            span{
                color: #AEAEAE;
                font-size: 12px;
                margin-right: 30px;
            }
        }
        .btn{
            width: 60px;
            height: 26px;
            border-radius: 4px;
            font-size: 12px;
            background-color: #FAFAFA;
            color: #666666;
            text-align: center;
            line-height: 26px;
            margin-top: 20px;
        }
        .blue{
            background-color: #4380FE;
            color: #ffffff;
            cursor: pointer;
        }
    }
}
.isMore{
    width: 880px;
    margin: 30px auto;
    height: 36px;
    cursor: pointer;
    .loadContent{
        background-color: #FAFAFA;
        font-size: 14px;
        color: #333333;
        text-align: center;
        line-height: 36px;
    }
    .isLoadEnd{
        font-size: 14px;
        color: #AEAEAE;
        text-align: center;
        line-height: 36px;
        display: block;
        width: 100%;
    }
}
</style>
