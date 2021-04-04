/**
 * Created by 胡健辰 on 2020/5/15.
 */
import request from "../utils/http";
// 服务模块接口
//登录接口
/*export function getLogin(data) {
 return request({
 url: '/login/signin',
 method: 'POST',
 data: data,
 auth: {
    user: 'zhangsan',
    password: '123456'
  }
 })
 }*/

//注册接口
export function getRegister(data) {
    return request({
        url: '/login/register',
        method: 'POST',
        data: data
    })
}

//查询用户
export function getSelect(data) {
    return request({
        url: '/user/select',
        method: 'POST',
        data: data
    })
}

//删除用户
export function getDelete(data) {
    return request({
        url: '/user/delete',
        method: 'DELETE',
        data: data
    })
}

//修改用户
export function putUpdate(data) {
    return request({
        url: '/user/update',
        method: 'patch',
        data: data
    })
}
//用户更多操作
export function getGeturole(data) {
    return request({
        url: '/user/geturole',
        method: 'POST',
        data: data
    })
}

//修改用户
export function putUpdateGeturole(data) {
    return request({
        url: '/user/updaterole',
        method: 'patch',
        data: data
    })
}


//查询角色
export function getFindrole(data) {
    return request({
        url: 'role/findrole',
        method: 'POST',
        data: data
    })
}
//用户更多操作
export function getGetauth(data) {
    return request({
        url: '/role/getauth',
        method: 'POST',
        data: data
    })
}
//修改用户
export function putUpdateAuth(data) {
    return request({
        url: '/role/updateauth',
        method: 'patch',
        data: data
    })
}
//修改角色
export function putUpdaterole(data) {
    return request({
        url: '/role/updaterole',
        method: 'patch',
        data: data
    })
}
//删除角色
export function getDroprole(data) {
    return request({
        url: '/role/droprole',
        method: 'DELETE',
        data: data
    })
}
//新建角色
export function getAddrole(data) {
    return request({
        url: '/role/addrole',
        method: 'POST',
        data: data
    })
}

//新建权限
export function getAddper(data) {
    return request({
        url: '/per/addper',
        method: 'POST',
        data: data
    })
}

//删除权限
export function getDropper(data) {
    return request({
        url: '/per/dropper',
        method: 'DELETE',
        data: data
    })
}

//修改角色
export function putUpdateper(data) {
    return request({
        url: '/per/updateper',
        method: 'patch',
        data: data
    })
}

//查询权限
export function getGetper(data) {
    return request({
        url: '/per/getper',
        method: 'POST',
        data: data
    })
}
//用户信息
export function getUsertemplate(data) {
    return request({
        url: '/template/getuser',
        method: 'GET',
        params: data
    })
}
//systemTemDetailsModel，templateId
//
export function postDetailsAddTemDetails(data) {
    return request({
        url: '/details/addTemDetails',
        method: 'POST',
        data: data
    })
}


//添加模版
export function postTemplateAddtouser(data) {
    return request({
        url: '/template/addtouser',
        method: 'POST',
        data: data
    })
}
//删除模版
export function postTemplateDdrop(data) {
    return request({
        url: '/template/drop/' + data,
        method: 'DELETE',
    })
}

//修改角色
export function patchTemplateRefresh(data) {
    return request({
        url: '/template/refresh',
        method: 'patch',
        data: data
    })
}

//点击模版显示列表详情 page=1&limit=10&templateId=111111
export function getDetailsTempWithId(data) {
    return request({
        url: '/details/getTempWithId',
        method: 'GET',
        params: data
    })
}

//修改角色
export function patchDetailsUpdateTemDetails(data) {
    return request({
        url: '/details/updateTemDetails',
        method: 'patch',
        data: data
    })
}


//添加模版详情信息
export function postDetailsAdd(data) {
    return request({
        url: '/details/add',
        method: 'POST',
        data: data
    })
}

//删除模版
export function removeTemDetails(data) {
    return request({
        url: '/details/removeTemDetails',
        method: 'DELETE',
        data: data
    })
}

//导出模版
export function getDetailsExcelexport(data) {
    return request({
        url: '/details/excelexport',
        method: 'POST',
        responseType: 'blob', // 表明返回服务器返回的数据类型
        headers: {
            'Content-Type': 'application/json'
        },
        data: data,

    })
}
// export function getDetailsExcelexport(data) {
//     return request({
//         url: '/details/excelexport/' + data,
//         method: 'GET',
//         responseType: 'blob', // 表明返回服务器返回的数据类型
//         headers: {
//             'Content-Type': 'application/json'
//         },

//     })
// }
//导入模版
export function postExcelimport(data) {
    return request({
        url: '/details/excelimport',
        method: 'POST',
        data: data,

    })
}
//失效数据
export function getCheckdetail(data) {
    return request({
        url: '/details/checkdetail/' + data,
        method: 'GET',
    })
}
//搜索
export function getSearch(data) {
    return request({
        url: '/details/listTemDetailsObjectsByWord',
        method: 'POST',
        data: data,
    })
}

//头部尾部
export function getHeadtail(data) {
    return request({
        url: '/fantasy/headtail/' + data,
        method: 'GET',
    })
}

//会员
export function getMember(fishEncryption, searchName) {
    return request({
        url: '/fantasy/member/' + fishEncryption + '/' + searchName,
        method: 'GET',
    })
}

//大厅
export function getMovie(fishEncryption, searchName, search) {
    return request({
        url: '/fantasy/movie/' + search + '/' + fishEncryption + '/' + searchName,
        method: 'GET',
    })
}

//验证码
export function getCaptcha() {
    return request({
        url: '/captcha/captchaImage',
        method: 'GET',
    })
}

//查询信息
export function getUserkeyList(data) {
    return request({
        url: '/userkey/list/' + data,
        method: 'GET',
    })
}


//修改查询信息
export function patchUserkeyFresh(data) {
    return request({
        url: '/userkey/fresh ',
        method: 'patch',
        data: data
    })
}
//通知管理查询
export function POST_NoticeSelect(data) {
    return request({
        url: '/notify/select',
        method: 'POST',
        data: data
    })
}
//通知管理删除
export function DELETE_NoticeDelete(data) {
    return request({
        url: '/notify/delete',
        method: 'DELETE',
        data: data
    })
}

//通知管理修改
export function PATCH_NoticeUpdate(data) {
    return request({
        url: '/notify/update',
        method: 'patch',
        data: data
    })
}

//通知管理新增
export function POST_NoticeAdd(data) {
    return request({
        url: '/notify/add ',
        method: 'POST',
        data: data
    })
}