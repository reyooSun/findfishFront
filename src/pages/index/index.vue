<template>
  <div
    class="index"
    v-loading="loading"
    element-loading-text="请稍等，正在退出中。。。"
  >
    <div class="indexBox">
      <div class="_indexNav">
        <div class="nav-top of-hidden clear">
          <span class="nav-logo">系统管理</span>
        </div>
        <ul class="clear">
          <li
            @mouseenter="hoverActive(0)"
            @mouseleave="hoverActive(-1)"
            :class="{ active: isActive == 0, hoverActive: isHoverActive == 0 }"
            @click="userManagement(0)"
          >
            <i class="fl iconfont iconicon-user"></i>用户管理
          </li>

          <li
            @mouseenter="hoverActive(1)"
            @mouseleave="hoverActive(-1)"
            :class="{ active: isActive == 1, hoverActive: isHoverActive == 1 }"
            @click="roleManagement(1)"
          >
            <i class="fl iconfont iconkehuqunzu"></i>角色管理
          </li>

          <li
            @mouseenter="hoverActive(2)"
            @mouseleave="hoverActive(-1)"
            :class="{ active: isActive == 2, hoverActive: isHoverActive == 2 }"
            @click="perManagement(2)"
          >
            <i class="fl iconfont iconbiaoqian_white"></i>权限管理
          </li>
          <li
            @mouseenter="hoverActive(3)"
            @mouseleave="hoverActive(-1)"
            :class="{ active: isActive == 3, hoverActive: isHoverActive == 3 }"
            @click="noticeManagement(3)"
          >
            <i class="fl iconfont iconbiaoqian_white"></i>通知管理
          </li>
        </ul>
      </div>
      <div class="_indexConten">
        <div class="_indexTop clear">
          <div class="top-box fr">
            <span class="top-name fl">{{ this.Id }}</span>
            <i
              style="cursor: pointer"
              @click="out"
              class="i-out iconfont icondengchu2 fl"
            ></i>
          </div>
        </div>
        <div class="_indexView">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"], // 注入重载的功能（注入依赖）
  name: "index",
  data() {
    return {
      isActive: 0, //点击切换菜单高亮
      isHoverActive: -1, //鼠标悬浮菜单高亮
      Id: "",
      loading: false,
    };
  },
  mounted() {
    this.Id = localStorage.getItem("inputId");
    if (this.$route.path == "/index/userManagement") {
      this.isActive = 0;
    } else if (this.$route.path == "/index/roleManagement") {
      this.isActive = 1;
    } else if (this.$route.path == "/index/perManagement") {
        this.isActive = 2;
    } else if (this.$route.path == "/index/noticeManagement") {
        this.isActive = 3;
    }
  },
  methods: {
    out() {
      let _this = this;
      setTimeout(function () {
        _this
          .$confirm("您确定要退出系统？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error",
          })
          .then(() => {
            _this.loading = true;
            setTimeout(function () {
              _this.loading = false;
              localStorage.clear();
              _this.$router.push("/");
            }, 3000);
          });
      }, 2000);
    },

    //鼠标悬浮菜单高亮效果
    hoverActive(index) {
      this.isHoverActive = index;
    },
    userManagement(index) {
      this.isActive = index;
      if (this.$route.path == "/index/userManagement") {
        this.reload(); // 点击侧边栏重新载入页面
      } else {
        this.$router.push("/index/userManagement");
      }
    },
    roleManagement(index) {
      this.isActive = index;
      if (this.$route.path == "/index/roleManagement") {
        this.reload(); // 点击侧边栏重新载入页面
      } else {
        this.$router.push("/index/roleManagement");
      }
    },
    perManagement(index) {
      this.isActive = index;
      if (this.$route.path == "/index/perManagement") {
        this.reload(); // 点击侧边栏重新载入页面
      } else {
        this.$router.push("/index/perManagement");
      }
    },
    noticeManagement(index) {
      this.isActive = index;
      if (this.$route.path == "/index/noticeManagement") {
        this.reload(); // 点击侧边栏重新载入页面
      } else {
        this.$router.push("/index/noticeManagement");
      }
    }
  },
};
</script>
<style lang="less" type="text/less">
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .indexBox {
    display: flex;
    ._indexNav {
      background-image: linear-gradient(135deg, #52607f 0%, #2d374d 100%);
      width: 200px;
      height: 100vh;
      .nav-top {
        line-height: 80px;
        .nav-logo {
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #ffffff;
          letter-spacing: 0.07px;
          display: block;
          text-align: center;
        }
      }
      ul {
        li {
          transition: 0.3s;
          cursor: pointer;
          height: 64px;
          width: 100%;
          line-height: 64px;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #9299ab;
          letter-spacing: 0.06px;
          i {
            padding: 0 10px 0 50px;
            font-size: 26px !important;
          }
        }
      }
    }
    ._indexConten {
      width: 100%;
      height: auto;
      ._indexTop {
        background: #ffffff;
        box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.07);
        height: 50px;
        line-height: 50px;

        .top-box {
          .top-name {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
          }
          .i-out {
            margin: 0 20px 0 10px;
          }
        }
      }
      ._indexView {
        width: 100%;
        height: 100%;
        flex: 1;
      }
    }
  }
}

.active {
  transform: translateX(-0.1em);
  background: #3eadff;
  border-left: 1px solid #3eadff;
  color: #fff !important;
}

.hoverActive {
  transform: translateX(-0.1em);
  background: #3eadff;
  border-left: 1px solid #3eadff;
  color: #fff !important;
}
</style>
