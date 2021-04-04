/**
 * Created by 61977 on 2020/4/1.
 */
const baseSize = 32;
var browser={
  versions:function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    return {//移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language:(navigator.browserLanguage ||   navigator.language).toLowerCase()
};
// 设置 rem 函数
function setRem () {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 750
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
//如果是移动端就进行这里
if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
  browser.versions.iPhone || browser.versions.iPad){
  // 初始化
  setRem()

}
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  //如果是移动端就进行这里
  if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
    browser.versions.iPhone || browser.versions.iPad){
    setRem()
  }
};

