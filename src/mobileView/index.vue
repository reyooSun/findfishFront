<template>
  <div class="indexMain ">
    <!-- 初始化等待页面 -->
    <div style="background: #000; height: 100%" v-if="isInit == 0">
      <div class="wrapper">
        <van-loading color="#fff" size="35" type="spinner" vertical
          >加载中...</van-loading
        >
      </div>
    </div>

    <!-- 正常显示 -->
    <div
      style="overflow-y: scroll; width: 100%; height: 100%"
      v-else-if="isInit == 1"
    >
      <div class="head">
        <p  v-html="head">
          {{ head }}
        </p>
      </div>
      <div class="search message_container">
        <p>
          前往豆瓣校验片名：<span class="" @click="searchClick">{{
            searchname
          }}</span>
        </p>
      </div>
      <div v-if="search" class="searchBox">
        <el-input
          clearable
          v-model="searchBoxName"
          class="input-with-select"
        >
          <el-button @click="searchBoxClick" slot="append" icon="el-icon-search"
            >搜索</el-button
          >
        </el-input>
      </div>
      <div v-if="huiyuanShow" class="member">
        <div class="member-title ">
          <p class="huiyuan fl ">会员大厅</p>
          <p @click.stop="memberShow = !memberShow" class="shijian fr">
            {{ memberShow ? "收起大厅 -" : "展开大厅 +" }}
          </p>
        </div>
         <ul class="w100 fs16" v-if="memberShow">
          <li class="w100 access-box message_container" v-for="(item, i) in memberList" :key="i">
             <div class="message">
            <p v-html="item.keywordToValue">{{ item.keywordToValue }}</p>
             </div>
          </li>
        </ul>
      </div>
      <div class="movie">
        <el-collapse v-model="activeName" accordion @change="titleClick">
          <el-collapse-item
            v-for="time in movieTime"
            :key="time.id"
            :title="time.title"
            :name="time.id"
          >
            <ul class="w100 fs16" v-if="mge == ''">
              <li
                class="w100 access-box message_container "
                v-for="(items, i) in movieList"
                :key="i"
              >
              <div class="message">
                <div class="w100 ">
                  <p class="16">{{ items.movieName }}</p>
                </div>
                <div class="f16 tr" style="padding: 20px">
                  链接：
                  <a style="text-decoration: underline" :href="items.wangPanUrl"
                    >百度网盘</a
                  >
                  <span class="ml20" v-if="items.wangPanPassword != null">{{
                    items.wangPanPassword
                  }}</span>
                </div>
              </div>
              </li>
            </ul>
            <p v-else>{{ mge }}</p>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="foot">
        <p v-html="foot">
          {{ foot }}
        </p>
      </div>
      <ul class="footUl message_container">
        <li>
          免责声明：本站所有数据均来源于互联网公开分X链接，仅供交流学习，请于24小时内删除，请支持正版。
        </li>
        <li>
          如有侵犯您的权益，请发送相关证明文件及时与公众号作者联系进行屏蔽删除处理！谢谢。
        </li>
      </ul>
    </div>

    <!-- 数据丢失 -->
    <div class="index" v-else-if="isInit == 2">
      <p class="errorMeg message_container">数据丢失,请重新进入...</p>
    </div>

    <!-- 不是微信网页显示 -->
    <div class="index pr" v-else>
      <ul class="jsUl pa message_container">
        <li><h3>很高兴，你终于能找到这里</h3></li>
        <li>
          <p>
            需要公众号开发：自动回复电影、突破200无限关键词回复、数据采集爬虫，请联系作者微信：
            <a
              class="of-hidden"
              id="cobyOrderSn"
              data-clipboard-action="copy"
              data-clipboard-text="haha6224039"
              @click="copyLink"
            >
              haha6224039
            </a>
          </p>
        </li>
         <li><span style=" color:red;">找影视资源请不要加此号!</span></li>
        <li><span>期待与您相遇\(^o^)/</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getHeadtail, getMember, getMovie } from "../api/api";
import { Dialog } from "vant";
export default {
  name: "index",
  components: {},
  data() {
    return {
      huiyuanShow: true,
      movieTime: [
        { title: "一号大厅", id: 1 },
        { title: "二号大厅", id: 2 },
        { title: "三号大厅", id: 3 },
      ],
      isInit: 0,
      memberShow: true,
      ZWshow: "",
      activeName: 1,
      memberList: [],
      movieList: [],
      verification: "",
      searchname: "",
      searchBoxName: "",
      head: "",
      foot: "",
      mge: "",
      search:false
    };
  },
  created: function () {
    //加载前
  },
  mounted() {
    document.title = "资源页面";
    //判断是pc还是移动端
    var useragent = navigator.userAgent.toLowerCase();
    if (useragent.indexOf("micromessenger") != -1) {
      //加载后
      if (this.$URL.searchname && this.$URL.verification) {
        //存searchname
        this.searchname = decodeURIComponent(this.$URL.searchname);
        this.searchBoxName = decodeURIComponent(this.$URL.searchname);
        this.verification = this.$URL.verification;
        this.getHeadtail();
        this.getMember();
        //判断折叠板参数
        let activeNameData = JSON.parse(sessionStorage.getItem("activeName"));
        //判断是否为空
        if (activeNameData) {
          //折叠板刷新 默认打开第几个
          this.activeName = parseInt(activeNameData.activeName);
          //接口方法走第几个
          this.getMovie(activeNameData.index);
        } else {
          this.activeName = 1;
          this.getMovie("a");
        }
      } else {
        this.isInit = 4;
      }
    } else {
      this.isInit = 3;
    }
  },
  methods: {
    copyLink() {
      let _this = this;
      let clipboard = new this.clipboard("#cobyOrderSn");
      clipboard.on("success", function () {});
      this.success("URL已复制");
    },
    //头部尾部
    getHeadtail() {
      getHeadtail(this.verification).then((res) => {
        if (res.data.status == 200) {
          this.head = res.data.data.head.keywordToValue;
          this.foot = res.data.data.foot.keywordToValue;
          this.search = res.data.data.searchBox.keywordToValue;
        }
      });
    },
    searchClick() {
      window.location.href =
        "https://search.douban.com/movie/subject_search?search_text=" +
        this.searchname;
    },
    searchBoxClick() {
      if(this.searchBoxName=="") return false
   
      window.location.href =
        window.location.href.split("?")[0] +
        "?searchname=" +
        this.searchBoxName +
        "&verification=" +
        this.verification +
        "&type=mobile";
      location.reload();
    },
    getMember() {
      getMember(this.verification, this.searchname).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.success("正在更新列表数据！");
          this.memberList = res.data.data;
          //搜索关键字
          if (this.memberList) {
            this.searchname = this.memberList[0].keyword;
          }
        } else if (res.data.status == 300) {
          this.huiyuanShow = false;
        } else {
          this.error(res.data.msg);
        }
      });
    },
    getMovie(v) {
      this.mge = "";
      getMovie(this.verification, this.searchname, v).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.movieList = res.data.data;
          this.isInit = 1;
        } else if (res.data.status == 300) {
          this.mge = res.data.msg;
           this.isInit = 1;
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //消息弹框
    message: function (v) {
      this.$message({
        message: v,
        type: "warning",
      });
    },
    titleClick(v) {
      this.movieList = [];
      if (v == 1) {
        this.getMovie("a");
        let data = {
          activeName: 1,
          index: "a",
        };
        sessionStorage.setItem("activeName", JSON.stringify(data));
      } else if (v == 2) {
        let data = {
          activeName: 2,
          index: "u",
        };
        this.getMovie("u");
        sessionStorage.setItem("activeName", JSON.stringify(data));
      } else if (v == 3) {
        let data = {
          activeName: 3,
          index: "x",
        };
        this.getMovie("x");
        sessionStorage.setItem("activeName", JSON.stringify(data));
      } else {
        let data = {
          activeName: 1,
          index: "a",
        };
        sessionStorage.setItem("activeName", JSON.stringify(data));
      }
    },
  },
};
</script>
<style lang="less" type="text/less">
.indexMain {
  background-color: #101010 !important;
  .jsUl {
        color: #66CCFF !important;
    width: 69%;
    line-height: 1.875rem;
    border: 0.0625rem #ccc solid;
    top: 8.4375rem;
    left: 16%;
    li {
      padding: 10px 16px;
      a {
        text-decoration: underline;
        cursor: pointer;
      color: #66CCFF !important;
      }
    }
  }
  .errorMeg {
     color: #66CCFF !important;
    padding-top: 60%;
    text-align: center;
    font-size: 18px;
  }
  background: #fff;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .head {
    margin: 0 12px;
    color: #f7971e !important;
  font-weight: bold;
  }
  .foot {
    margin: 0 12px;
      color: #66CCFF !important;
  }
  .footUl {
    color: #66CCFF !important;
    margin: 20px 16px;
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    li {
      padding-bottom: 6px;
    }
  }
  .searchBox {
    margin: 20px 12px;
    .el-button--primary {
      color: #66CCFF !important;
      border-color: #409eff !important;
    }
  }
  .search {
     color: #66CCFF !important;
    margin: 12px;
    span {
      text-decoration: underline;
    }
  }
  .member {
    margin: 12px;
    .member-title {
          color: #ffe211 !important;
      display: inline-block;
      width: 100%;

      .huiyuan {
        font-size: 16px;
    
      }
      .shijian {
        font-size: 12px;
      }
    }
    ul {
      li {
        line-height: 30px;
        display: block;
        margin: 30px 0px;
        color: #66CCFF;
        p {
          text-align: justify;
          white-space: pre-line;
          padding: 12px 20px 20px 15px;
        }
        a{color: #66CCFF;}
      }
    }
  }
  .movie {
    margin: 8px 16px;
    .member-title {
      display: inline-block;
      width: 100%;
      .huiyuan {
        font-size: 18px;
        color: red;
      }
      .shijian {
        font-size: 12px;
      }
    }
    ul {
      li {
        line-height: 30px;
        display: block;
        margin: 30px 0px;
        p {
          text-align: justify;
          white-space: pre-line;
          padding: 12px 20px 0 15px;
        }
        a {
          color: #66CCFF !important;
        }
      }
    }
  }
}
.el-collapse-item__content {
  color: #66CCFF !important;
}
.el-collapse-item__header {
  background-color: #101010 !important;
  color: #ffe211 !important;
  font-size: 17px !important;
  border: none !important;
}
.el-icon-arrow-right:before {
  color: #ffe211 !important;
}
.el-collapse-item__wrap {
  background-color: #101010 !important;
}
.access-box {
  box-shadow: rgba(0, 0, 0, 0.2) 0 -3px 6px;
  // background-color: rgba(255, 255, 255, 0.4);
  // background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAMAAADHVLbdAAAAeFBMVEXW1tbX19fd3d3c3NzY2NjR0dHQ0NDf39/s7Ozp6ena2trU1NTt7e3Nzc3Hx8fExMT+/v7g4OD5+fnLy8vx8fHu7u7z8/PJycnPz8/w8PDq6ur19fXFxcXk5OTe3t7r6+vKysrl5eX09PTv7+/y8vL29vb39/f///8PjQm0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA7FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InV1aWQ6QkFFQzIwNDUyREQ5RTAxMTgxQ0NEMERGMTVBNjEwNzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTU5MTc3QzRBREE0MTFFMjgzMEZDN0M5QjgxNTREMjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTU5MTc3QzNBREE0MTFFMjgzMEZDN0M5QjgxNTREMjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNGMzg4RDFCMkYyMDY4MTE4MjJBQjU2RjVFODg4ODU2IiBzdFJlZjpkb2N1bWVudElEPSJ1dWlkOkJBRUMyMDQ1MkREOUUwMTE4MUNDRDBERjE1QTYxMDc1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+xxldVQAAAGdJREFUCNddx4sOgjAQRNERWygoIPLwSQHB9v//0N0NEOEkk8yFJ1db5tmp5gvaeHuL5CLt0n5WSNs7C0OttfMwBuRAlFLtGUcSEMuiCK0YFojjJ+tmGFcPhmr61+CzeAl8t+C29v0DRg0XVPGtJuIAAAAASUVORK5CYII=);
  // background-size: 10px 10px;
  // background-repeat: repeat-x;
  // background-position: 0 bottom;
  border-radius: 20px;
  margin-top: -4px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}


.message_container {

  filter: drop-shadow(0 0 8px #66CCFF);
}
.message_container .message {
  color: #66CCFF;
  background: #101010 !important;
  --aug-border: 2px;
  --aug-border-bg: #66CCFF;
  width: calc(100% - 20px);
  max-width: 640px;
  margin: 0 auto;
  overflow: hidden;
  transition: all 0.5s;
}

</style>
