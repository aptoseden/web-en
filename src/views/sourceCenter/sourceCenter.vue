<template>
    <article>
        <div class="resource">
            <div class="tit_list">
                <a href="javascript:;" :class="[selected == '' ? 'selected' : '']" class="tit_item" @click="changeSelect({en_name:''})">全部</a>
                <a href="javascript:;" :class="[selected == item.en_name ? 'selected' : '']" class="tit_item" v-for="item in titleList" :key="item.name" @click="changeSelect(item)">{{item.name}}</a>
            </div>
            <div class="resource_item" v-for=" (item,index) in resourceList" :key="index">
                <el-image
                class="item_img"
                :src="item.view_url"
                fit="cover"
                :preview-src-list="getPrivewImages(index)"></el-image>
                <el-tooltip class="item" effect="dark" :content="item.title" placement="bottom">
                    <p class="tit">{{item.title}}</p>
                </el-tooltip>
            </div>
            <!-- 站位z -->
            <div class="resource_item" style="height:0;box-shadow:none">
            </div>
            <div class="resource_item" style="height:0;box-shadow:none">
            </div>
            <div class="resource_item" style="height:0;box-shadow:none">
            </div>
            <div class="resource_item" style="height:0;box-shadow:none">
            </div>
        </div>
        <div class="isMore">
            <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">加载更多</div>
            <div class="loadContent" v-if="!isEnd&&loading">加载中...</div>
            <span v-if="isEnd" class="isLoadEnd">我也是有底线的~</span>
        </div>
    </article>
</template>
<script>
import { getLabelList, getAllMaterial, getMaterial} from '@/api/resource'
export default {
    name: "resource",
    data() {
        return {
            selected: "",
            resourceList:[],
            titleList: [],
            currentPage: 1,
            totalPage:2,
            loading:false,
            isEnd:false,
            imgList: [],
        };
    },
    mounted() {
        this.getTitleList()
    },
    created() {},
    // 
    methods: {
        getList(label,page){
            let data = {
                label: label,
                page: page
            }
            this.loading = true
            if(label != ""){
                getMaterial(data).then( res => {
                    this.loading = false
                    if(page == 1){
                        this.resourceList = res.data.data
                    }else{
                        this.resourceList = [...this.resourceList,...res.data.data]
                    }
                    this.totalPage = res.data.last_page
                    if( this.currentPage == this.totalPage){
                        this.isEnd = true
                    }
                    this.getImgList(this.resourceList)
                })
            }else{
                getAllMaterial(data).then( res => {
                    this.loading = false
                    if(page == 1){
                        this.resourceList = res.data.data
                    }else{
                        this.resourceList = [...this.resourceList,...res.data.data]
                    }
                    this.totalPage = res.data.last_page
                    if( this.currentPage == this.totalPage){
                        this.isEnd = true
                    }
                    this.getImgList(this.resourceList)
                })
            }
        },
        loadContent () {
            this.currentPage++
            this.getList(this.selected,this.currentPage)
        },
        // gotoDetails(item){
        //     this.$router.push({path:'/depthDetails',query:{ id : item.id,userId: item.user_id}})
        // },
        getTitleList(){
            getLabelList().then( res => {
                this.titleList = res.data
                this.getList('', this.currentPage)
            })
        },
        changeSelect(item){
            this.selected = item.en_name
            this.currentPage = 1
            this.isEnd = false
            this.getList(item.en_name, this.currentPage)
        },
        // 预览对应当前图片列表
        getPrivewImages(index) {
            let tempImgList = [...this.imgList];//所有图片地址
            if (index == 0) return tempImgList;
            // 调整图片顺序，把当前图片放在第一位
            let start = tempImgList.splice(index);
            let remain = tempImgList.splice(0, index);
            return start.concat(remain);//将当前图片调整成点击缩略图的那张图片
            
        },
        getImgList(arr){
            let newArr = []
            arr.forEach((item,index) => {
                newArr.push(item.img_url)
            })
            this.imgList = newArr
        }
    }
};
</script>

<style scoped lang="less">
/deep/.el-icon-circle-close{
    color: #fff;
}
.resource{
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content:space-between;
    padding: 10px;
    box-sizing: border-box;
    .resource_item{
        width: 224px;
        height: 200px;
        overflow: hidden;
        // height: 124px;
        background-color: #FFFFFF;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 30px;
        border-radius: 10px;
        
    }
    .item_img{
        width: 224px;
        height: 150px;
        cursor: pointer;
    }
    .tit{
        line-height: 50px;
        text-indent: 20px;
        color: #333333;
        font-size: 14px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
}
.isMore{
    width: 1180px;
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
.tit_list{
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: #FAFAFA;
    margin-top: 40px;
    margin-bottom: 30px;
    padding-left: 20px;
    .tit_item{
        height: 26px;
        border-radius: 4px;
        padding: 0 15px;
        color: #333333;
        font-size: 14px;
        line-height: 26px;
        display: inline-block;
        margin-top: 12px;
        margin-right: 10px;
    }
    .selected{
        background-color: #333333;
        color: #ffffff;
    }
}
</style>
