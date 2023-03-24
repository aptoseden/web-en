<template>
    <article>
        <div class="top_head">
            <div class="reac_type">
                <ul class="new_ul">
                    <li :class="[select_type == '0' ? 'activeType' : '']" @click="changeSelect(0)">
                        All
                        <span class="race_line"></span>
                        <span class="race_num">{{totalCount}}</span>
                    </li>
                    <!-- <li :class="[select_type == '1' ? 'activeType' : '']" @click="changeSelect(1)">
                        开放项目
                        <span class="race_line"></span>
                        <span class="race_num">{{freeCount}}</span>
                    </li>
                    <li :class="[select_type == '2' ? 'activeType' : '']" @click="changeSelect(2)">
                        vip项目
                        <span class="race_line"></span>
                        <span class="race_num">{{vipCount}}</span>
                    </li> -->
                    <li :class="[select_type == '3' ? 'activeType' : '']" @click="changeSelect(3)">
                        Watchlist
                        <span class="race_line"></span>
                        <span class="race_num">{{followCount}}</span>
                    </li>
                    <li :class="[select_type == '4' ? 'activeType' : '']" @click="changeSelect(4)">
                        Unselected Projects
                        <span class="race_line"></span>
                        <span class="race_num">{{unfollowCount}}</span>
                    </li>
                </ul>
                <p class="search_type">
                    <el-input class="search_input" prefix-icon="el-icon-search" v-model="search_input" @change="search()" placeholder="Please input search"></el-input>
                </p>
            </div>
        </div>
        <div class="type_row" v-loading="vLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="new_item" v-for="item in coinList" :key="item">
                <div class="name">
                    <img :src="item.logo" alt="">
                    <p class="new_track_name">{{item.title}}({{item.symbol}})</p>
                </div>
                <p class="news_mum">Information quantity:{{item.informationCount}}</p>
                <p class="news_mum">The number of tracking::{{item.informationCount}}</p>
                <div class="btn_item">
                    <div class="new_track_btn" @click="followCoin(item.id)" v-if="item.follow_status == 0">Add</div>
                    <div class="del_track_btn" @click="unFollowCoin(item.id)" v-if="item.follow_status != 0">Remove</div>
                </div>
                
            </div>

<!--             
            <div class="item" v-for="item in coinList" :key="item">
                <div class="track_tent">
                    <div class="track_icon">
                        <p class="track_logo">
                            <img :src="item.logo" alt="">
                        </p>
                    </div>
                    <p class="track_name">{{item.title}}({{item.symbol}})</p>
                    <p class="track_race">
                        <span v-if="item.is_vip != 0"> vip </span>
                    </p>
                    <div class="num_box_parant">
                        <div class="num_box">
                            <p>{{item.informationCount}}</p>
                            <p>情报数</p>
                        </div>
                        <div class="num_box">
                            <p>{{item.future}}</p>
                            <p>未来事件</p>
                        </div>
                        <div class="num_box">
                            <p>{{item.followCount}}</p>
                            <p>跟踪人数</p>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button round type="info" class="track_btn" disabled="true">研报</el-button>
                        <el-button round class="track_btn btn_bg" @click="followCoin(item.id)" v-if="item.follow_status == 0">添加</el-button>
                        <el-button round class="track_btn btn_bg col_del" @click="unFollowCoin(item.id)" v-if="item.follow_status != 0">移除</el-button>
                    </div>
                </div>
            </div> -->
            
        </div>
    </article>
</template>
<script>
import { coinIndex, getCoinList, getFollowList, getFreeCoinList, toFollowCoin, toUnFollow, 
         getVipCoinList, getUnfollowcoinlist, coinSeach} from '@/api/follow'
export default {
  name: 'myFollow',
  components: {
    // 注册组件
  },
  data () {
    return {
      select_type: 0,
      input:'',
      followCount: 0,
      freeCount: 0,
      totalCount: 0,
      unfollowCount: 0,
      vipCount: 0,
      coinList: [],
      vLoading: false,
      search_input: '',//搜索
    }
  },
  mounted () {
    this.getTabbar()
    // console.log(this.$store.state.user)
    this.getList(0) // 0全部，1开放，2vip，3自选，4未选
  },
  created () {
    
  },
  methods: {
    changeSelect( num ){
        this.select_type = num
        this.getList(num)
    },
    search(){
        this.vLoading = true
        this.coinList = []
        let data = {
            key : this.search_input,
            user_id : this.$store.state.user.userInfo.id ? this.$store.state.user.userInfo.id : 0
        }
        coinSeach(data).then( res => {
            this.coinList = res.data
            this.vLoading = false
        })
    },
    getTabbar(){
        let data = {
            user_id: this.$store.state.user.userInfo.id ? this.$store.state.user.userInfo.id : 0
        }
        coinIndex( data ).then( res => {
            this.followCount = res.data.followCount
            this.freeCount = res.data.freeCount
            this.totalCount = res.data.totalCount
            this.unfollowCount = res.data.unfollowCount
            this.vipCount = res.data.vipCount
        })
    },
    getList(type){
        this.vLoading = true
        this.coinList = []
        let data = {
            user_id : this.$store.state.user.userInfo.id ? this.$store.state.user.userInfo.id : 0
        }
        if( type == 0){
            getCoinList(data).then( res => {
                this.coinList = res.data
                this.vLoading = false
            })
        }
        if( type == 1){
            getFreeCoinList(data).then( res => {
                this.coinList = res.data
                this.vLoading = false
            })
        }
        if( type == 2){
            getVipCoinList(data).then( res => {
                this.coinList = res.data
                this.vLoading = false
            })
        } 
        if( type == 3){
            getFollowList(data).then( res => {
                this.coinList = res.data
                this.vLoading = false
            })
        }
        if( type == 4){
            getUnfollowcoinlist(data).then( res => {
                this.coinList = res.data
                this.vLoading = false
            })
        }
    },
    followCoin(id){
        let data = {
            coin_id: id
        }
        toFollowCoin(data).then( res => {
            this.$message.success('关注成功')
            this.getTabbar()
        })
    },
    unFollowCoin(id){
        let data = {
            coin_id: id
        }
        toUnFollow(data).then( res => {
            this.$message.success('Unfollowed')
            getFollowList().then( res => {
                this.coinList = res.data
            })
            this.getTabbar()
        })
    }
  }
}
</script>
<style lang="less" scoped>
.type_row{
    margin-top: 94px;
    min-height: 600px;
    // display: flex;
    // flex-wrap: wrap;
    // margin-right: -15px;
    // margin-left: -15px;
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
.new_item{
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    justify-content: space-between;
    // flex-direction: column;
    align-items: center;
    background-color: #151515;
    margin-bottom: 20px;
    .name{
        display: flex;
        min-width: 390px;
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .new_track_name{
            display: flex;
            color: #FFFFFF;
            font-size: 14px;
            margin-left: 10px;
        }
    }
    .news_mum{
        display: flex;
        min-width: 250px;
        color: #FFFFFF;
        font-size: 14px;
    }
    .new_track_btn{
        align-items: center;
        font-size: 12px;
        cursor: pointer;
        width: 80px;
        height: 28px;
        border-radius: 14px;
        text-align: center;
        line-height: 28px;
        color: #000;
        background: #fff;
    }
    .del_track_btn{
        align-items: center;
        font-size: 12px;
        cursor: pointer;
        width: 80px;
        height: 28px;
        border-radius: 14px;
        text-align: center;
        line-height: 28px;
        color: #fff;
        background: #2c2c2c;
    }
    .btn_item{
        display: flex;
        min-width: 100px;
        justify-content: right;
    }
}

</style>