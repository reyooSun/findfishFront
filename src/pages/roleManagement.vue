<template>
  <div class="roleManagement">
    <div class="userManagementBox">
      <div
        v-show="isConten == true"
        class="_userManagementConten"
        v-loading="loading"
      >
        <div class="_userManagementTop">
          <span class="_title fl">角色管理</span>
        </div>
        <div class="userManagement">
          <ul class="_userManagementUl">
            <li>
              <label> 角色名称：</label>
              <el-input
                v-model="searchArray.userName"
                @change="inputChange($event)"
                clearable
                placeholder="用户名"
                size="mini"
                maxlength="20"
              ></el-input>
            </li>
            <li>
              <label> 权限字符：</label>
              <el-input
                size="mini"
                clearable
                v-model="searchArray.jurisdiction"
                @change="inputChange($event)"
                placeholder="权限字符"
                maxlength="11"
              ></el-input>
            </li>
            <li>
              <label> 用户状态：</label>
              <el-select
                size="mini"
                v-model="searchArray.stateValue"
                @change="inputChange($event)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in stateArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </li>
            <!-- <li>
                            <label>创建时间：</label>
                            <el-date-picker
                                    size="mini"
                                    v-model="searchArray.dateValue"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </li> -->
            <li>
              <el-button
                @click="search"
                size="mini"
                type="primary"
                icon="el-icon-search"
                round
                >搜索</el-button
              >
              <el-button
                @click="reset"
                size="mini"
                type="warning"
                icon="el-icon-refresh"
                round
                >重置</el-button
              >
            </li>
          </ul>
          <ul class="_userManagementUl">
            <li class="w10">
              <el-button
                @click="examineTipOn(-1)"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                >新增
              </el-button>
            </li>
            <!--  <li class="w10">  <el-button type="warning"  icon="el-icon-edit" size="mini">修改</el-button></li>
                          <li class="w10">  <el-button type="danger"  icon="el-icon-delete" size="mini">删除</el-button></li>-->
          </ul>
          <div class="_userManagementTable">
            <el-table
              :data="roleDataList"
              style="
                width: 100%;
                height: 373px;
                border: 1px solid #ebeef5;
                border-bottom: none;
              "
              :stripe="true"
            >
              <el-table-column
                icon="el-icon-plus"
                prop=""
                label="角色名称"
                width="120"
              >
                <template slot-scope="scope">
                  <span class="white-space" style="margin-left: 10px">{{
                    scope.row.showName
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="角色字符" width="120">
                <template slot-scope="scope">
                  <span class="white-space" style="margin-left: 10px">{{
                    scope.row.roleName
                  }}</span>
                </template>
              </el-table-column>
              <!--   <el-table-column
                                       prop="createdBy"
                                       label="用户名称"
                                       width="120">
                                   <template slot-scope="scope">
                                       <span class="white-space" style="margin-left: 10px">{{ scope.row.createdBy}}</span>
                                   </template>
                               </el-table-column>-->
              <el-table-column
                prop="createdOn"
                label="创建时间"
                width="200"
                sortable
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.createtime | dateFilter("yyyy-MM-dd hh:mm:ss")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="用户状态" width="100">
                <template slot-scope="scope">
                  <el-switch
                    disabled
                    v-model="scope.row.roleStatus"
                  ></el-switch>
                </template>
              </el-table-column>

              <el-table-column prop="operation" width="160" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="examineTipOn(scope.$index, scope.row.roleId)"
                    size="mini"
                    >编辑
                  </el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDel(scope.$index)"
                    size="mini"
                    >删除
                  </el-button>
                  <el-button
                    type="warning"
                    icon="el-icon-circle-plus-outline"
                    @click="operation(scope.row.roleId, scope.row.showName)"
                    size="mini"
                    >更多操作
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="_userManagementPage">
            <div class="fl shuju">
              <span
                >共<span> {{ this.total }} </span>条数据</span
              >
            </div>
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
          </div>
        </div>
      </div>
      <div
        v-show="isConten == false"
        class="_userManagementConten"
        v-loading="loading"
      >
        <div class="_userManagementTop">
          <span class="_title fl">基本信息</span>
        </div>
        <div class="userManagement">
          <ul class="_userManagementUl">
            <li style="width: 49%">
              <label> 用户信息：</label>
              <el-input
                v-model="userName"
                placeholder="角色名称"
                @change="inputChange($event)"
                size="small"
                :disabled="true"
              ></el-input>
            </li>
          </ul>
          <div class="_userManagementTable">
            <el-table
              :data="userGeturole"
              style="
                width: 100%;
                height: 373px;
                border: 1px solid #ebeef5;
                border-bottom: none;
              "
              :stripe="true"
            >
              <el-table-column
                icon="el-icon-plus"
                prop=""
                label="权限编号"
                width="120"
              >
                <template slot-scope="scope">
                  <span class="white-space" style="margin-left: 10px">{{
                    scope.row.permissionId
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="授权URL" width="120">
                <template slot-scope="scope">
                  <span class="white-space" style="margin-left: 10px">{{
                    scope.row.permissionUrl
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="描述" width="120">
                <template slot-scope="scope">
                  <span class="white-space" style="margin-left: 10px">{{
                    scope.row.permissionComment
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createdOn"
                label="创建时间"
                width="200"
                sortable
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.createtime | dateFilter("yyyy-MM-dd hh:mm:ss")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="操作" width="100">
                <template slot-scope="scope">
                  <el-switch
                    @change="checkedSwitch($event, scope.row.permissionId)"
                    v-model="scope.row.checked"
                  ></el-switch>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--分页-->
          <!--   <div class="_userManagementPage">
                        <div class="fl shuju">
                            <span>共<span>  {{this.total}} </span>条数据</span>
                        </div>
                        <el-pagination class="fr page"
                                       :total="total"
                                       :page-size="count"
                                       :current-page.sync="currentPage"
                                       background
                                       layout="total,->,prev, pager, next"
                                       @current-change="changePage">

                        </el-pagination>
                    </div>-->
          <div class="tip-bottom tc mt15">
            <!--
                        <el-button @click="" type="primary" size="small">保存</el-button>
-->
            <el-button
              class="ml10"
              @click="isConten = true"
              size="small"
              type="primary"
              plain
              >关闭</el-button
            >
          </div>
        </div>
      </div>
      <div class="w100 tr" style="padding-top: 12px">
        <a
          class="beian"
          href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          >京ICP备2020038704号</a
        >
        <a
          class="beian"
          href="http://www.beian.gov.cn/portal/index"
          target="_blank"
          ><img
            src="../assets/img/jh.png"
            style="vertical-align: sub; margin-right: 8px"
          />京公网安备 11010802033236号</a
        >
      </div>
    </div>
    <!--新建弹框-->
    <transition name="el-fade-in-linear" class="fade">
      <div class="Tip" v-show="examineTip">
        <div class="bg"></div>
        <div class="TipBox" style="height: 430px">
          <div class="tip-m">
            <div class="tip-top tl clear pb10">
              <p class="">
                <span class="fl" v-if="userIndex == '-1'">新建角色</span>
                <span class="fl" v-else>编辑角色</span>
                <span class="fr fs13" @click="examineTipOff"
                  ><i class="iconfont iconguanbi cursor"></i
                ></span>
              </p>
            </div>
            <div class="tipConten">
              <!--角色名称-->
              <p>角色名称</p>
              <el-input
                v-if="userIndex == '-1'"
                maxlength="20"
                v-model="inputId"
                placeholder="角色名称"
                @change="inputChange($event)"
              ></el-input>
              <el-input
                :disabled="true"
                v-else
                maxlength="20"
                v-model="einputId"
                placeholder="角色名称"
                @change="inputChange($event)"
              ></el-input>
              <!--角色字符-->
              <p>角色字符</p>
              <el-input
                maxlength="20"
                v-model="inputCharacter"
                @change="inputChange($event)"
                placeholder="角色字符"
              ></el-input>

              <p>用户状态</p>
              <el-switch v-model="switchZt"></el-switch>
            </div>
            <div class="tip-bottom tc">
              <el-button @click="post_role" type="primary" class=""
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
        <div class="success pr">
          <i class="icon-success pa"></i>
        </div>
      </div>
    </transition>
    <!--删除弹框-->
    <deleteAffirm
      v-show="deleteAffirmIsShow"
      @isNo="deleteAffirmIsShow = false"
      @isYes="delete_users"
    />
  </div>
</template>
<script>
import deleteAffirm from "../components/deleteAffirm";
import {
  getAddrole,
  putUpdaterole,
  getFindrole,
  getDroprole,
  getGetauth,
  putUpdateAuth,
} from "../api/api";
export default {
  name: "roleManagement",
  components: {
    deleteAffirm,
  },
  data() {
    return {
      //userManagementConten显示
      isConten: true,
      currentPage: 1,
      total: 0, //总数
      count: 10,
      //搜索 筛选
      searchArray: {
        userName: "", //用户名
        jurisdiction: "", //权限字符
        stateValue: "", //筛选状态
        dateValue: "", //筛选  时间
      },
      //筛选状态
      stateArray: [
        {
          value: false,
          label: "禁用",
        },
        {
          value: true,
          label: "启用",
        },
      ],
      stateValue: "", //筛选状态
      dateValue: "", //筛选  时间
      switchZt: false,
      delId: [], //删除ID
      examineTip: false, //新建弹框
      editTip: false, //编辑弹框
      deleteAffirmIsShow: false, //删除框显示隐藏
      inputId: "", //用户账号
      inputCharacter: "", //新建用户昵称
      einputId: "", //
      inputPwd: "", //新建密码
      inputNewPwd: "", //新建确认密码
      roleDataList: [], //全部信息List
      userGeturole: [], //更多操作List
      userIndex: "",
      editId: "", //编辑ID
      loading: true,
      userName: "", //用户账号
      roleId: "", //用户id
      distinguish: "",
    };
  },
  created: function () {
    //加载前
  },
  mounted() {
    //加载后
    //初始化
    this.get_role(1);
  },
  methods: {
    //函数
    //排序创建人createdOn
    formatter(row, column) {
      return row.address;
    },
    //初始化列表数据
    get_role: function (page) {
      this.distinguish = "1";
      //参数
      let data = {
        page: page,
      };
      //查询用户
      getFindrole(data).then((res) => {
        this.loading = false;
        if (res.data.status == 200) {
          //全部列表信息
          this.roleDataList = res.data.data.records;
          //总条数
          this.total = res.data.data.total;
        } else if (res.data.status == -99) {
          this.alertMeg(res.data.msg);
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //新增 修改
    post_role: function (v) {
      if (!this.inputId.trim() && this.userIndex == "-1") {
        this.message("角色名称不能为空");
      } else if (!this.inputCharacter.trim()) {
        this.message("角色字符不能为空");
      } else {
        if (this.userIndex == "-1") {
          let params = {
            roleName: this.inputCharacter, //角色字符
            roleStatus: this.switchZt, //用户状态
            showName: this.inputId, //角色名称
          };
          getAddrole(params).then((res) => {
            if (res.data.status == 200) {
              this.success("新建成功！");
              //初始化
              this.get_role(1);
            } else {
              this.error(res.data.msg);
            }
            this.examineTipOff();
          });
        } else {
          let params = {
            roleName: this.inputCharacter, //角色字符
            roleStatus: this.switchZt, //用户状态
            showName: this.einputId, //角色名称
            roleId: this.editId, //角色id
          };
          putUpdaterole(params).then((res) => {
            if (res.data.status == 200) {
              this.success("修改成功！");
              //初始化
              this.get_role(1);
            } else {
              this.error(res.data.msg);
            }
            this.examineTipOff();
          });
        }
      }
    },
    //关闭弹框
    examineTipOff: function () {
      this.examineTip = false; //弹框关闭
      this.examineEmpty();
    },
    //开启弹框
    examineTipOn: function (index, Id) {
      this.userIndex = index;
      this.editId = Id;
      if (index == "-1") {
        this.examineEmpty();
      } else {
        //点击编辑的那一行数据
        let r = this.roleDataList[this.userIndex];
        this.einputId = r.showName;
        this.inputCharacter = r.roleName;
        this.switchZt = r.roleStatus;
      }
      this.examineTip = true; //弹框开启
    },
    //新建弹框清空数据
    examineEmpty: function () {
      this.inputId = ""; //用户账号
      this.inputCharacter = ""; //手机号
      this.switchZt = false;
    },
    //更多操作
    operation(id, name) {
      //用户账号
      this.userName = name;
      //用户id
      this.roleId = id;
      let data = { roleId: id };
      //用户更多操作
      getGetauth(data).then((res) => {
        this.loading = false;
        if (res.data.status == 200) {
          //全部列表信息
          this.userGeturole = res.data.data;
        } else {
          this.error(res.data.msg);
        }
      });
      this.isConten = false;
    },
    //switch操作按钮触发回调
    checkedSwitch($event, id) {
      //用户id  行id  状态
      let data = { roleId: this.roleId, permissionId: id, checked: $event };
      //用户更多操作
      putUpdateAuth(data).then((res) => {
        this.loading = false;
        if (res.data.status == 200) {
          //全部列表信息
          this.success("修改成功！");
        } else {
          this.error(res.data.msg);
        }
      });
      this.isConten = false;
    },
    //删除
    delete_users() {
      this.deleteAffirmIsShow = false;
      let data = { roleId: this.delId };
      getDroprole(data).then((res) => {
        if (res.data.status == 200) {
          this.success("删除成功！");
          //初始化
          this.get_role(this.currentPage);
        } else {
          this.error(res.data.msg);
        }
        this.examineTipOff();
      });
    },
    //点击单条删除显示删除弹框
    handleDel(index) {
      this.delId = this.roleDataList[index].roleId;
      console.log(this.roleDataList[index]);
      this.deleteAffirmIsShow = true;
    },
    //消息弹框
    message: function (v) {
      this.$message({
        message: v,
        type: "warning",
      });
    },
    //分页
    changePage(page) {
      if (this.distinguish == "1") {
        this.get_role(page);
      } else {
        this.search(page);
      }
    },
    //重置
    reset() {
      this.searchArray = [];
      //初始化
      this.get_role(1);
    },
    //搜索
    search(page) {
      this.distinguish = "2";
      let data = {
        roleName: this.searchArray.jurisdiction, //角色字符
        roleStatus: this.searchArray.stateValue, //用户状态
        showName: this.searchArray.userName, //角色名称
      };
      //查询用户
      getFindrole(data).then((res) => {
        this.loading = false;
        if (res.data.status == 200) {
          //全部列表信息
          this.roleDataList = res.data.data.records;
          //总条数
          this.total = res.data.data.total;
        } else if (res.data.status == -99) {
          this.alertMeg(res.data.msg);
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //input视图更新
    inputChange($event) {
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="less" type="text/less">
.roleManagement {
  width: 100%;
  height: 100%;
  overflow: hidden;
   background-color: #fff !important;
  .userManagementBox {
 
    margin: 30px;
    box-shadow: 0 0 10px #ccc;
     background-color: #fff !important;
    ._userManagementConten {
      height: 100%;
      margin: 0 25px;
      ._userManagementTop {
        line-height: 50px;
        overflow: hidden;

        ._title {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0.14px;
        }
      }
      ._userManagementUl {
        clear: both;
        padding-bottom: 15px;
        li {
          width: 17%;
          display: inline-block;

          label {
            font-size: 12px;
          }
          .el-range-editor--mini.el-input__inner {
            width: 100%;
          }
          .el-button--mini,
          .el-button--mini.is-round {
            padding: 7px 8px;
          }
        }
      }
    }
    ._userManagementPage {
      display: inline-block;
      width: 100%;
      .page {
        margin-top: 9px;
      }
      .shuju {
        text-align: left;
        line-height: 40px;
        span {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #9299ab;
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
    width: 400px;
    min-width: 400px;
    height: 600px;
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

.el-table__body,
.el-table__footer,
.el-table__header {
  table-layout: auto !important;
}

table {
  width: 100% !important;
  thead {
  }
}

tbody {
  width: 100% !important;
  td {
    border-bottom: none;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding: 6px 0 !important;
    color: #333333;
    text-align: left;
    border-bottom: none !important;
  }

  .el-button--mini,
  .el-button--mini.is-round {
    padding: 4px;
  }
}

thead th {
  font-size: 14px;
  padding: 0 !important;
  color: #333333;
  text-align: left;
}

.el-table__body-wrapper {
  overflow-x: hidden !important;
}

.el-table .cell {
  display: table-row;
}
.el-table__empty-block {
  width: 100% !important;
}
</style>
