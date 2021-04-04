<template>
  <div class="mobileMain">
    <div class="mainBox">
      <div class="head">
        <van-icon
          @click="clickPopup('qr')"
          style="margin: 10px"
          name="qr"
          size="28"
        />
        <van-icon
          @click="clickPopup('add')"
          name="add"
          size="28"
          style="float: right; margin: 10px"
        />
      </div>
      <div class="listBox">
        <!-- 上拉列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getTempWithId"
          :immediate-check="false"
        >
          <!-- 循环列表数据 -->
          <div
            v-for="(item, index) in listData"
            :key="index"
            class="listItem pr"
          >
            <el-tooltip
              :content="item.enableFlag == true ? '状态:开启' : '状态:禁用'"
              placement="top"
            >
              <van-switch
                size="20"
                class="pa"
                style="top: 30px; right: 40px; z-index: 888"
                v-model="item.enableFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="enableChange(index, item)"
              >
              </van-switch>
            </el-tooltip>
            <div class="intemTop pr">
              <p
                :class="
                  item.showOrder != 0 ? 'keywirdColorRed' : 'keywirdColor333'
                "
              >
                {{ item.keyword }}
              </p>
              <p class="">{{ item.createtime.replace(/\-/g, "/") | dateFilter("yyyy-MM-dd") }}</p>
              <!-- 更多操作 -->
              <!-- <van-popover
                class="pa icon-weapp"
                v-model="item.showPopover"
                placement="bottom-end"
                theme="dark"
                trigger="click"
                :actions="actions"
              >
                <template #reference>
                  <van-icon class=" " name="weapp-nav" size="20" />
                </template>
              </van-popover> -->
            </div>
            <div class="intemText">
              <p v-html="item.keywordToValue">
                {{ item.keywordToValue }}
              </p>
            </div>
            <!-- 上边框 -->
            <div class="van-hairline--top"></div>
            <van-row class="row">
              <van-col
                v-if="item.temdetailsstatus == false"
                span="8"
                @click="clickTopping(item.temdetailsId, true)"
                ><van-icon class="icon-d-col" name="setting" />置顶</van-col
              >
              <van-col
                style="color: red"
                v-else
                span="8"
                @click="clickTopping(item.temdetailsId, false)"
                ><van-icon
                  size="18"
                  class="icon-d-col"
                  name="back-top"
                />取消置顶</van-col
              >
              <van-col
                @click="examineTipListOn(index, item.temdetailsId, item.showOrder)"
                span="8"
                ><van-icon
                  size="18"
                  class="icon-d-col"
                  name="more-o"
                />编辑</van-col
              >
              <van-col span="8" @click="deleteConfirm(item.temdetailsId, index, item.showOrder)"
                ><van-icon
                  size="18"
                  class="icon-d-col"
                  name="delete-o"
                />删除</van-col
              >
            </van-row>
          </div>
        </van-list>
      </div>
    </div>
    <!-- 用户框 -->
    <van-popup
      closeable
      v-model="showUserPopup"
      :position="position"
      :style="{ width: '100%', height: '100%', overflow: 'hidden' }"
    >
      <div v-if="isShowTis == 0" class="asideBox">
        <div class="businessCard">
          <div class="infoBox">
            <el-avatar>{{ userName }}</el-avatar>
            <p class="">用户名称：{{ userName }}</p>
            <p class="">
              到期时间：{{ actTime.replace(/\-/g, "/") | dateFilter("yyyy-MM-dd hh:mm") }}
            </p>
          </div>
        </div>
        <div class="businessCard pt10">
          <div class="infoBox">
            <!-- 启用时间 -->
            <p class="datePicker">
              <span class="fl"> 维护开始：</span>
              <el-time-picker
                class="fl"
                default-value=""
                v-model="userKeyData.timeStart"
                format="HH:mm"
                value-format="HH:mm"
                @change="changesTimeStart"
              >
              </el-time-picker>
            </p>
            <!-- 禁用时间 -->
            <p class="datePicker">
              <span class="fl"> 维护结束：</span>
              <el-time-picker
                class="fl"
                default-value=""
                format="HH:mm"
                value-format="HH:mm"
                v-model="userKeyData.timeEnd"
                @change="changesTimeEnd"
              >
              </el-time-picker>
            </p>
            <!-- appId -->
            <p class="fansKeyInput">
              &nbsp;&nbsp;&nbsp;&nbsp; appId：
              <el-input
                v-model.trim="userKeyData.appId"
                @change="inputChange($event)"
                @blur="blurAppId"
                style="cursor: pointer; width: 69%"
              ></el-input>
            </p>

            <!-- 粉丝口令 -->
            <span
              class=""
              v-if="
                userKeyData.timeEnd == '00:00' &&
                userKeyData.timeStart == '00:00'
              "
            >
            </span>
            <p class="fansKeyInput" v-else>
              粉丝口令：
              <el-input
                onkeyup="value=value.replace(/[^0-9]/gi,'')"
                v-model.trim="userKeyData.fansKey"
                placeholder="粉丝口令只能输入数字"
                @blur="blurFansKey"
                maxlength="6"
                style="cursor: pointer; width: 69%"
                @change="inputChange($event)"
              ></el-input>
            </p>
            <!-- 制接口URL -->
            <p
              data-clipboard-action="copy"
              :data-clipboard-text="userKeyData.safeKey"
              @click="copyLink"
              class="of-hidden"
              id="cobyOrderSn"
            >
              <span class="fl">URL：</span>
              <el-tooltip content="单击文字复制接口URL" placement="top"
                ><span class="fl w72 white-space">{{
                  userKeyData.safeKey
                }}</span>
              </el-tooltip>
            </p>
            <!-- token： -->
            <p class="">token：{{ userKeyData.token }}</p>
          </div>
        </div>
      </div>
      <div v-else class="releaseBox tc">
        <div>
          <label>关键词语:</label>
          <el-input
            class="wb70"
            maxlength="15"
            placeholder="请输入关键词语"
            v-model="inputCrux"
            clearable
            @change="inputChange($event)"
          >
          </el-input>
        </div>
        <div>
          <label style="vertical-align: text-bottom">模版内容:</label>
          <el-input
            class="wb70"
            type="textarea"
            placeholder="请输入模版内容"
            @change="inputChange($event)"
            v-model="textareaCon"
          >
          </el-input>
        </div>
        <div class="releaseBtn tr">
          <el-button
            @click="clickDetailsAdd"
            size="small"
            icon="el-icon-receiving"
            >发布</el-button
          >
        </div>
      </div>
    </van-popup>
    <!-- 编辑框 -->
    <van-popup
      closeable
      v-model="showEditPopup"
      position="bottom"
      :style="{ height: '60%', overflow: 'hidden' }"
    >
      <!-- 修改list弹框 -->
      <div class="Tip">
        <div class="tip-top tl clear pb10">
          <p class="">
            <span class="fl">修改内容</span>
          </p>
        </div>
        <div class="tipConten">
          <!--角色名称-->
          <p>关键词语</p>
          <el-input
            placeholder="请输入关键词语"
            v-model="inputListCrux"
            clearable
              :disabled="true"
          >
          </el-input>
          <p>模版内容</p>
          <el-input
            :disabled="searchId === 8 ? true : false"
            style="height: 100px"
            type="textarea"
            placeholder="请输入模版内容"
            v-model="textareaListCon"
          >
          </el-input>
        </div>
        <div class="tip-bottom tc">
          <el-button @click="clickUpdateTemList" type="primary" class=""
            >保存</el-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Dialog, Notify } from "vant";
import {
  getUsertemplate,
  getSelect,
  getDetailsTempWithId,
  patchDetailsUpdateTemDetails,
  postDetailsAdd,
  removeTemDetails,
  getUserkeyList,
  patchUserkeyFresh,
} from "../api/api";

export default {
  name: "mobileMain",
  components: {},
  data() {
    return {
      position: "left",
      isShowTis: 2,
      showUserPopup: false,
      showEditPopup: false,
      showPopover: false,
      actions: [{ text: "编辑" }, { text: "置顶" }, { text: "删除" }],
      removelist: [],
      multipleSelection: [],
      uploadProp: true,
      isIndeterminate: true,
      checkAll: false,
      drawerId: "",
      drawerTitle: "",
      inputKeyword: "",
      inputKeywordToValue: "",
      loadingBtn: false,
      drawer: false,
      actTime: "",
      editId: "",
      index: "",
      userName: "",
      inputName: "",
      switchZt: false,
      editableTabsValue: "0",
      editableTabs: [],
      listData: [],
      activeName: 0,
      username: sessionStorage.getItem("username"),
      //模版
      templateList: [],
      loading: true,
      desc: "",
      examineTip: false, //新建弹框R
      textareaCon: "",
      inputCrux: "",
      inputListCrux: "",
      textareaListCon: "",
      editListId: "",
      userKeyData: {
        appId: "",
        token: "",
        safeKey: "",
        timeStart: "",
        timeEnd: "",
        fansKey: "",
        keywordId: "",
        secretKey: "",
      },
      fansKey: "",
      appId: "",

      noticeArr: [],
      loading: true,
      finished: false,
      //用户全部信息
      getTempWithIdData: {
        limit: 10,
        page: 1,
        templateId: "",
      },
        searchId: 0,
    };
  },
  created: function () {},
  mounted() {
    //加载后
    this.userInit();
  },
  methods: {
  
    inputChange($event) {
      this.$forceUpdate();
    },
    //点击复制
    copyLink() {
      let _this = this;
      setTimeout(function () {
        let clipboard = new _this.clipboard("#cobyOrderSn");
        clipboard.on("success", function () {});
        // 主要通知
        Notify({ type: "primary", message: "URL已复制" });
      }, 1500);
    },
    //其实起始时间修改
    changesTimeStart(v) {
      //把修改时间赋值给变量
      if (v == null) {
        this.userKeyData.timeStart = "00:00";
      } else {
        this.userKeyData.timeStart = v;
      }
      //拼接修改数据
      let data = {
        keywordId: this.userKeyData.keywordId,
        secretKey: this.userKeyData.secretKey,
        startTime: this.userKeyData.timeStart,
        endTime: this.userKeyData.timeEnd,
        fansKey: this.userKeyData.fansKey,
        appId: this.userKeyData.appId,
      };
      patchUserkeyFresh(data).then((res) => {
        if (res.data.status == 200) {
          this.userkeyList();
          // 成功通知
          Notify({ type: "success", message: "开启时间修改成功" });
        } else {
          // 失败通知
          Notify({ type: "warning", message: res.data.msg });
        }
      });
    },
    changesTimeEnd(v) {
      //把修改时间赋值给变量
      if (v == null) {
        this.userKeyData.timeEnd = "00:00";
      } else {
        this.userKeyData.timeEnd = v;
      }

      //拼接修改数据
      let data = {
        keywordId: this.userKeyData.keywordId,
        secretKey: this.userKeyData.secretKey,
        startTime: this.userKeyData.timeStart,
        endTime: this.userKeyData.timeEnd,
        fansKey: this.userKeyData.fansKey,
        appId: this.userKeyData.appId,
      };
      patchUserkeyFresh(data).then((res) => {
        if (res.data.status == 200) {
          this.userkeyList();
          // 成功通知
          Notify({ type: "success", message: "结束时间修改成功" });
        } else {
          // 失败通知
          Notify({ type: "warning", message: res.data.msg });
        }
      });
    },
    //粉丝口令文字修改时
    blurFansKey(v) {
      //把修改时间赋值给变量
      //拼接修改数据
      if (this.userKeyData.fansKey != this.fansKey) {
        if (this.$num.test(this.userKeyData.fansKey)) {
          let data = {
            keywordId: this.userKeyData.keywordId,
            secretKey: this.userKeyData.secretKey,
            startTime: this.userKeyData.timeStart,
            endTime: this.userKeyData.timeEnd,
            fansKey: this.userKeyData.fansKey,
            appId: this.userKeyData.appId,
          };
          patchUserkeyFresh(data).then((res) => {
            if (res.data.status == 200) {
              this.userkeyList();
              // 成功通知
              Notify({ type: "success", message: "粉丝口令修改成功" });
            } else {
              // 失败通知
              Notify({ type: "warning", message: res.data.msg });
            }
          });
        } else {
          this.userkeyList();
        }
      }
    },
    //appId文字修改时
    blurAppId(v) {
      //把修改时间赋值给变量
      //拼接修改数据
      if (this.userKeyData.appId != this.appId) {
        let data = {
          keywordId: this.userKeyData.keywordId,
          secretKey: this.userKeyData.secretKey,
          startTime: this.userKeyData.timeStart,
          endTime: this.userKeyData.timeEnd,
          fansKey: this.userKeyData.fansKey,
          appId: this.userKeyData.appId,
        };
        patchUserkeyFresh(data).then((res) => {
          if (res.data.status == 200) {
            this.userkeyList();
            // 成功通知
            Notify({ type: "success", message: "appId修改成功" });
          } else {
            // 失败通知
            Notify({ type: "warning", message: res.data.msg });
          }
        });
      }
    },
    //模版信息
    userInit() {
      let data = { username: JSON.stringify(this.username) };
      getUsertemplate(data).then((res) => {
        if (res.data.status == 200) {
          //模版
          this.templateList = res.data.data;
          //判断模版是否有信息
          if (this.templateList.length != 0) {
            //默认传一个id给列表显示
            this.getTempWithIdData.templateId = this.templateList[0].templateid;
            this.getTempWithId(this.getTempWithIdData);
          }
        } else if (res.data.status == -99) {
          // 成功通知
          Notify({ type: "warning", message: res.data.msg });
        } else {
          // 失败通知
          Notify({ type: "warning", message: res.data.msg });
        }
      });
    },
    //用户信息
    userSelect() {
      let data = { username: this.username };
      getSelect(data).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.actTime = res.data.data.records[0].actTime;
          this.userName = res.data.data.records[0].username;
        } else {
          // 失败通知
          Notify({ type: "warning", message: res.data.msg });
        }
      });
    },
    //appid
    userkeyList() {
      getUserkeyList(this.username).then((res) => {
        if (res.data.status == 200) {
          //信息赋值
          this.userKeyData = {
            safeKey: res.data.data.userSafeKey,
            token: res.data.data.userToken,
            fansKey: res.data.data.fansKey,
            timeStart: res.data.data.startTime.replace(/\-/g, "/"),
            timeEnd: res.data.data.endTime.replace(/\-/g, "/"),
            keywordId: res.data.data.keywordId,
            secretKey: res.data.data.secretKey,
            appId: res.data.data.appId,
          };
          //拿来做显示input鼠标移出走接口
          this.fansKey = res.data.data.fansKey;
          //拿来做显示input鼠标移出走接口
          this.appId = res.data.data.appId;
        } else {
          // 失败通知
          Notify({ type: "warning", message: res.data.msg });
        }
      });
    },
    //列表
    getTempWithId() {
      setTimeout(() => {
        getDetailsTempWithId(this.getTempWithIdData).then((res) => {
          if (res.data.status == 200) {
            let _this = this;
            res.data.data.records.forEach((v) => {
              _this.listData.push(v);
            });
            this.getTempWithIdData.page += 1;
          } else {
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完
          if (res.data.data.total == this.listData.length) {
            this.finished = true;
          }
        });
      }, 1000);
    },
    //置顶
    clickTopping(v, d) {
      let params = {
        temdetailsId: v,
        temdetailsstatus: d,
      };
      patchDetailsUpdateTemDetails(params).then((res) => {
        if (res.data.status == 200) {
          this.listData = [];
          this.getTempWithIdData.page = 1;
          //初始化
          this.getTempWithId();
          // 成功通知
          Notify({ type: "success", message: "置顶成功" });
        } else {
          // 失败通知
          Notify({ type: "warning", message: res.data.msg });
        }
      });
    },
    //删除
    deleteConfirm(v, index) {
      this.removelist.push(v);
      Dialog.confirm({
        title: "删除提示",
        message: "确定删除？",
      })
        .then(() => {
          removeTemDetails(this.removelist).then((res) => {
            if (res.data.status == 200) {
              this.listData.splice(index, 1);
              // 成功通知
              Notify({ type: "success", message: "删除成功" });
            } else {
              // 失败通知
              Notify({ type: "warning", message: res.data.msg });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //点击修改列表信息
    clickUpdateTemList() {
      let params = {
        temdetailsId: this.editListId,
        keyword: this.inputListCrux,
        keywordToValue: this.textareaListCon,
      };
      patchDetailsUpdateTemDetails(params).then((res) => {
        if (res.data.status == 200) {
          // 成功通知
          Notify({ type: "success", message: "操作成功" });
           this.listData = [];
            this.getTempWithIdData.page = 1;
            this.getTempWithId();
        } else {
          // 失败通知
          Notify({ type: "warning", message: res.data.msg });
        }
        this.showEditPopup = false; //弹框关闭
      });
    },
    //开启list列表弹框
    examineTipListOn: function (index, Id,searchId) {
      console.log(this.searchId)
      this.searchId=searchId;
      this.editListId = Id;
      this.index = index;
      //点击编辑的那一行数据
      let r = this.listData[this.index];
      this.inputListCrux = r.keyword;
      this.textareaListCon = r.keywordToValue;
      this.showEditPopup = true; //弹框开启
    },
    //禁用
    enableChange(index, v) {
      console.log(v);
      let params = {
        temdetailsId: v.temdetailsId,
        enableFlag: v.enableFlag,
      };
      patchDetailsUpdateTemDetails(params).then((res) => {
        if (res.data.status == 200) {
          // 成功通知
          Notify({ type: "success", message: "操作成功" });
        } else {
          // 失败通知
          Notify({ type: "warning", message: res.data.msg });
        }
      });
    },
    clickPopup(v) {
      this.showUserPopup = true;
      if (v == "qr") {
        this.isShowTis = 0;
        this.position = "left";
        this.userSelect();
        this.userkeyList();
      } else {
        this.isShowTis = 1;
        this.position = "right";
      }
    },
    //添加list详情信息
    clickDetailsAdd() {
      if (!this.inputCrux || !this.textareaCon) {
        this.error("发布数据不能为空！");
      } else {
        let params = {
          templateId: this.getTempWithIdData.templateId,
          keyword: this.inputCrux,
           keywordToValue: this.replaceSrc(this.textareaCon),
        };
        postDetailsAdd(params).then((res) => {
          if (res.data.status == 200) {
            this.listData = [];
            this.getTempWithIdData.page = 1;
            this.getTempWithId();
            this.showUserPopup = false;
            // 成功通知
            Notify({ type: "success", message: "添加成功" });
          } else {
            // 失败通知
            Notify({ type: "warning", message: res.data.msg });
          }
        });
        this.inputCrux = "";
        this.textareaCon = "";
      }
    },
      //文本添加a标签
    replaceSrc(txt) {
      var ret = /<a[^>]*href=[ '"]([^"]*)[' "][^>]*>(.*?)<\/a>/g;
      var reg = /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi;
      if (!ret.test(txt)) {
        var result = txt.replace(reg, function (item) {
          return `<a href="${item}" target="_blank">资源链接</a>`;
        });
        return result;
      } else {
        return txt;
      }
    },
  },
};
</script>
<style lang="less" type="text/less">
.mobileMain {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f4f4f4;
  overflow-y: scroll;
  .mainBox {
    .head {
      width: 100%;
     
    }
    .listBox {
      width: 100%;
      height: 100%;

      .listItem {
        padding: 0 16px;
        margin-bottom: 15px;
        background: #fff;
        .intemTop {
          padding: 8px 0px;
          .icon-weapp {
            top: 15px;
            right: 25px;
          }
        }
        .intemText {
          margin: 30px 0;

          p {
            font-size: 18px;
            line-height: 20px;
            letter-spacing: 1.5px;
            word-wrap: break-word;
          }
        }
      }
    }
  }
  .icon-d-col {
    vertical-align: middle;
    margin-right: 6px;
  }
  .row {
    text-align: center;
    font-size: 14px;
    line-height: 50px;
  }
  .keywirdColor333 {
    color: #333;
    padding-bottom: 5px;
    font-weight: bold;
  }
  .keywirdColorRed {
    color: red;
    padding-bottom: 5px;
    font-weight: bold;
  }
}
.Tip {
  height: 100%;
  padding: 20px;
  .tip-top {
    p {
      color: #333333;
      letter-spacing: 0.17px;
      line-height: 30px;
      height: 30px;
      ont-family: PingFangSC-Semibold;
      font-size: 20px;
    }
    .t-txt {
      font-size: 12px;
      color: #999999;
      letter-spacing: 0.08px;
      display: block;
    }
  }

  .tipConten {
    line-height: 44px;
    p {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #9299ab;
      letter-spacing: 0.1px;
    }
  }
  .tip-bottom {
    margin-top: 30px;
  }
}
.asideBox {
  color: #333;
  margin: 20px 30px;
  height: 100%;
  .businessCard {
    .infoBox {
      line-height: 55px;
      background: #fff;
      .img {
        border-radius: 25px;
        width: 50px;
        height: 50px;
        background: #000;
        margin: 0 20px;
      }
      span {
        margin: 0 auto;
        display: block;
        text-align: center;
      }
      p {
        width: 100%;
        text-align: left;
        display: inline-block;
        color: #333333;
        font-size: 16px;
        padding: 2px 0;
      }
    }
  }
}
.releaseBox {
  overflow: hidden;
  padding: 60px 30px;
  line-height: 85px;
  .releaseBtn {
    text-align: center;
  }
}
</style>
