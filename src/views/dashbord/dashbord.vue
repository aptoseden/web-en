<template>
    <article class="new_article">
        <div class="picsbox">
            <div class="top_p" style="height:20px"></div>
            <!-- 顶部信息 -->
            <el-carousel :interval="5000" arrow="always" class="banner_type">
                <el-carousel-item v-for="item in banner" :key="item">
                    <!-- <h3>{{ item }}</h3> -->
                    <img :src="item.url" alt="" class="banner_item" @click="toUrl(item)">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="top_p" style="height:1px"></div>
        <div class="partners">
            <!-- <img src="../../../static/images/Partners/1.png" alt=""> -->
            <img src="../../../static/images/Partners/12.png" alt="">
            <img src="../../../static/images/Partners/3.png" alt="">
            <img src="../../../static/images/Partners/14.png" alt="">
            <img src="../../../static/images/Partners/13.png" alt="">
            <!-- <img src="../../../static/images/Partners/4.png" alt=""> -->
            <img src="../../../static/images/Partners/7.png" alt="">
            <img src="../../../static/images/Partners/2.png" alt="">
            <!-- <img src="../../../static/images/Partners/8.png" alt=""> -->
        </div>
        <!-- 项目信息 -->
        <div class="top_head">
            <div class="reac_type" style="width:100%">
                <ul class="new_ul">
                    <li :class="[select_type == '0' ? 'activeType' : '']" @click="changeSelect(0)">
                        Latest Projects
                        <span class="race_line"></span>
                    </li>
                    <li :class="[select_type == '2' ? 'activeType' : '']" @click="changeSelect(2)">
                        Hot Projects
                        <span class="race_line"></span>
                    </li>
                    <li :class="[select_type == '1' ? 'activeType' : '']" @click="changeSelect(1)">
                        All Projects
                        <span class="race_line"></span>
                    </li>
                </ul>
                <div>
                    <el-select v-model="classSelector" placeholder="Select" @change="changeClass" class="mySelect"
                        :popper-append-to-body="false" v-show="select_type == 1">
                        <el-option v-for="item in classArr" :key="item.id" :label="item.en_title" :value="item.id">
                        </el-option>
                    </el-select>
                    <div @click="drawer = true" class="watch_list">
                        <span class="col_point"></span> WatchList
                    </div>
                </div>
            </div>
        </div>
        <div class="new_body2" v-show="select_type == 0">
            <div class="project_bureau">
                <div class="pro_left">
                    <div class="new_project">
                        <div class="item_list">
                            <!-- <div class="item_new_box"> -->
                            <div class="tiem_info" v-for="item in newCoinList" :key="item">
                                <div class="item_new_box">
                                    <div class="logo_tit">
                                        <img class="logo" :src="item.logo" alt="">
                                        <div class="info_box">
                                            <p>{{item.title}}</p>
                                            <p>
                                                <el-tooltip class="item" effect="dark" content="Website"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/web.png"
                                                        alt="" @click="gotoWeb(item.website)" v-show="item.website">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Twitter"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/twitter.png"
                                                        alt="" @click="gotoWeb(item.twitter_url)"
                                                        v-show="item.twitter_url">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Muedium"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/medium.png"
                                                        alt="" @click="gotoWeb(item.medium_url)"
                                                        v-show="item.medium_url">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Forum"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/luntan.png"
                                                        alt="" @click="gotoWeb(item.forum_url)" v-show="item.forum_url">
                                                </el-tooltip>
                                            </p>
                                        </div>
                                    </div>
                                    <div v-if="item.follow_status != 1">
                                        <el-button class="add_track" type="primary" circle @click="follow(item)">Add
                                        </el-button>
                                    </div>
                                    <div v-if="item.follow_status == 1">
                                        <span class="end_track">Added</span>
                                    </div>

                                </div>
                                <p class="box_tit">Project introduction:</p>
                                <p class="box_tent">{{item.en_remark}}</p>
                                <!-- <p><span class="tip">{{item.coin_type}}</span></p>  -->
                            </div>
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
                <!-- 自选模块 -->
            </div>
        </div>
        <div class="new_body2" v-show="select_type == 2">
            <div class="project_bureau">
                <div class="pro_left">
                    <div class="new_project">
                        <div class="item_list">
                            <!-- <div class="item_new_box"> -->
                            <div class="tiem_info" v-for="item in hotCoinList" :key="item">
                                <div class="item_new_box">
                                    <div class="logo_tit">
                                        <img class="logo" :src="item.logo" alt="">
                                        <div class="info_box">
                                            <p>{{item.title}}</p>
                                            <p>
                                                <el-tooltip class="item" effect="dark" content="Website"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/web.png"
                                                        alt="" @click="gotoWeb(item.website)" v-show="item.website">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Twitter"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/twitter.png"
                                                        alt="" @click="gotoWeb(item.twitter_url)"
                                                        v-show="item.twitter_url">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Muedium"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/medium.png"
                                                        alt="" @click="gotoWeb(item.medium_url)"
                                                        v-show="item.medium_url">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Forum"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/luntan.png"
                                                        alt="" @click="gotoWeb(item.forum_url)" v-show="item.forum_url">
                                                </el-tooltip>
                                            </p>
                                        </div>
                                    </div>
                                    <div v-if="item.follow_status != 1">
                                        <el-button class="add_track" type="primary" circle @click="follow(item)">Add
                                        </el-button>
                                    </div>
                                    <div v-if="item.follow_status == 1">
                                        <span class="end_track">Added</span>
                                    </div>

                                </div>
                                <p class="box_tit">Project introduction:</p>
                                <p class="box_tent">{{item.en_remark}}</p>
                                <!-- <p><span class="tip">{{item.coin_type}}</span></p>  -->
                            </div>
                            <!-- </div> -->
                        </div>
                    </div>
                    <!-- </div> -->
                </div>
            </div>
            <!-- 自选模块 -->
        </div>
        <div class="new_body2" v-show="select_type == 1">
            <div class="project_bureau">
                <div class="pro_left">
                    <div class="new_project">
                        <div class="item_list">
                            <!-- <div class="item_new_box"> -->
                            <div class="tiem_info" v-for="item in classCoinArr" :key="item">
                                <div class="item_new_box">
                                    <div class="logo_tit">
                                        <img class="logo" :src="item.logo" alt="">
                                        <div class="info_box">
                                            <p>{{item.title}}</p>
                                            <p>
                                                <el-tooltip class="item" effect="dark" content="Website"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/web.png"
                                                        alt="" @click="gotoWeb(item.website)" v-show="item.website">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Twitter"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/twitter.png"
                                                        alt="" @click="gotoWeb(item.twitter_url)"
                                                        v-show="item.twitter_url">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Muedium"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/medium.png"
                                                        alt="" @click="gotoWeb(item.medium_url)"
                                                        v-show="item.medium_url">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="Forum"
                                                    placement="top-start">
                                                    <img class="box_img" src="../../../static/images/index/luntan.png"
                                                        alt="" @click="gotoWeb(item.forum_url)" v-show="item.forum_url">
                                                </el-tooltip>
                                            </p>
                                        </div>
                                    </div>
                                    <div v-if="item.follow_status != 1">
                                        <el-button class="add_track" type="primary" circle @click="follow(item)">Add
                                        </el-button>
                                    </div>
                                    <div v-if="item.follow_status == 1">
                                        <span class="end_track">Added</span>
                                    </div>

                                </div>
                                <p class="box_tit">Project introduction:</p>
                                <p class="box_tent">{{item.en_remark}}</p>
                                <!-- <p><span class="tip">{{item.coin_type}}</span></p>  -->
                            </div>
                            <!-- 占位数据 -->
                            <div class="tiem_info" style="height:1px"></div>
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tips">News of Selected Projects</div>
        <div class="empty" v-if="mediumList.length == 0 && forumList.length == 0">
            <img src="../../../static/images/enpty.png" alt="">
            <p>You haven’t added any projects yet, please add some to your watchlist</p>
        </div>
        <div class="medium_events" v-if="mediumList.length != 0 || forumList.length != 0">
            <div class="medium_box">
                <div class="medium_tit">
                    <p><span class="col_point"></span> Latest Medium Articl</p>
                    <!-- <p>最新twitter</p> -->
                    <p @click="gotoExpress()">All Articles</p>
                </div>
                <div class="data_box">
                    <el-scrollbar style="height:100%" wrap-style="overflow-x:hidden;">
                        <div class="data_box_item" v-for="item in mediumList" :key="item">
                            <div class="box_head">
                                <img :src="item.logo" alt="">
                                <p>{{item.c_symbol}}</p>
                            </div>
                            <p class="box_content" @click="gotoInfo(item)">{{item.title_cn}}</p>
                        </div>
                        <p class="box_empty" v-if="mediumList.length == 0">Empty</p>
                    </el-scrollbar>
                </div>
            </div>
            <div class="events_box">
                <div class="medium_tit">
                    <!-- <p><span class="col_point"></span> Latest Forum Events</p> -->
                    <p><span class="col_point"></span> In-depth</p>
                    <p @click="gotoExpress()">All Events</p>
                </div>
                <div class="data_box">
                    <el-scrollbar style="height:100%" wrap-style="overflow-x:hidden;">
                        <div class="data_box_item" v-for="item in depthDate" :key="item">
                            <div class="box_head">
                                <img :src="item.u_userpic" alt="">
                                <p>{{item.username}}</p>
                            </div>
                            <p class="box_content" @click="gotoDetails(item)">{{item.title}}</p>
                        </div>
                        <p class="box_empty" v-if="depthDate.length == 0">Empty</p>
                    </el-scrollbar>
                </div>

            </div>
        </div>
        <el-drawer title="" :visible.sync="drawer" :with-header="false" :custom-class="pro_drawer" :size="390">
            <div class="pro_right">
                <div class="clearfix">
                    <span style="color:#fff">Watchlist</span>
                    <router-link to="/myFollow">
                        <span style="float: right; margin-right: 20px; color: #37A9A5; font-size: 28px;">+</span>
                    </router-link>
                </div>
                <div class="list_box">
                    <div v-if="followCoinList.length == 0" class="box_empty">You have reached the bottom, please add
                        more projects</div>
                    <div v-for="item in followCoinList" :key="item" class="item">
                        <div class="name_box">
                            <img :src="item.logo" alt="">
                            {{item.title}}
                            <!-- <span>{{item.symbol}}</span> -->
                        </div>
                        <div class="remove_btn" @click="unFollow(item)">
                            Remove
                        </div>
                    </div>
                </div>
            </div>
        </el-drawer>
    </article>
</template>

<script>
// import ProjectNew from '../../components/ProjectNew'
import { Loading } from 'element-ui'
import { twitterList, getClassList, getClassCoinList } from '@/api/express'
import { getDepthList } from '@/api/depth'
import { getFollowList, toUnFollow, getCoinList, toFollowCoin, coinIndex, newCoinList, hotCoinList } from '@/api/follow'
import { newMediumList, newForumList, addvip, vipendtime, myselfCoin, weekCoin, getBannerList } from '@/api/dashbord'
export default {
    name: 'dashbord',
    components: {
        // 注册组件
        // ProjectNew,
    },
    data() {
        return {
            mediumData: [],
            loading: false, // 是否正在加载
            mediumList: [],
            forumList: [],
            followCoinList: [],
            newCoinList: [],
            isLogin: this.$store.state.user.isLogin,
            endData: '',
            mySelfData: {},
            weekData: {},
            hotCoinList: [],
            banner: [],
            select_type: 1,
            classSelector: 1,
            classArr: [],
            classCoinArr: [],
            drawer: false,
            depthDate: []

        }
    },
    mounted() {
        // 注册scroll事件并监听
        this.loading = false
        this.getBanner()
        // setTimeout(() => {
        //     let isLogin = this.$store.state.user
        //     console.log(isLogin)
        // }, 500);
        // console.log(this.isLogin)
        this.getCoinList()
        this.getDepthsList()
        if (this.isLogin) {
            this.getUserCoinInfo()
            this.getList()
            // this.getEndTime()
            // this.getSelfCoin()
            // this.getWeekCoin()
        }
        // this.getSelfCoin()
        // this.getWeekCoin()
        this.getClassList()
    },
    created() {

    },
    watch: {
        "$store.state.user.isLogin": function (newFlag, oldFlag) {
            this.isLogin = newFlag;
            if (this.isLogin == true) {
                this.getUserCoinInfo()
                this.getList()
            }
        }
    },
    methods: {
        getCoinList() {
            let data = {
                user_id: this.$store.state.user.userInfo.id ? this.$store.state.user.userInfo.id : 0
            }
            //   getCoinList().then( res => {
            //       this.newCoinList = res.data.slice(0,6)
            //       this.hotCoinList = res.data.sort(() => Math.random() - 0.5).slice(0,6)
            //   })
            newCoinList(data).then(res => {
                this.newCoinList = res.data
            })
            hotCoinList(data).then(res => {
                this.hotCoinList = res.data
            })
        },
        changeSelect(num) {
            if (this.select_type != num) {
                this.select_type = num
            }
        },
        toUrl(item) {
            if (item.from_url) {
                //   console.log(item.from_url)
                window.open(item.from_url, '_blank');
            }
        },
        getBanner() {
            getBannerList().then(res => {
                this.banner = res.data
            })
        },
        getEndTime() {
            let data = {
                user_id: this.$store.state.user.userInfo.id
            }
            vipendtime(data).then(res => {
                this.endData = res.data
            })
        },
        getSelfCoin() {
            let data = {
                user_id: this.$store.state.user.userInfo.id ? this.$store.state.user.userInfo.id : 0
            }
            coinIndex(data).then(res => {

                this.mySelfData = res.data
            })
        },
        getWeekCoin() {
            let data = {
                user_id: this.$store.state.user.userInfo.id ? this.$store.state.user.userInfo.id : 0
            }
            weekCoin(data).then(res => {
                this.weekData = res.data
            })
        },
        getDepthsList() {
            let data = {
                page: 1,
                type: 0,
                class_id: 1,
                sort: 0,
            }
            getDepthList(data).then(res => {
                this.depthDate = res.data.data
                // console.log(res)
            })
        },
        gotoDetails(item) {
            this.$router.push({ path: '/aptosDetails', query: { id: item.id, classId: item.class_id, depthType: item.type } })
        },
        follow(item) {
            let data = {
                coin_id: item.id
            }
            toFollowCoin(data).then(res => {
                this.$message.success('Followed')
                this.getUserCoinInfo()
                this.getList()
            })
        },
        //加入vip
        joinVip() {
            addvip().then(res => {
                this.$message.success('加入成功')
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            })
        },
        //去详情页
        gotoInfo(row) {
            if (row.pm_url) {
                window.open(row.pm_url, '_blank');
            }
        },
        gotoWeb(url) {
            window.open(url, '_blank');
        },
        //获取个人关注项目的动态
        getUserCoinInfo() {
            this.getMedium()
            this.getForum()
        },
        // changeClass  
        changeClass(id) {
            this.classSelector = id
            this.getClassCoinList()
        },
        getMedium() {
            let data = {
                user_id: this.$store.state.user.userInfo.id
            }
            //   let data = {
            //     coin_id : '',
            //     page: 1
            //     }
            // twitterList(data).then( res => {
            //     this.mediumList = res.data.list.data
            // })
            newMediumList(data).then(res => {
                this.mediumList = res.data
            })
        },
        getForum() {
            let data = {
                user_id: this.$store.state.user.userInfo.id
            }
            newForumList(data).then(res => {
                this.forumList = res.data
            })
        },
        gotoExpress() {
            this.$router.push({ path: '/express' })
        },
        getList() {
            getFollowList().then(res => {
                this.followCoinList = res.data
            })
        },
        getClassList() {
            getClassList().then(res => {
                console.log(res)
                this.classArr = res.data
                this.classSelector = this.classArr[0].id
                this.getClassCoinList()
            })
        },
        getClassCoinList() {
            let data = {
                user_id: this.$store.state.user.userInfo.id,
                coin_class_id: this.classSelector
            }
            getClassCoinList(data).then(res => {
                console.log(res)
                this.classCoinArr = res.data
            })
        },
        // 取消关注
        unFollow(item) {
            let data = {
                coin_id: item.id
            }
            toUnFollow(data).then(res => {
                this.$message.success('Unfollowed')
                this.getList()
                this.getUserCoinInfo()
            })
        }
    }
}
</script>
<style lang="less">
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

//   .el-carousel__item:nth-child(2n) {
//     background-color: #99a9bf;
//   }

//   .el-carousel__item:nth-child(2n+1) {
//     background-color: #d3dce6;
//   }
.picsbox {
    .el-carousel__container {

        //   height: 370px;
        img {
            // border-radius: 16px;
        }
    }
}
</style>
<style scoped lang="less">
// .banner_type{
//     height: 370px;
// }
.data_box_item {
    width: 100%;
    margin-top: 20px;
    border-bottom: 1px dashed #3C3C3C;
    padding-bottom: 16px;

    .box_head {
        overflow: hidden;
        margin-bottom: 16px;

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 20px;
            float: left;
        }

        p {
            font-size: 18px;
            line-height: 36px;
            color: #fff;
            float: left;
        }
    }

    .box_content {
        color: #C8C8C8;
        font-size: 14px;
        cursor: pointer;
    }
}

.col_point {
    width: 2px;
    height: 16px;
    display: inline-block;
    background: #1EE9B7;
    position: relative;
    top: 3px;
    margin-right: 3px;
}

.empty {
    width: 40%;
    display: block;
    margin: 0 auto;
    margin-top: 50px;

    img {
        width: 200px;
        margin-bottom: 50px;
        display: block;
        margin: 0 auto;
    }

    p {
        text-align: center;
        color: #fff;

    }
}

.col_fir {
    background: linear-gradient(90deg, rgb(184, 102, 255) 0%, rgb(150, 82, 255) 100%);
}

.col_second {
    background: linear-gradient(90deg, rgb(0, 204, 143) 0%, rgb(41, 199, 204) 100%);
}

.col_third {
    background: linear-gradient(90deg, rgb(245, 93, 93) 0%, rgb(255, 123, 97) 100%);
}

.col_forth {
    background: linear-gradient(90deg, rgb(48, 114, 240) 0%, rgb(51, 156, 255) 100%);
}

//
</style>
<style lang="less" scoped>
// banner
@media only screen and (min-width: 1500px) {

    /deep/.el-carousel__container,
    /deep/.banner_type {
        height: 420px !important;
    }
}

@media only screen and (min-width: 1335px) and (max-width: 1500px) {

    /deep/.el-carousel__container,
    /deep/.banner_type {
        height: 360px !important;
    }
}

@media only screen and (min-width: 1100px) and (max-width: 1335px) {

    /deep/.el-carousel__container,
    /deep/.banner_type {
        height: 300px !important;
    }
}

@media only screen and (min-width: 990px) and (max-width: 1100px) {

    /deep/.el-carousel__container,
    /deep/.banner_type {
        height: 270px !important;
    }
}

// 头部信息结束
.title_info {
    width: 100%;
    background: #ffffff;
    padding: 0 24px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 20px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info_p {
        color: #333333;

        .high {
            margin-right: 12px;
            color: #333333;
            margin-left: 4px;
        }
    }

    .btn {
        cursor: pointer;
        background: linear-gradient(90deg, #8433ff, #7970fe);
        width: 140px;
        height: 40px;
        line-height: 40px;
        color: #333333;
        text-align: center;
        border-radius: 20px;
    }
}

.banner_item {
    width: 100%;
    height: 100%;
}

.new_article {
    .top_head {
        background-color: #030303;
        position: relative;
        width: 100%;
        margin: 0 auto;
        top: 0;
        padding: 0;
        height: 50px;

        .reac_type {
            background-color: #030303;
            padding: 0;

            li {
                margin: 0;
                margin-right: 30px;
                font-size: 16px;
            }
        }

        .mySelect {
            background: #030303;
            // float: right;
            margin-top: 5px;
            margin-right: 40px;

            /deep/.el-input__inner {
                background: #151515;
                border: none;
                color: #fff;
            }
        }

        .watch_list {
            color: #fff;
            font-size: 14px;
            line-height: 48px;
            cursor: pointer;
            float: right;

        }
    }

    .partners {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;

        img {
            height: 36px;
            width: auto;
        }
    }
}

// 项目信息
.project_bureau {
    height: auto;
    margin-top: 10px;
    display: flex;
    width: 100%;

    .pro_left {
        -webkit-box-flex: 1;
        flex: 1 1 0%;

        .new_project {
            margin-bottom: 24px;
        }

        .pro_tit {
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            margin-bottom: 16px;
            font-size: 17px;
            color: #333333;
        }

        .item_list {
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
            flex-wrap: wrap;
            min-height: 208px;
        }

        .tiem_info {
            width: calc(33% - 5px);
            cursor: pointer;
            max-height: 82px;
            margin-bottom: 20px;
            -webkit-box-align: center;
            align-items: center;
            position: relative;
            padding: 24px;
            background: #030303;
            // box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
        }

        .logo_tit {
            display: flex;

            .logo {
                width: 40px;
                height: 40px;
                display: flex;
                -webkit-box-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                align-items: center;
                padding: 1px;
                background: #ffffff;
                border-radius: 50%;
            }

            .info_box {
                margin-left: 16px;
                padding-top: 4px;

                p:first-child {
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 16px;
                }

                // p:last-child{
                //     display: inline-block;
                //     margin-top: 8px;
                //     font-size: 12px;
                //     span{
                //         color: #a7f0ba;
                //         margin-right: 8px;
                //         margin-bottom: 4px;
                //         padding: 0px 8px;
                //         border-radius: 4px;
                //         background: rgba(167,240,186,0.1);
                //     }
                // }
            }
        }

        .add_track {
            width: 60px;
            height: 28px;
            border-radius: 14px;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            cursor: pointer;
            padding: 0px;
            background-color: #fff;
            border: none;
            font-size: 12px;
            color: #000;
            // border-radius: 4px;
        }

        .end_track {
            width: 60px;
            height: 28px;
            border-radius: 14px;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            cursor: pointer;
            padding: 0px;
            // background-color: #333333;
            border: none;
            color: #FFFFFF;
            font-size: 12px;
        }
    }

}

.new_body2 {
    min-height: 600px;

    .project_bureau {
        .pro_left {
            .tiem_info {
                // justify-content: flex-start;
                display: block;
                max-height: 400px;
                min-height: 230px;

                .box_img {
                    width: 26px;
                    height: 26px;
                    margin-right: 10px;
                    margin-top: 10px;
                    float: left;
                }

                .item_new_box {
                    display: flex;
                    width: 100%;
                    height: 80px;
                    -webkit-box-pack: justify;
                    justify-content: space-between;

                    .logo_tit {
                        .logo {
                            width: 62px;
                            height: 62px;
                        }
                    }
                }

                .box_tent {
                    color: #C8C8C8;
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .box_tit {
                    color: #fff;
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .tip {
                    color: #999999;
                    margin-right: 8px;
                    // margin-bottom: 4px;
                    font-size: 12px;
                    padding: 5px 10px;
                    border-radius: 10px;
                    background: #F2F2F2;
                }
            }
        }

        .pro_right {
            margin: 0;
            margin-right: 30px;
            width: 330px;

            .item2 {
                width: 100%;
                cursor: pointer;
                margin-bottom: 10px;
                text-indent: 20px;
                color: #000;
                font-size: 18px;
                line-height: 50px;
                height: 50px;

                &:hover {
                    background: #1EE9B7;
                    border-radius: 4px;
                }
            }

            .pro_selector {
                background: #1EE9B7;
                border-radius: 4px;
            }
        }
    }
}

.pro_drawer {
    background-color: #0C0C0C;
}
</style>
<style lang="less" scoped>
// 自选模块
/deep/.el-table,
/deep/.el-table__expanded-cell {
    background-color: #030303 !important;

    &:hover {
        background-color: #030303 !important;
    }
}

/deep/.el-table tbody tr:hover>td {
    background-color: #030303 !important
}

/deep/.el-table th,
/deep/.el-table tr {
    background-color: #030303 !important;

    &:hover {
        background-color: #030303 !important;
    }
}

/deep/.el-select-dropdown__item.selected {
    color: #1BE1B0 !important;
    border: none;
}

/deep/.el-select-dropdown {
    border: none;
}

/deep/.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
    background-color: #151515;
}

/deep/ .el-popper .popper__arrow,
.el-popper .popper__arrow::after {
    display: none;
}

/deep/.el-select-dropdown__list {
    background: #151515 !important;
}

/deep/.el-drawer__body {
    background-color: #0C0C0C;
}

/deep/.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
    // border-bottom: .0625rem solid #e3e3e3 !important;
    // border: none !important;
}

/deep/.el-table table>tbody>tr>td,
.table>tbody>tr>td {
    color: #fff !important;
}

/deep/.el-table--border::after,
.el-table--group::after,
.el-table::before {
    height: 0;
}

.btn_col {
    color: #37A9A5 !important;
}

.tips {
    width: 100%;
    margin-top: 20px;
    height: 36px;
    border-radius: 6px;
    // background-color: #FAFAFA;
    color: #fff;
    font-size: 24px;
    // text-align: center;
    line-height: 36px;
    margin-bottom: 20px;
}

.medium_events {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;

    .medium_box,
    .events_box {
        width: calc(50% - 15px);
        padding: 4px;
        box-sizing: border-box;
        // margin-bottom: 20px;
    }
}

.data_box {
    border-radius: 6px;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
    padding-bottom: 20px;
    height: 460px;
    // overflow-y: scroll;
}

.medium_tit {
    height: 40px;
    margin-bottom: 16px;
    // border-left: 4px solid #181818;
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-items: center;
    display: flex;

    p:first-child {
        font-size: 16px;
        color: #fff;
        display: block;
    }

    p:last-child {
        font-size: 14px;
        color: #37A9A5;
        display: block;
        cursor: pointer;
    }
}

// .table_style{
//     th{
//         background-color:#1b2447;
//         color:#fff
//     }
// }
</style>