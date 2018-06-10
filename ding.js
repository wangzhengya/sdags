$('h1').html("开始校验jsapi。。。");
$.get("http://192.168.31.140:3000/api/jsapi-oauth", function(data){
    console.dir(data);
    console.log(window.location.href);
    ddConfig = {
        agentId: '178631091', // 必填，微应用ID
        corpId:  data.corpId,//必填，企业ID
        timeStamp: data.timeStamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        type:0,   //选填，0表示微应用的jsapi，1表示服务窗的jsapi，不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList : [ 'runtime.info', 'biz.contact.choose','biz.user.get',
            'device.notification.confirm', 'device.notification.alert',
            'device.notification.prompt', 'biz.ding.post',
            'biz.util.openLink' ,'biz.contact.complexPicker'] // 必填，需要使用的jsapi列表，注意：不要带dd。
    };
    $('p#data').html(JSON.stringify(ddConfig));
    dd.config(ddConfig);

    dd.ready(function(){
        $('h1').html("success!");
        dd.biz.contact.complexPicker({
            title:"测试标题",            //标题
            corpId:data.corpId,              //企业的corpId
            multiple:true,            //是否多选
            limitTips:"超出了",          //超过限定人数返回提示
            maxUsers:100,            //最大可选人数
            pickedUsers:[],            //已选用户
            pickedDepartments:[],          //已选部门
            disabledUsers:[],            //不可选用户
            disabledDepartments:[],        //不可选部门
            requiredUsers:[],            //必选用户（不可取消选中状态）
            requiredDepartments:[],        //必选部门（不可取消选中状态）
            appId:'178631091',              //微应用的Id
            permissionType:GLOBAL,          //选人权限，目前只有GLOBAL这个参数
            responseUserOnly:false,        //返回人，或者返回人和部门
            startWithDepartmentId:0 ,   // 0表示从企业最上层开始
            onSuccess: function(result) {
                /**
                {
                    selectedCount:1,                              //选择人数
                    users:[{"name":"","avatar":"","emplId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
                    departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
                }
                */
               $('p#err').html(JSON.stringify(result));
            },
           onFail : function(err) {}
        });
    });

    dd.error(function(err) {
        $('p#err').html(JSON.stringify(err));
    });

});
