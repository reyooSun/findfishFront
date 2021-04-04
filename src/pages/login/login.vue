<template>
  <div class="login">
    <div class="loginBox">
      <div class="w100 tc pt15">
        <img class="logoImg" src="../../assets/img/logo.png" />
      </div>
      <div class="w100">
        <!--登录-->
        <div
          v-if="isLogin"
          class="loginMain mauto clear h450"
          v-loading="loading"
          element-loading-text="正在登陆中。。。"
          element-loading-spinner="el-icon-loading"
        >
          <div class="loginMargin m25">
            <div class="_loginTitle w100">
              <span class="">登录</span>
            </div>
            <div class="_loginConten">
              <p class="labelId">用户名</p>
              <el-input
                v-model.trim="userParams.username"
                placeholder="请输入内容"
                @change="inputChange($event)"
              ></el-input>
              <p class="labelPwd">登录密码</p>
              <el-input
                show-password
                type="password"
                maxlength="15"
                v-model="userParams.password"
                placeholder="请输入登录密码"
                @change="inputChange($event)"
              ></el-input>

              <div class="yzmBox" v-if="isCode">
                <input
                  type="text"
                  v-model.trim="userParams.code"
                  placeholder="请输入验证码"
                  maxlength="4"
                  @change="inputChange($event)"
                />
                <a href="javascript:void(0);" title="点击更换验证码">
                  <img id="v_container" :src="codeUrl" @click="captcha()" />
                </a>
              </div>

              <el-button class="w100 mt25" type="primary" @click="loginClick"
                >登录
              </el-button>
              <div class="w100">
                <el-checkbox
                  class="fr"
                  v-model="rememberMe"
                  @change="rememberChange"
                  >记住我</el-checkbox
                >
              </div>
              <el-link
                style="margin-top: 30px"
                type="primary barter_btn"
                @click="barter_btn(false)"
                >前往注册</el-link
              >
            </div>
          </div>
        </div>
        <!--注册-->
        <div v-else class="loginMain pr h490 mauto clear">
          <div class="loginMargin m25">
            <div class="_loginTitle w100">
              <span class="">注册</span>
            </div>
            <div class="_loginConten">
              <p class="labelId">用户名</p>
              <el-input
                v-model.trim="registerParams.username"
                @change="inputChange($event)"
                placeholder="邮箱"
              ></el-input>
              <p class="labelPwd">密码</p>
              <el-input
                type="password"
                show-password
                v-model="registerParams.registerPwd"
                @change="inputChange($event)"
                maxlength="15"
                placeholder="密码"
              ></el-input>
              <p class="labelPwd">确认密码</p>
              <el-input
                type="password"
                show-password
                v-model="registerParams.password"
                @change="inputChange($event)"
                maxlength="15"
                placeholder="确认密码"
              ></el-input>
              <p class="labelPwd">appId</p>
              <el-input
                type="password"
                show-password
                v-model.trim="registerParams.appId"
                placeholder="请输入要绑定的appid"
                @change="inputChange($event)"
              ></el-input>
              <div class="hetong fl">
                <el-checkbox
                  @change="checkBoxChange"
                  v-model="checked"
                ></el-checkbox>
                <span class="text">注册本站前请仔细阅读本站的免责条款</span
                ><span class="xieyi cursor" @click="prvacyClick"
                  >《那个酒窝免责声明协议》</span
                >
              </div>
              <el-button
                class="w100 mt30"
                type="primary"
                @click="registerClick"
                :disabled="btn == false ? true : false"
                :class="btn == false ? 'bgccc' : 'bg00D'"
                >注册
              </el-button>
              <el-link type="primary barter_btn" @click="barter_btn(true)"
                >返回登录</el-link
              >
            </div>
          </div>
          <!-- 免责声明 -->
          <div class="transition">
            <el-collapse-transition>
              <div v-show="prvacyShow">
                <div class="transition-box">
                  <p class="title">免责声明</p>
                  <p class="shengming">
                    在您使用本软件之前，请仔细阅读本声明的所有条款。您一旦开始使用本软件，即表明您无条件地接受本声明，您应遵守本声明和相关法律的规定。本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为主。
                  </p>
                  <ul>
                    <li>
                      <span
                        >一、本软件(findfish.top那个酒窝)使用者因为违反本声明的规定而触犯中华人民共和国法律的，一切后果自己负责，软件作者不承担任何责任。</span
                      >
                    </li>
                    <li>
                      <span
                        >二、软件仅用于学习测试，任何个人或单位不能作为商业用途，使用本软件产生的任何后果由用户自己承担，软件作者免责。</span
                      >
                    </li>
                    <li>
                      <span
                        >三、软件作者不担保提供的软件一定能满足用户的要求和期望，也不担保软件不会中断，对软件的及时性、安全性、出错发生都不作担保。</span
                      >
                    </li>
                    <li>
                      <span
                        >四、由于与本软件链接的相关网站所造成的任何法律争议和后果，与软件作者无关。</span
                      >
                    </li>
                    <li>
                      <span
                        >五、除本软件注明之服务条款外，其它因使用本软件而引致之任何意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯及其所造成的各种损失（包括因下载而感染电脑病毒），软件作者概不负责，亦不承担任何法律责任。</span
                      >
                    </li>
                  </ul>
                  <div class="btnBox">
                    <el-button
                      @click="btnYiChaKan(true)"
                      size="small"
                      type="primary"
                      :disabled="totaBtn"
                      >{{ content }}</el-button
                    >
                    <el-button
                      @click="prvacyShow = false"
                      size="small"
                      type="danger"
                      >关闭</el-button
                    >
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
      <div class="w100 tc" style="padding-top: 35px">
        <a
          style="color: #fff"
          class="beian"
          href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          >京ICP备2020038704号</a
        >
        <a
          style="color: #fff"
          class="beian"
          href="http://www.beian.gov.cn/portal/index"
          target="_blank"
          ><img
            src="../../assets/img/jh.png"
            style="vertical-align: sub; margin-right: 8px"
          />京公网安备 11010802033236号</a
        >
      </div>
    </div>
    <!-- 星空背景 -->
    <div class="stars"></div>
  </div>
</template>
<script>
import { getLogin, getCaptcha, getRegister } from "../../api/api";
export default {
  name: "login",
  data() {
    return {
      content: "", // 按钮里显示的内容
      totalTime: 5, //记录具体倒计时时间
      totaBtn: true,
      btn: false, //确认按钮
      prvacyShow: true,
      checked: false,
      rememberMe: false, //记住我
      codeUrl: "",
      isCode: true, //显示验证码
      code: "", //验证码
      route: "", //路由
      formData: new FormData(),
      isLogin: true,
      loading: false,
      zcloading: false,
      registerParams: {
        appId: "", //appId
        username: "", //注册id
        registerPwd: "", //注密码
        password: "", //确认密码
      },
      userParams: {
        username: "", //用户ID
        password: "", //登录密码
        captcha: "", //验证码id
        code: "", //验证码
      },
   
    };
  },
  mounted() {
    //删除token
    window.localStorage.removeItem("Authorization");
    //记住账号密码
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      if (userData.rememberMe == true) {
        this.userParams.username = userData.name;
        this.userParams.password = userData.password;
        this.rememberMe = userData.rememberMe;
      }
    }
    //验证码
    this.captcha();
    //回车登录
    document.onkeydown = (event) => {
      let e = event || window.event;
      if (e.keyCode == 13) {
        if (this.$route.path == "/") {
          //验证在登录界面和按得键是回车键enter
          if (this.isLogin == true) {
            //登录
            this.loginClick();
          } else {
            //注册
            this.registerClick();
          }
        }
      }
      e = window.event || e;
    };
  },
  methods: {
    //登录
    loginClick() {
      if (!this.userParams.username) {
        this.error("请输入用户名");
      } else {
        if (!this.userParams.password) {
          this.error("请输入密码");
        } else {
          if (!this.$mailReg.test(this.userParams.username)) {
            this.error("请输入正确的邮箱格式");
          } else {
            if (this.userParams.code == "") {
              this.error("请输入验证码");
            } else {
              //清空formData
              this.formData.delete("username");
              this.formData.delete("password");
              this.formData.delete("captcha");
              this.formData.delete("rememberMe");
              this.formData.delete("imageCode");
              //name
              this.formData.append("username", this.userParams.username);
              //password
              this.formData.append("password", this.userParams.password);
              //验证码id
              this.formData.append("captcha", this.userParams.captcha);
              //验证码
              this.formData.append("imageCode", this.userParams.code);
              let rememberMe;
              if (this.rememberMe == true) {
                rememberMe = "1";
              } else {
                rememberMe = "0";
              }
              //记住我
              this.formData.append("rememberMe", rememberMe);
              this.$http
                .post("/login/signin", this.formData, {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                })
                .then((res) => {
                  // console.log(res)
                  if (res.data.status == 200) {
                    //跳转路由
                    this.route = res.data.route;
                    //token
                    localStorage.Authorization = res.data.token;
                    //跳转列表
                    this.$router.push(this.route);
                    // userName数据存在 store
                    //  this.$store.dispatch('saveusername', {username: res.data.username});
                    sessionStorage.setItem("username", res.data.username);
                    //登录帐号密码
                    if (this.rememberMe == true) {
                      let userData = {
                        name: this.userParams.username,
                        password: this.userParams.password,
                        rememberMe: this.rememberMe,
                      };
                      //存在本地
                      localStorage.setItem(
                        "userData",
                        JSON.stringify(userData)
                      );
                    }
                  } else {
                    this.error(res.data.msg);
                    this.captcha();
                  }
                });
            }
          }
        }
      }
    },
    //注册
    registerClick() {
      if (!this.registerParams.username) {
        this.error("请输入用户名");
      } else if (!this.registerParams.registerPwd) {
        this.error("请输入密码");
      } else if (!this.registerParams.password) {
        this.error("请输入确认密码");
      } else {
        if (!this.registerParams.appId || !this.$wxbd.test(this.registerParams.appId)) {
          this.error("请输入正确的appid(appid在公众号后台基本配置中获取)");
        } else {
          if (!this.$mailReg.test(this.registerParams.username)) {
            this.error("请输入正确的邮箱格式");
          } else {
            if (
              this.registerParams.password === this.registerParams.registerPwd
            ) {
              this.registerParams = {
                username: this.registerParams.username, //注册id
                password: this.registerParams.password, //确认密码
                appId: this.registerParams.appId, //appId
              };
              getRegister(this.registerParams).then((res) => {
                if (res.data.status == 200) {
                  this.success("注册成功跳转登录！");
                  let _this = this;
                  //延迟2秒
                  setTimeout(function () {
                    //清空登录input
                    _this.userParams = {
                      username: "", //用户ID
                      password: "", //登录密码
                    };
                    //验证码
                    _this.captcha();
                    //切换登录
                    _this.isLogin = true;
                  }, 2000);
                } else {
                  this.error(res.data.msg);
                }
              });
            } else {
              this.error("二次密码不一致");
            }
          }
        }
      }
    },
    //注册
    barter_btn(v) {
      //切换注册模块
      this.isLogin = v;
      this.checked = v;
      this.btn = v;
      this.prvacyShow = true;
      if (v) {
        this.userParams = {
          username: "", //用户ID
          password: "", //登录密码
        };
      } else {
        this.registerParams = {
          username: "", //注册id
          registerPwd: "", //注密码
          password: "", //确认密码
        };
        this.countDown();
      }
    },
    //验证码
    captcha() {
      //验证码
      getCaptcha().then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.codeUrl = "data:image/jpeg;base64," + res.data.img;
          //验证码id
          this.userParams.captcha = res.data.captcha + "?data=" + new Date();
          this.userParams.captcha = res.data.captcha;
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //点击点选框 确认按钮高亮
    checkBoxChange(v) {
      this.btn = v;
    },
    //政策
    btnYiChaKan(v) {
      this.checked = v;
      this.btn = v;
      this.prvacyShow = !v;
    },
    prvacyClick() {
      if (this.totalTime != 5) {
        this.error("查看速度过快，请休息五秒钟");
      } else {
        this.prvacyShow = true;
        this.countDown();
      }
    },
    //倒计时
    countDown() {
      this.totaBtn = true;
      this.content = "请阅读s" + this.totalTime; //这里解决60秒不见了的问题
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = "请阅读s" + this.totalTime;
        if (this.totalTime < 0) {
          //当倒计时小于0时清除定时器
          window.clearInterval(clock);
          this.content = "已阅读";
          this.totalTime = 5;
          this.totaBtn = false;
        }
      }, 1000);
    },
    //记住我
    rememberChange(v) {
      this.rememberMe = v;
      if (v == false) {
        this.rememberMe = false;
        localStorage.clear();
      }
    },
    //input视图更新
    inputChange($event) {
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="less" type="text/less">
.logoImg {
  width: 130px;
  top: 50px;
}
.yzmBox {
  overflow: hidden;
  padding-top: 20px;
  width: 100%;
  display: inline-box;
  a {
    float: left;
    display: flex;
    margin-left: 20px;
  }
  img {
    width: 120px;
    height: 35px;
  }
  input {
    float: left;
    font-size: 12px;
    padding-left: 13px;
    border: solid #ccc 0.0625rem;
    height: 33px;
    width: 110px;
  }
}
.beian {
  font-size: 14px;
  bottom: 90px;
  right: 400px;
  margin: 0 10px;
  color: #333;
  &:hover {
    color: #333;
  }
}

.loginBox {
  overflow: hidden;
  display: block;
  justify-content: center;
  align-items: center;
  .loginMain {
    width: 400px;
    border-radius: 10px;
    background: #ffffff;
    opacity: 0.8;
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.5);

    .loginMargin {
      margin: 30px 50px 0 50px;
      ._loginTitle {
        padding-top: 15px;
        display: block;
        text-align: center;
        span {
          font-size: 20px;
        }
      }
      ._loginConten {
        font-size: 15px;
        line-height: 39px;
        p {
          font-size: 14px;
        }
        button {
          display: block;
        }
      }
    }
  }
  .barter_btn {
    cursor: pointer;
    border: 0;
    font-size: 14px;

    background: transparent;
    outline: 0;
  }
}

.el-collapse-item__content {
  display: flex;
}
.hetong {
  font-size: 12px;
  line-height: 20px;
  margin: 5px 0;
  .text {
  }
  .xieyi {
    color: #66b1ff;
  }
}
.bgccc {
  background: #cccccc;
}

.bg00D {
  background: #409eff;
}
.transition {
  position: absolute;
  font-size: 13px;
  top: 0;
  left: 0;

  z-index: 999;
  .transition-box {
    text-align: justify;
    padding: 0 30px;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 400px;
    height: 490px;
    border-radius: 10px;
    background-color: #fff;
    color: #333;
    box-sizing: border-box;
    .title {
      padding-top: 10px;
      font-size: 16px;
      text-align: center !important;
    }
    .shengming {
      line-height: 20px;
      text-indent: 2em;
    }
    ul {
      line-height: 20px;
      li {
        span {
          display: block;
          text-indent: 2em;
        }
      }
    }
    .btnBox {
      text-align: center;
      padding-top: 15px;
    }
  }
}
</style>
