import Vue from "vue";
import Router from "vue-router";
Vue.use(Router)

//vue切换路由时报错Uncaught 解决方法
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
export default new Router({
    routes: [{
            path: '*',
            redirect: '/',
        }, {
            path: '/',
            name: 'login', //登录
            component: () =>
                import ('../pages/login/login.vue'),
        },
        {
            path: '/mainManagement',
            name: 'mainManagement',
            component: () =>
                import ('../pages/mainManagement.vue'),
        },
        {
            path: '/mobileView',
            name: 'mobileView',
            component: () =>
                import ('../mobileView/index.vue'),
        },
        {
            path: '/mobileMain',
            name: 'mobileMain',
            component: () =>
                import ('../mobileView/mobileMain.vue'),
        },
        {
            path: '/index',
            name: 'index',
            component: () =>
                import ('../pages/index/index.vue'),
            children: [{
                path: 'userManagement',
                name: 'userManagement', //用户管理
                component: () =>
                    import ('../pages/userManagement.vue'),
            }, {
                path: 'perManagement',
                name: 'perManagement', //权限管理
                component: () =>
                    import ('../pages/perManagement.vue'),
            }, {
                path: 'roleManagement',
                name: 'roleManagement', //角色管理
                component: () =>
                    import ('../pages/roleManagement.vue'),
            }, {
                path: 'noticeManagement',
                name: 'noticeManagement', //通知管理
                component: () =>
                    import ('../pages/noticeManagement.vue'),
            }],
        }
    ]
})