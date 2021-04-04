<template>
    <div class="deleteAffirm">
        <div class="body">
            <div class="title">
                <div class="name">删除</div>
                <i class="iconfont icondanchuang_guanbi" @click="cancel"></i>
            </div>
            <div class="content">您确认删除吗？</div>
            <div class="btns">
                <div class="ok" @click="confirm">是</div>
                <div class="no" @click="cancel">否</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "deleteAffirm",
    methods: {
        //关闭
        cancel() {
            this.$emit("isNo");
        },
        //取消
        confirm() {
            this.$emit("isYes");
        }
    }
};
</script>
<style lang="less"  type="text/less">
.deleteAffirm {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    .body {
        width: 360px;
        height: 200px;
        background: #ffffff;
        border: 1px solid #b0c0db;
        border-radius: 5px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        padding: 20px;
        box-sizing: border-box;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: #333333;
                letter-spacing: 0.17px;
            }
            .icondanchuang_guanbi {
                color: #999999;
                cursor: pointer;
            }
        }
        .content {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0.1px;
            text-align: center;
            margin: 20px 0 40px 0;
        }
        .btns {
            display: flex;
            justify-content: center;
            .ok {
                width: 80px;
                height: 38px;
                background: #568fff;
                border-radius: 4px;
                font-family: PingFangSC-Medium;
                font-size: 15px;
                color: #ffffff;
                letter-spacing: 0.1px;
                text-align: center;
                line-height: 38px;
                cursor: pointer;
                margin-right: 25px;
            }
            .no {
                width: 80px;
                height: 38px;
                background: #e0ebff;
                border-radius: 4px;
                font-family: PingFangSC-Medium;
                font-size: 15px;
                color: #568fff;
                letter-spacing: 0.1px;
                text-align: center;
                line-height: 38px;
                cursor: pointer;
            }
        }
    }
}
</style>
