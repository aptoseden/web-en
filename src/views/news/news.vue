<template>
    <article>
        <div class="container" v-loading="loadingFirst">
            <div class="tittle">7×24快讯</div>
            <div class="article">
                <div class="block">
                    <div v-for="item in itemByDate" :key="item.uid" class="items">
                        <p class="time">{{item.share_time}}</p>
                        <h2 class="itemTitle">{{item.title}}</h2>
                        <p class="blogtext" v-html="item.content">{{item.content}}</p>
                    </div>
                </div>
            </div>
            <div class="isMore">
                <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">加载更多</div>
                <div class="loadContent" v-if="!isEnd&&loading">加载中...</div>
                <span v-if="isEnd" class="isLoadEnd">我也是有底线的~</span>
            </div>
        </div>
    </article>
</template>

<script>
import { getNews } from "@/api/news";
export default {
    data() {
        return {
            itemByDate: [],
            count: 0,
            currentPage: 1,
            pageSize: 10,
            totalPage:2,
            isEnd: false, //是否到底
            loading: false, //加载中,
            loadingFirst:true
        };
    },
    components: {
        // 注册组件
    },
    mounted() {},
    created() {
        this.getNewsList(this.currentPage);
    },
    methods: {
        getNewsList(page) {
            this.loading = true
            getNews(page).then( res => {
                this.loading = false
                this.loadingFirst = false
                if(this.page == 1){
                    this.itemByDate = res.data.list.data
                }else{
                    this.itemByDate = [...this.itemByDate,...res.data.list.data]
                }
                
                this.totalPage = res.data.list.totalPage
                if( this.currentPage == this.totalPage){
                    this.isEnd = true
                }
            })
        },
        loadContent () {
          this.currentPage++
          this.getNewsList(this.currentPage)
        },
    }
};
</script>

<style lang="less" scoped>
.isMore {
    width: 1000px;
    margin: 30px auto;
    height: 36px;
    cursor: pointer;
    .loadContent {
        background-color: #fafafa;
        font-size: 14px;
        color: #333333;
        text-align: center;
        line-height: 36px;
    }
    .isLoadEnd {
        font-size: 14px;
        color: #aeaeae;
        text-align: center;
        line-height: 36px;
    }
}
.tittle {
    margin-top: 40px;
    width: 100%;
    height: 80px;
    background-color: #fafafa;
    color: #333333;
    font-size: 18px;
    line-height: 80px;
    text-align: center;
}
.block {
    width: 1000px;
    margin: 0 auto;
    .items {
        border-bottom: 1px solid #e7e7e7;
        padding: 20px 0;
    }
    .itemTitle {
        font-size: 16px;
        color: #333333;
        // line-height: 54px;
        margin: 15px 0;
    }
    .blogtext {
        color: #666666;
        font-size: 14px;
        line-height: 24px;
    }
    .time {
        color: #aeaeae;
        font-size: 14px;
    }
}
</style>
