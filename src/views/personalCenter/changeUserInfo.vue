<template>
   <article>
       <div class="title">
           <a href="javascript:;" class="btn " :class="btn_select == 1 ? 'btn_select' : ''" @click="changeBtn(1)">修改个人基本资料
               <div class="select_line" v-show="btn_select == 1"></div>
           </a>
           <a href="javascript:;" class="btn" :class="btn_select == 2 ? 'btn_select' : ''" @click="changeBtn(2)">修改账号基本资料
               <div class="select_line" v-show="btn_select == 2"></div>
           </a>
       </div>
       <userInfo v-if="btn_select == 1"></userInfo>
       <phone v-if="btn_select == 2"></phone>
   </article>
</template>
<script>
import { getFollowList } from '@/api/userInfo'
import phone from './second/phone'
import userInfo from './second/userInfo'
export default {
    name: "follow",
    components:{
        phone,
        userInfo
    },
    data() {
        return {
            btn_select: "1",
            userInfo: {},
            currentPage: 1,
            totalPage:2,
            loading:false,
            isEnd:false
        };
    },
    mounted() {
        this.$nextTick(() => { 
            // this.getList(this.userId,1)
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
        changeBtn(item){
            this.btn_select = item
        },
    }
};
</script>

<style scoped lang="less">
.title{
    width: 100%;
    height: 80px;
    background-color: #FAFAFA;
    border-radius: 6px;
    text-align: center;
    margin-top: 40px;
    .btn{
        display: inline-block;
        color: #AEAEAE;
        line-height: 80px;
        font-size: 16px;
        position: relative;
        margin-right: 30px;
    }
    .btn_select{
        color: #333333;
        font-size: 18px;
    }
    .select_line{
        width: 80px;
        border-bottom: 3px solid #333333;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
    }
}
</style>
