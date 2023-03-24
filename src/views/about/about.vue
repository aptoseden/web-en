<template>
    <article>
        <h2 id="anchor0">公司简介</h2>
        <p
            class="content"
        >悦财经为北京开源华盛网络科技有限公司旗下网站:汇聚于区块链行业各类数据和资讯。数据资讯快、准、全。致力于为广大区块链爱好者提供7x24小时的全球实时财经快讯。为了让广大爱好者能更了解当前市场行情、悦财经为各大区块链头部从业者提供信息解读分享平台，让更多人发表自己的观点，并提供各大事件的财经日历，金融市场新闻资讯，原创内容专题。我们励志成为业内使用便捷，信息全面的资讯信息服务机构。</p>
        <img src="../../../static/images/about/about1.png" alt class="about_img" />
        <h2  id="anchor1">广告合作</h2>
        <p class="content">
            悦财经汇聚区块链行业各类数据和资讯。数据资讯快、准、全。为广大区块链爱好者提供了更快财经资讯，国际动态，市场观察，市场分析。悦财经经过两年的发展,凭借其新闻敏感度、财经专业性、快速反应能力，迅速发展成为保受广大区块链产品爱好者以及投资者获取全球财经资讯的青睐之选。并针对“悦财经APP”和yucaijing.com进行全新改变，全新风格以及高品位的界面为广大用户带来更极致的资讯体验，更将为各位广告金主带来更高的收益潜力！
            <br />如有广告合作意愿、敬请联系。
            <br />广告/商务合作
        </p>
        <div class="mg"></div>
        <h2 id="anchor2">关于我们</h2>
        <p class="content">
            短短几年时间。伴随着区块链技术的不断深入发展。加密数字货币市值一路疯涨。大家渴望得到最真实。最有效的市场资讯以及行情解读。才能把握好投资的时机。互联网上充斥着参差不齐。鱼龙混杂的分析报道，小道消息、区块链又是相对门槛很高的技术知识、专业术语、你需要由浅入深的一步步学习进阶。
            <br />我们在这个世界从信息价值交换转变的路上，做一些让大众更容易了解和学习的区块链。
            <br />学习和了解区块链从悦财经开始
        </p>
        <div class="mg"></div>
        <h2 id="anchor3">悦财经LOGO</h2>
        <div class="about_card">
            <div class="item-logo white fl">
                <img src="../../../static/images/index/logo.png" alt />
            </div>
            <div class="item-logo black fr">
                <img src="../../../static/images/index/logo.png" alt />
            </div>
            <div class="clear"></div>
        </div>
        <div class="mg"></div>
        <h2 id="anchor4">联系悦财经</h2>
        <p class="content content_align">内容投递、问题反馈、需求合作皆在此。</p>
        <div class="about_card">
            <div class="card_item fl">
                <img src="../../../static/images/about/email.png" alt />
                <p>邮箱联系</p>
                <p>yuecaijingyx@ycj.com</p>
            </div>
            <div class="card_item fr ">
                <img src="../../../static/images/waiter.png" alt  class="wx_pic"/>
                <p>微信客服</p>
                <p>微信扫码添加好友</p>
            </div>
            <div class="clear"></div>
        </div>
        <div class="mg" style="height:160px"></div>
        <div class="about_nav">
            <p
                class="nav_item"
                :class="[select == '#anchor0' ? 'nav_select' : '']"
                @click="goAnchor('#anchor0')"
            >公司简介</p>
            <p
                class="nav_item"
                :class="[select == '#anchor1' ? 'nav_select' : '']"
                @click="goAnchor('#anchor1')"
            >广告合作</p>
            <p
                class="nav_item"
                :class="[select == '#anchor2' ? 'nav_select' : '']"
                @click="goAnchor('#anchor2')"
            >关于我们</p>
            <p
                class="nav_item"
                :class="[select == '#anchor3' ? 'nav_select' : '']"
                @click="goAnchor('#anchor3')"
            >悦财经LOGO</p>
            <p
                class="nav_item"
                :class="[select == '#anchor4' ? 'nav_select' : '']"
                @click="goAnchor('#anchor4')"
            >联系悦财经</p>
        </div>
    </article>
</template>
<script>
export default {
    name: "about",
    data() {
        return {
            select: "#anchor0"
        };
    },
    mounted() {},
    created() {},
    methods: {
        goAnchor(selector) {
            this.select = selector
            var anchor = this.$el.querySelector(selector);
            // document.body.scrollTop = anchor.offsetTop;
            // console.log(anchor.offsetTop)
            window.scrollTo( 0, anchor.offsetTop)
        }
    }
};
</script>

<style scoped lang="less">
.about_nav {
    position: fixed;
    top: 260px;
    right: 100px;
    .nav_item {
        width: 128px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        color: #666666;
        background-color: #fafafa;
        border-radius: 4px;
        text-align: center;
        margin: 10px 0;
    }
    .nav_select {
        color: #ffffff;
        background-color: #4380fe;
        box-shadow: 0 0 10px rgba(67, 128, 254, 0.6);
    }
}
article {
    width: 800px;
    overflow: visible;
    padding: 1px;
}
h2 {
    color: #333333;
    font-size: 30px;
    margin: 30px auto;
    text-align: center;
    margin-top: 80px;
}
.content {
    font-size: 16px;
    color: #333333;
    line-height: 34px;
    text-indent: 22px;
    margin-bottom: 30px;
}
.about_img {
    width: 800px;
    height: auto;
}
.about_card {
    width: 650px;
    margin: 0 auto;
    padding: 10px;
}
.item-logo {
    width: 290px;
    height: 147px;
    img {
        width: 91px;
        height: auto;
        margin: 0 auto;
        margin-top: 50px;
    }
}
.card_item {
    width: 290px;
    height: 250px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
    //   border: 1px solid #000;
    border-radius: 8px;
    img {
        width: 57px;
        height: auto;
        margin: 0 auto;
        margin-top: 66px;
    }
    p {
        text-align: center;
        margin-top: 20px;
    }
    .wx_pic {
        width: 80px;
        height: 80px;
        margin-top: 50px;
    }
}
.white {
    background-color: #fafafa;
}
.black {
    background-color: #333333;
}
.mg {
    height: 30px;
}
.content_align {
    text-align: center;
}
</style>
