import Vue from "vue";
import App from "./App.vue";
//路由
import router from "./router";
import store from "./vuex/store";
import axios from "./utils/http";
import ElementUI from "element-ui";
import { Loading, Message, MessageBox } from 'element-ui'
import "./assets/css/common.css";
import "element-ui/lib/theme-chalk/index.css";
import Vant from 'vant';

import 'vant/lib/index.css';
Vue.use(Vant);
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import "./assets/css/iconfont.css";
//rem.js适配
import './assets/js/rem'
//截取URL
import { UrlSearch } from './assets/js/fun'
//方法实例化
let Request = new UrlSearch();
//调试工具
import Vconsole from 'vconsole'
//复制文本内容
import clipboard from 'clipboard'

//const vConsole = new Vconsole()
//挂载全局截取URL
Vue.prototype.$URL = Request

//挂载全局复制文本内容
Vue.prototype.clipboard = clipboard;
Vue.config.productionTip = false;
//挂载全局邮箱验证
Vue.prototype.$mailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
Vue.prototype.$num = /^\d+$|^\d+[.]?\d+$/;
Vue.prototype.$wxbd = /^wx(?=.*\d)(?=.*[a-z])[\da-z]{16}$/;

Vue.prototype.$http = axios;
//Vue.use(vConsole)
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition)



//失败
Vue.prototype.error = function(v) {
        this.$message({
            showClose: true,
            message: v,
            type: 'error'
        });
    }
    //成功
Vue.prototype.success = function(v) {
        this.$message({
            showClose: true,
            message: v,
            type: 'success'
        });
    }
    //成功
Vue.prototype.alertMeg = function(v) {
        MessageBox.alert(v, '提示', {
            confirmButtonText: '确定',
            callback: action => {
                router.replace({
                    name: '/login',
                    query: { redirect: router.currentRoute.fullPath } //登录后再跳回此页面时要做的配置
                })
            }
        });
    }
    //时间戳  formateDate("后台传回来ajax要转换的时间值");
Vue.prototype.formateDate = function(date) {
        var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        m = m > 9 ? m : '0' + m;
        alert("y:" + y + "m:" + m + "d:" + d + "h:" + h + "mi:" + mi);
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
    }
    //全局时间过滤器插件
Vue.filter('dateFilter', (date, format) => {
    if (date == null) return "";
    date = date.replace('T', ' ');
    date = new Date(date);
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
});
//全局处理文字太长省略号过滤器
Vue.filter('subText', (input) => {
    if (input) {
        if (input.length > 10) {
            return input.substr(0, 9) + '...';
        } else {
            return input;
        }
    }
});

Vue.filter('dateState', (date) => {
    if (date) {
        if (date == '0') {
            return "正常"
        } else {
            return "删除"
        }
    }
});

new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});