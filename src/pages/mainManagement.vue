<template>
  <div class="mainManagement">
    <el-container style="overflow-y: scroll; height: 100vh">
      <el-header>
        <!-- <div class="headerImg" /> -->
        <div class="header pr">
          <p class="pa">注意事项</p>
          <ul>
            <li>
              1.appId从公众号后台获取，填写后，复制URL及Token
              即可在公众号后台配置自动回复
            </li>
            <li>2.维护时间（0：00-0：00 全天关闭，其他相同时间为全天开启）</li>
            <li>
              3.粉丝口令(设置口令后，粉丝需输入口令+空格+片名 获取资源 。口令为
              000000 则关闭)
            </li>
            <li>4.隐藏资源（设置需要隐藏的资源 资源以空格分隔）</li>
            <li>
              5.头部广告、底部广告 （可设置公众号粉丝发送消息对话框首页内容）
            </li>
            <li>6.web头部、web底部 （设置 web页面首尾内容）</li>
          </ul>
        </div>
      </el-header>
      <div>
        <el-container>
          <el-aside>
            <div class="businessCard">
              <div class="infoBox">
                <el-avatar>{{ userName }}</el-avatar>
                <p class="">用户名称：{{ userName }}</p>
                <p class="">
                  到期时间：{{ actTime | dateFilter("yyyy-MM-dd hh:mm") }}
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
                  appId：
                  <el-input
                    v-model.trim="userKeyData.appId"
                    @change="inputChange($event)"
                    @blur="blurAppId"
                    style="cursor: pointer"
                  ></el-input>
                  <el-tooltip content="appId可编辑" placement="top"
                    ><i
                      class="el-popconfirm__icon el-icon-info"
                      style="color: red"
                    ></i
                  ></el-tooltip>
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
                    style="cursor: pointer"
                    @change="inputChange($event)"
                  ></el-input>
                  <el-tooltip content="粉丝口令可编辑" placement="top"
                    ><i
                      class="el-popconfirm__icon el-icon-info"
                      style="color: red"
                    ></i
                  ></el-tooltip>
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
                <!-- appId -->
                <!-- <p class="fansKeyInput">
                  搜索开关：<el-switch
                    @change="searclick"
                    v-model="userKeyData.searchValue"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                </p> -->
              </div>
            </div>
            <div class="template">
              <h3>创建模版</h3>
              <el-collapse
                class="pr"
                accordion
                @change="changeTemplate(item.templateid, index)"
                v-model="activeName"
                v-for="(item, index) in templateList"
                :key="index"
              >
                <i
                  class="pa"
                  :class="item.templatestatus == true ? 'lv_icon' : 'hong_icon'"
                ></i>

                <el-collapse-item :name="index">
                  <template slot="title">
                    <p>{{ item.templatename }}</p>
                  </template>
                  <el-button
                    @click="examineTipOn(index, item.templateid)"
                    size="mini"
                    type="warning"
                    >修改
                  </el-button>
                  <el-button
                    @click="deleteDdrop(item.templateid)"
                    size="mini"
                    type="danger"
                    >删除
                  </el-button>
                </el-collapse-item>
              </el-collapse>
              <div class="w100" style="padding: 5px 0">
                <el-button
                  size="mini"
                  icon="el-icon-plus"
                  type="primary"
                  @click="examineTipOn(-1)"
                  >新建模版
                </el-button>
              </div>
            </div>
            <div class="template bgfff">
              <ul>
                <li>
                  <a
                    class="jiancha"
                    href="https://beian.miit.gov.cn/#/Integrated/index"
                    target="_blank"
                    >京ICP备2020038704号</a
                  >
                </li>
                <li>
                  <a
                    class="jiancha"
                    href="http://www.beian.gov.cn/portal/index"
                    target="_blank"
                    ><img
                      style="width: 20px; height: 20px"
                      src="../assets/img/jh.png"
                    />京公网安备 11010802033236号</a
                  >
                </li>
              </ul>
            </div>
          </el-aside>
          <el-main>
            <div class="releaseBox tc">
              <div>
                <label>关键词语:</label>
                <el-input
                  class="wb70"
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
                  placeholder="添加a标签案例<a style='color:#66CCFF'></a>"
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
                <el-button
                  @click="clickSearch"
                  size="small"
                  icon="el-icon-search"
                  >搜索</el-button
                >
              </div>
            </div>
            <div class="pb20 pr">
              <!--
                           <el-button size="small" type="danger">重置对接数</el-button>
                        -->
              <input
                class="file"
                type="file"
                id="fileExport"
                multiple="multiple"
                @change="clickExcelimport"
                ref="inputer"
              />
              <el-button @click="clickExcelexport" size="small" type="primary"
                >导出数据</el-button
              >
              <el-button size="small" type="primary">导入数据</el-button>
              <el-button
                size="small"
                type="danger"
                @click="clickAllRemoveTemDetails()"
                >批量删除</el-button
              >
            </div>

            <el-table
              id="fpage"
              ref="multipleTable"
              :data="listData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="30"> </el-table-column>
              <el-table-column label="" width="45">
                <template slot-scope="scope">
                  <el-tooltip
                    :content="
                      scope.row.enableFlag == true ? '状态:开启' : '状态:禁用'
                    "
                    placement="top"
                  >
                    <el-switch
                      v-model="scope.row.enableFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      @change="enableChange(scope.$index, scope.row)"
                    >
                    </el-switch>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="" width="90">
                <!-- showOrder -->
                <template slot-scope="scope"
                  ><p
                    :class="
                      scope.row.showOrder != 0
                        ? 'keywirdColorRed'
                        : 'keywirdColor333'
                    "
                  >
                    {{ scope.row.keyword }}
                  </p>
                  <p>
                    {{ scope.row.createtime | dateFilter("yyyy-MM-dd") }}
                  </p></template
                >
              </el-table-column>
              <el-table-column prop="name" label="" width="465">
                <template slot-scope="scope">
                  <p v-html="scope.row.keywordToValue">
                    {{ scope.row.keywordToValue }}
                  </p>
                  <div class="main-bottom">
                    <el-button
                      :class="
                        scope.row.showOrder != 0
                          ? 'displayNone'
                          : 'displayBlock'
                      "
                      size="mini"
                      type="warning"
                      @click="clickCheckdetail(scope.row.temdetailsId)"
                      >失效数据
                    </el-button>
                    <el-button
                      size="mini"
                      type="warning"
                      @click="
                        examineTipListOn(
                          scope.$index,
                          scope.row.temdetailsId,
                          scope.row.showOrder
                        )
                      "
                      >修改
                    </el-button>
                    <el-button
                      :class="
                        scope.row.showOrder != 0
                          ? 'displayNone'
                          : 'displayBlock'
                      "
                      @click="clickRemoveTemDetails(scope.row.temdetailsId)"
                      size="mini"
                      type="danger"
                      >删除
                    </el-button>
                    <el-button
                      size="mini"
                      v-if="scope.row.temdetailsstatus == false"
                      type="primary"
                      @click="clickTopping(scope.row.temdetailsId, true)"
                      >置顶
                    </el-button>
                    <el-button
                      size="mini"
                      v-else
                      type="danger"
                      @click="clickTopping(scope.row.temdetailsId, false)"
                      >取消置顶
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="fr page"
              :total="total"
              :page-size="count"
              :current-page.sync="currentPage"
              background
              layout="total,->,prev, pager, next"
              @current-change="changePage"
            >
            </el-pagination>
            <!--侧边栏-->
            <el-drawer
              :title="drawerTitle"
              :visible.sync="drawer"
              :with-header="false"
            >
              <div class="drawerBox">
                <div class="tipConten">
                  <!--角色名称-->
                  <p>关键词</p>
                  <el-input
                    maxlength="20"
                    v-model="inputKeyword"
                    placeholder="关键词"
                    @change="inputChange($event)"
                  ></el-input>
                </div>
                <div class="tipConten">
                  <!--角色名称-->
                  <p>内容</p>
                  <el-input
                    placeholder="内容"
                    @change="inputChange($event)"
                    type="textarea"
                    v-model="inputKeywordToValue"
                  ></el-input>
                </div>
              </div>
              <div class="drawerBtn">
                <el-button @click="drawer = true">取 消</el-button>
                <el-button type="primary" @click="clickUpdateTemDetails"
                  >确 定</el-button
                >
              </div>
            </el-drawer>
          </el-main>
        </el-container>
      </div>
    </el-container>
    <!-- 修改模版弹框 -->
    <transition name="el-fade-in-linear" class="fade">
      <div class="Tip" v-show="examineTip">
        <div class="bg"></div>
        <div class="TipBox" style="height: 340px">
          <div class="tip-m">
            <div class="tip-top tl clear pb10">
              <p class="">
                <span class="fl">新建角色</span>
                <span class="fr fs13" @click="examineTipOff"
                  ><i class="iconfont iconguanbi cursor"></i
                ></span>
              </p>
            </div>
            <div class="tipConten">
              <!--角色名称-->
              <p>模版名称</p>
              <el-input
                maxlength="20"
                v-model.trim="inputName"
                placeholder="模版名称"
                @change="inputChange($event)"
              ></el-input>
              <p>状态</p>
              <el-switch @input="onSwitch" v-model="switchZt"></el-switch>
            </div>
            <div class="tip-bottom tc">
              <el-button @click="addTemplatetouser()" type="primary" class=""
                >保存</el-button
              >
              <el-button
                class="ml10"
                @click="examineTipOff"
                type="primary"
                plain
                >关闭</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 修改list弹框 -->
    <transition name="el-fade-in-linear" class="fade">
      <div class="Tip" v-show="examineListTip">
        <div class="bg"></div>
        <div
          class="TipBox"
          style="height: 480px; width: 600px; min-width: 600px"
        >
          <div class="tip-m">
            <div class="tip-top tl clear pb10">
              <p class="">
                <span class="fl">修改内容</span>
                <span class="fr fs13" @click="examineTipListOff"
                  ><i class="iconfont iconguanbi cursor"></i
                ></span>
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
                type="textarea"
                placeholder="请输入模版内容"
                v-model="textareaListCon"
                @change="inputChange($event)"
              >
              </el-input>
            </div>
            <div class="tip-bottom tc">
              <el-button @click="clickUpdateTemList" type="primary" class=""
                >保存</el-button
              >
              <el-button
                class="ml10"
                @click="examineTipListOff"
                type="primary"
                plain
                >关闭</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  getUsertemplate,
  postTemplateAddtouser,
  getSelect,
  postTemplateDdrop,
  patchTemplateRefresh,
  getDetailsTempWithId,
  patchDetailsUpdateTemDetails,
  postDetailsAdd,
  removeTemDetails,
  getDetailsExcelexport,
  getCheckdetail,
  postExcelimport,
  getSearch,
  getUserkeyList,
  patchUserkeyFresh,
  POST_NoticeSelect,
} from "../api/api";

export default {
  name: "mainManagement",
  components: {},
  data() {
    return {
      //用户全部信息
      currentPage: 1,
      total: 0, //总数
      count: 20,
      limit: 20,
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
      templateId: "",
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
      examineListTip: false, //修改list列表弹框
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
      templateListLength: 0,
      searchId: 0,
    };
  },
  created: function () {
    //加载前
  },
  mounted() {
    //判断是pc还是移动端
    var useragent = navigator.userAgent.toLowerCase();
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      //跳转列表
      this.$router.push("/mobileMain");
    } else {
      //加载后
      this.userInit();
      this.noticeSelect();
    }

    //模版 列表联动初始化
    // if (sessionStorage.getItem("aciveId") == null) {
    //   this.activeName = 0;
    // } else {
    //   this.activeName = Number(sessionStorage.getItem("aciveId"));
    // }
  },
  methods: {
    searclick(v) {
      let data = {
        keywordId: this.userKeyData.keywordId,
        secretKey: this.userKeyData.secretKey,
        startTime: this.userKeyData.timeStart,
        endTime: this.userKeyData.timeEnd,
        fansKey: this.userKeyData.fansKey,
        appId: this.userKeyData.appId,
        searchFlag: v,
      };
      patchUserkeyFresh(data).then((res) => {
        if (res.data.status == 200) {
          this.success("搜索开关操作成功！");
          this.userkeyList();
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //通知
    noticeSelect() {
      //参数
      let data = {
        page: "",
      };
      POST_NoticeSelect(data).then((res) => {
        let noticeStr = "";
        if (res.data.status == 200) {
          this.noticeArr = res.data.data.records;
          res.data.data.records.forEach(function (v) {
            noticeStr += '<p class="notice_p">' + v.notifyText + "</p>";
          });
          this.$notify({
            title: "通知",
            duration: 0,
            type: "warning",
            dangerouslyUseHTMLString: true,
            message: noticeStr,
          });
        }
      });
    },
    remove(tagNumber) {
      console.log(1);
      // 业务逻辑
    },
    copyLink() {
      let _this = this;
      setTimeout(function () {
        let clipboard = new _this.clipboard("#cobyOrderSn");
        clipboard.on("success", function () {});
        _this.success("URL已复制");
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
          this.success("开启时间修改成功！");
          this.userkeyList();
        } else {
          this.error(res.data.msg);
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
          this.success("结束时间修改成功！");
          this.userkeyList();
        } else {
          this.error(res.data.msg);
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
              this.success("粉丝口令修改成功！");
              this.userkeyList();
            } else {
              this.error(res.data.msg);
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
            this.success("appId修改成功！");
            this.userkeyList();
          } else {
            this.error(res.data.msg);
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
          //用来判断模版是否可以删除
          this.templateListLength = this.templateList.length;
          //判断模版是否有信息
          if (this.templateList.length != 0) {
            //默认传一个id给列表显示
            this.templateId = this.templateList[0].templateid;
            let data = {
              limit: this.limit,
              page: this.currentPage,
              templateId: this.templateId,
            };
            this.getTempWithId(data);
            this.userSelect();
            this.userkeyList();
          }
        } else if (res.data.status == -99) {
          this.alertMeg(res.data.msg);
        } else {
          this.error(res.data.msg);
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
          this.error(res.data.msg);
        }
      });
    },
    //查询信息
    userkeyList() {
      getUserkeyList(this.username).then((res) => {
        if (res.data.status == 200) {
          //信息赋值
          this.userKeyData = {
            safeKey: res.data.data.userSafeKey,
            token: res.data.data.userToken,
            fansKey: res.data.data.fansKey,
            timeStart: res.data.data.startTime,
            timeEnd: res.data.data.endTime,
            keywordId: res.data.data.keywordId,
            secretKey: res.data.data.secretKey,
            appId: res.data.data.appId,
          };
          //拿来做显示input鼠标移出走接口
          this.fansKey = res.data.data.fansKey;
          //拿来做显示input鼠标移出走接口
          this.appId = res.data.data.appId;
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //新增模版信息
    addTemplatetouser() {
      if (this.index == "-1") {
        let params = {
          templatename: this.inputName,
          templatestatus: this.switchZt,
        };
        postTemplateAddtouser(params).then((res) => {
          //console.log(res)
          if (res.data.status == 200) {
            this.success("新建成功！");
            this.userInit();
          } else {
            this.error(res.data.msg);
          }
          this.examineTipOff();
        });
      } else {
        let params = {
          templatename: this.inputName,
          templatestatus: this.switchZt,
          templateid: this.editId,
        };
        patchTemplateRefresh(params).then((res) => {
          if (res.data.status == 200) {
            this.success("修改成功！");
            //初始化
            this.userInit();
          } else {
            this.error(res.data.msg);
          }
          this.examineTipOff();
        });
      }
    },
    //删除模版信息
    deleteDdrop(v) {
      if (this.templateListLength == 1) {
        this.error("模版不能删除");
      } else {
        this.$confirm("此操作将永久删除模版联动列表信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            postTemplateDdrop(v).then((res) => {
              if (res.data.status == 200) {
                this.success("删除成功！");
                this.activeName = 0;
                //初始化
                this.userInit();
                this.userSelect();
                //列表数据清空
                this.listData = [];
              } else {
                this.error(res.data.msg);
              }
            });
          })
          .catch(() => {});
      }
    },
    //列表
    getTempWithId(v) {
      getDetailsTempWithId(v).then((res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.listData = res.data.data.records;
          //总条数
          this.total = res.data.data.total;
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //点击模版显示当前列表详情
    changeTemplate(v, index) {
      //折板下标
      sessionStorage.setItem("aciveId", index);
      //折板id
      this.templateId = v;
      let data = {
        limit: this.limit,
        page: this.currentPage,
        templateId: v,
      };
      this.getTempWithId(data);
    },
    //置顶
    clickTopping(v, d) {
      let params = {
        temdetailsId: v,
        temdetailsstatus: d,
      };
      patchDetailsUpdateTemDetails(params).then((res) => {
        if (res.data.status == 200) {
          this.success("置顶成功！");
          //初始化
          let data = {
            limit: this.limit,
            page: this.currentPage,
            templateId: this.templateId,
          };
          this.getTempWithId(data);
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //侧边框
    clickDrawer(id, t, n) {
      this.drawerTitle = t;
      this.drawerId = id;
      this.drawer = true;
      this.inputKeyword = t;
      this.inputKeywordToValue = n;
    },
    //点击修改模版信息
    clickUpdateTemDetails() {
      let params = {
        temdetailsId: this.drawerId,
        keyword: this.inputKeyword,
        keywordToValue: this.inputKeywordToValue,
      };
      patchDetailsUpdateTemDetails(params).then((res) => {
        if (res.data.status == 200) {
          this.success("修改成功！");
          //初始化
          let data = {
            limit: this.limit,
            page: this.currentPage,
            templateId: this.templateId,
          };
          this.getTempWithId(data);
        } else {
          this.error(res.data.msg);
        }
        this.drawer = false;
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
          this.success("修改成功！");
          //初始化
          let data = {
            limit: this.limit,
            page: this.currentPage,
            templateId: this.templateId,
          };
          this.getTempWithId(data);
        } else {
          this.error(res.data.msg);
        }
        this.examineTipListOff();
      });
    },
    //添加模版详情信息
    clickDetailsAdd() {
      if (!this.inputCrux || !this.textareaCon) {
        this.error("发布数据不能为空！");
      } else {
        let params = {
          templateId: this.templateId,
          keyword: this.inputCrux,
          keywordToValue: this.replaceSrc(this.textareaCon),
        };
        postDetailsAdd(params).then((res) => {
          if (res.data.status == 200) {
            this.success("添加成功！");
            this.userInit();
          } else {
            this.error(res.data.msg);
          }
        });
        this.inputCrux = "";
        this.textareaCon = "";
      }
    },
    //删除模版详情信息
    clickRemoveTemDetails(v) {
      this.removelist.push(v);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeTemDetails(this.removelist).then((res) => {
            if (res.data.status == 200) {
              this.success("删除成功！");
              this.userInit();
            } else {
              this.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    //失效数据
    clickCheckdetail(v) {
      getCheckdetail(v).then((res) => {
        //console.log(res)
        if (res.data.status == 200) {
          window.open(res.data.data[0]);
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //复选框push数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除模版详情信息
    clickAllRemoveTemDetails() {
      let data = [];
      this.multipleSelection.forEach(function (item) {
        data.push(item.temdetailsId);
      });
      if (data.length != 0) {
        this.$confirm("此操作将永久删除模版联动列表信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            removeTemDetails(data).then((res) => {
              if (res.data.status == 200) {
                this.success("删除成功！");
                this.activeName = Number(sessionStorage.getItem("aciveId"));
                this.userInit();
              } else {
                this.error(res.data.msg);
              }
            });
          })
          .catch(() => {});
      } else {
        this.message("请勾选导出数据");
      }
    },
    //导出
    clickExcelexport() {
      this.message("正在处理");
      let data = [];
      //已选temdetailsId
      this.multipleSelection.forEach(function (item) {
        data.push(item.temdetailsId);
      });
      if (data.length != 0) {
        getDetailsExcelexport(data).then((res) => {
          //创建一个隐藏的a连接，
          const link = document.createElement("a");
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          link.style.display = "none";
          //设置连接
          link.href = URL.createObjectURL(blob);
          link.download = "自定义文件名";
          document.body.appendChild(link);
          //模拟点击事件
          link.click();
          this.drawer = false;
        });
      } else {
        this.message("请勾选导出数据");
      }
    },
    //导入
    clickExcelimport(e) {
      this.message("正在处理");
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0]; // 通过DOM取文件数据
      let size = Math.floor(this.file.size / 1024); //计算文件的大小
      this.formData = new FormData(); //new一个formData事件
      this.formData.append("file", this.file); //将file属性添加到formData里
      this.formData.append("templateId", this.templateId); //将file属性添加到formData里
      //此时formData就是我们要向后台传的参数了
      postExcelimport(this.formData).then((res) => {
        console.log(res);
        if (res.data.status == 500) {
          this.error(res.data.msg);
        } else {
          this.userInit();
          this.$message.success(`上传文件成功`);
        }
        this.formData.delete("file");
        this.formData.delete("templateId");
        e.target.value = "";
      });
      console.log(this.formData);
    },
    //搜索
    clickSearch() {
      let params = {
        templateId: this.templateId,
        keyword: this.inputCrux,
        keywordToValue: this.textareaCon,
      };
      getSearch(params).then((res) => {
        if (res.data.status == 200) {
          this.listData = res.data.data;
        } else {
          this.error(res.data.msg);
        }
      });
      this.inputCrux = "";
      this.textareaCon = "";
    },
    //sw开关回调
    onSwitch(v) {
      this.switchZt = v;
    },
    //开启模版弹框
    examineTipOn: function (index, Id) {
      this.editId = Id;
      this.index = index;
      if (index == "-1") {
        if (this.templateListLength == 1) {
          this.error("功能暂未开放 请等待后续升级！");
        } else {
          this.inputName = "";
          this.switchZt = true;
          this.examineTip = true; //弹框开启
        }
      } else {
        //点击编辑的那一行数据
        let r = this.templateList[this.index];
        this.inputName = r.templatename;
        this.switchZt = r.templatestatus;
        this.searchId = searchId;
        this.examineTip = true; //弹框开启
      }
    },
    //关闭模版弹框
    examineTipOff: function () {
      this.examineTip = false; //弹框关闭
    },
    //开启list列表弹框
    examineTipListOn: function (index, Id, searchId) {
      this.editListId = Id;
      this.index = index;
      //点击编辑的那一行数据
      let r = this.listData[this.index];
      this.inputListCrux = r.keyword;
      this.textareaListCon = r.keywordToValue;
      this.searchId = searchId;
      this.examineListTip = true; //弹框开启
    },
    //关闭list列表弹框
    examineTipListOff: function () {
      this.examineListTip = false; //弹框关闭
    },
    enableChange(index, v) {
      console.log(v);
      let params = {
        temdetailsId: v.temdetailsId,
        enableFlag: v.enableFlag,
      };
      patchDetailsUpdateTemDetails(params).then((res) => {
        if (res.data.status == 200) {
          this.success("修改成功！");
          //初始化
          let data = {
            limit: this.limit,
            page: this.currentPage,
            templateId: this.templateId,
          };
          this.getTempWithId(data);
        } else {
          this.error(res.data.msg);
        }
        this.examineTipListOff();
      });
    },
    //消息弹框
    message: function (v) {
      this.$message({
        message: v,
        type: "warning",
      });
    },
    //消息
    message(v) {
      this.$message(v + "请稍等");
    },
    //input视图更新
    inputChange($event) {
      this.$forceUpdate();
    },
    //文本添加a标签
    replaceSrc(txt) {
      var ret = /<a[^>]*href=[ '"]([^"]*)[' "][^>]*>(.*?)<\/a>/g;
      var reg = /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi;
      if (!ret.test(txt)) {
        var result = txt.replace(reg, function (item) {
          return `<a style="text-decoration:underline;color:#f7971e;" href="${item}" target="_blank">资源链接</a>`;
        });
        return result;
      } else {
        return txt;
      }
    },
    //分页
    changePage(page) {
      //初始化
      let data = {
        limit: this.limit,
        page: page,
        templateId: this.templateId,
      };
      this.getTempWithId(data);
      //切换分页的方法加上下面这句，table就能自动滚到顶部
      location.href = "#fpage";
    },
  },
};
</script>
<style lang="less" type="text/less">
.mainManagement {
  font-size: 13px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("../assets/img/bg-101.jpg");
  background-size: contain;
  background-position: 398%;
}

.file {
  width: 57px;
  position: absolute;
  top: 1px;
  left: 72px;
  opacity: 0;
}

.el-header {
  width: 100%;
  text-align: center;
  height: auto !important;
  margin-bottom: 15px;
  padding: 0;

  .header {
    background: #000;
    p {
      background: #f7971e;
      font-size: 1.625rem;
      color: #000;
      top: 22px;
      left: 45%;
      padding: 3px 10px;
      letter-spacing: 8px;
    }
    ul {
      padding: 80px 0 20px 0;
      margin: 0 26px;
      color: #fff;
      text-align: left;
      li {
        padding-bottom: 5px;
        display: block;
      }
    }
  }
}

.el-aside {
  color: #333;
  text-align: center;
  width: 25% !important;
  .businessCard {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    .infoBox {
      line-height: 25px;
      padding: 20px 0;
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
        width: 85%;
        text-align: left;
        display: inline-block;
        color: #333333;
        font-size: 13px;
        padding: 2px 0;
      }
    }
  }
}

.template {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  margin-top: 10px;
  background: #fff;
  padding: 10px 16px;
  h3 {
    padding-top: 20px;
    font-size: 14px;
    text-align: left;
  }
  ul {
    font-size: 13px;
    li {
      display: flex;
      .templateBox {
        width: 100%;
        padding: 15px 0;
        span {
          display: block;
        }
      }
    }
  }
}

.el-main {
  overflow-y: hidden;
  background-color: #fff;
  color: #333;
  margin-left: 15px;
  ul {
    li {
      margin-bottom: 15px;
      .liBox {
        padding: 0 20px;
        .main-left {
          line-height: 20px;
          width: 20%;
          height: inherit;
          .span-date {
            display: block;
            font-size: 12px;
          }
        }
        .main-in {
          width: 80%;
          p {
            overflow-x: hidden;
            margin-top: 10px;
            font-size: 13px;
          }
        }
      }
    }
  }
}

.Tip {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .bg {
    position: absolute;
    background-color: #000;
    opacity: 0.3;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  .TipBox {
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #fff;
    width: 380px;
    min-width: 380px;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1;
    color: #000000;
    .tip-m {
      margin: 25px;
      .tip-top {
        p {
          color: #333333;
          letter-spacing: 0.17px;
          line-height: 30px;
          height: 30px;
          ont-family: PingFangSC-Semibold;
          font-size: 16px;
        }
        .t-txt {
          font-size: 12px;
          color: #999999;
          letter-spacing: 0.08px;
          display: block;
        }
      }
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

.releaseBox {
  overflow: hidden;
  padding: 0 30px;
  line-height: 85px;
  .el-textarea__inner {
    height: 90px;
    resize: none;
  }
  .releaseBtn {
    margin: 0 11%;
  }
}
.TipBox {
  .el-textarea__inner {
    height: 180px;
    resize: none;
  }
}

.el-container.is-vertical {
  margin: 0 15%;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333333;
}

.el-button--mini,
.el-button--mini.is-round {
  padding: 3px 5px;
}

.el-card {
  border: none !important;
}

.el-card__body {
  padding: 0;
}

.el-collapse {
  border: none;
}

.el-collapse-item__wrap {
  border: none;
  background-color: #fff !important;
}

.el-collapse-item__header {
  border-bottom: 1px solid #fff !important;
  background-color: #fff !important;
}

.el-drawer__body {
  position: relative;
  .drawerBox {
    padding: 0 10%;
    line-height: 45px;
    .el-textarea__inner {
      height: 450px;
    }
  }
  .drawerBtn {
    position: absolute;
    bottom: 2%;
    width: 100%;
    text-align: center;
    button {
      width: 40% !important;
    }
  }
}

.el-button--mini {
  padding: 3px 7px !important;
}

.el-button--small {
  padding: 7px 4px !important;
  cursor: default;
}

.el-table__body {
  font-size: 13px;
  width: 100% !important;
}

.main-bottom {
  text-align: right;
  display: inline-block;
  width: 100%;
  padding: 15px 0 5px 0;
}

.el-table td,
.el-table th {
  padding: 5px 0 !important;
}
.el-table .cell {
  width: 100% !important;
}
.jiancha {
  font-size: 12px;
  margin: 0 0 10px 0 !important;
  color: #fff;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #fff;
  }
}

.bgfff {
  background-color: transparent !important;
  box-shadow: none !important;
}
.hong_icon {
  display: block;
  width: 8px;
  min-width: 0;
  height: 8px;
  background-color: #ee0a24;
  border-radius: 100%;
  top: 20px;
  left: 0;
}
.lv_icon {
  display: block;
  width: 8px;
  min-width: 0;
  height: 8px;
  background-color: #07c160;
  border-radius: 100%;
  top: 20px;
  left: 0;
}
.datePicker {
  display: flex;
  margin: 0 16px;
  .el-input {
    width: 70% !important;
    font-size: 2px !important;
  }
  .el-input__inner {
    height: 25px !important;
    line-height: 25px !important;
  }

  .el-input__icon {
    line-height: 1 !important;
  }
  .el-date-editor .el-range-separator {
    line-height: 1;
    padding: 5px 16px 0 10px;
    font-size: 1px;
  }
  .el-range-editor .el-range-input {
    font-size: 1px;
  }
}
.datePicker .el-input__icon {
  margin-top: 2px !important;
}
.fansKeyInput {
  .el-input {
    font-size: 13px;
    width: 55%;
  }
  .el-input__inner {
    border: none;
    padding: 0;
  }
}
.el-collapse-item__header p {
  font-size: 12px !important;
  color: #000 !important;
}
.keywirdColor333 {
  color: #333;
  padding-bottom: 5px;
}
.keywirdColorRed {
  color: red;
  padding-bottom: 5px;
  font-weight: bold;
}
.el-switch__core {
  width: 35px !important;
  height: 17px !important;
}
.el-switch__core:after {
  top: -0.3px !important;
  left: 1px;
}
.el-notification__content {
  overflow: hidden;
  .notice_p {
    word-wrap: break-word;
  }
}
.el-pagination {
  margin: 20px 0 !important;
}
.colorRed {
  color: red !important;
}
</style>
