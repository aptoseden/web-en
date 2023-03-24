import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/views/home'
import CreatorCenter from '@/views/creatorCenter/creatorCenter'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: HomeIndex,
    children: [
      // { path: '/', component: () => import('@/views/index') },
      { path: '/sort', component: () => import('@/views/index') },
      //首页
      // { path: '/', component: () => import('@/views/index/index') },
      { path: '/', component: () => import('@/views/dashbord/dashbord') },

      //快讯
      { path: '/news', component: () => import('@/views/news/news') },
      { path: '/newsSelect', component: () => import('@/views/newsSelect/newsSelect') },
      { path: '/depth', component: () => import('@/views/depth/depth') },
      { path: '/aptosDepth', component: () => import('@/views/depth/aptosDepth') },
      { path: '/class', component: () => import('@/views/depth/class') },

      { path: '/about', component: () => import('@/views/about/about') },
      { path: '/sourceCenter', component: () => import('@/views/sourceCenter/sourceCenter') },
      //深度文详情页
      { path: '/depthDetails', component: () => import('@/views/depth/depthDetails') },
      { path: '/aptosDetails', component: () => import('@/views/depth/aptosDetails') },
      //问答模块
      { path: '/moveBase', component: () => import('@/views/medium/medium') },
      { path: '/moveBaseDetails', component: () => import('@/views/medium/mediumDetails') },

      //个人中心
      //{ path: '/personalCenter', component: () => import('@/views/personalCenter/personalCenter') },
      { path: '/personalCenter', component: () => import('@/views/person/personalCenter') },
      //创作者中心
      // creatorCenter
      { path: '/creatorCenter', 
        component: CreatorCenter,
        children: [
          { path: '', component: () => import('@/views/creatorCenter/creatorList') },
          { path: 'creat', component: () => import('@/views/creatorCenter/creat') },
          { path: 'edit', component: () => import('@/views/creatorCenter/edit') },
        ]
      },
      //用户协议
      { path: '/userAgreement', component: () => import('@/views/agreement/userAgreement') }, 
      //隐私协议
      { path: '/privacyAgreement', component: () => import('@/views/agreement/privacyAgreement') },
      //甲板页面
      { path: '/dashbord', component: () => import('@/views/dashbord/dashbord') },
      { path: '/myFollow', component: () => import('@/views/myFollow/myFollow') },
      { path: '/allProposal', component: () => import('@/views/allProposal/allProposal') },
      { path: '/express', component: () => import('@/views/express/express') },
      { path: '/newProject', component: () => import('@/views/newProject/newProject') },

    ]
  },
  { path: '/404', component: () => import('@/views/404') },
  { path: '/500', component: () => import('@/views/500') },
  { path: '/502', component: () => import('@/views/502') },
  { path: '/*', component: () => import('@/views/404') }

]

const router = new Router({
  routes: constantRouterMap,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// router.beforeEach((to, from, next) => {
//   var reloaded = window.localStorage.getItem('reloaded') || '0'
//   if (to.path === '/about') {
//     window.localStorage.setItem('reloaded', reloaded)
//   } else if (from.path === '/about') {
//     var count = Number(reloaded) + 1
//     window.localStorage.setItem('reloaded', count)
//   }
//   next()
// })

export default router
