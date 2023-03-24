<template>
   <div class="empty">
       <img src="../../../static/images/empty.png" alt="" class="empty_img">
   </div>
</template>
<script>
export default {
    name: "userInfo",
    data() {
        return {
            userInfo: {},
        };
    },
    mounted() {
        this.$nextTick(() => { 
            
        });
    },
    created() {},
    // 
    methods: {
        
    }
};
</script>

<style scoped lang="less">
.empty{
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%,-50%);
    margin-left: 200px;
    margin-top: 230px;
}
.empty_img{
    width: 454px;
    height: 162px;
}
</style>
