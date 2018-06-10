console.log("test");
$.get("http://192.168.31.140:3000/api/jsapi-oauth", function(data){
    console.dir(data);
    ddConfig = {
        agentId: 178631091, // 必填，微应用ID
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
    alert(ddConfig);
    dd.config(ddConfig);

    dd.ready(function(){
        alert("ready");
        dd.biz.user.get({
        //corpId:'xxx', // 可选参数，如果不传则使用用户当前企业的corpId。
        onSuccess: function (info) {
            console.log('userGet success: ' + JSON.stringify(info));
        },
        onFail: function (err) {
            console.log('userGet fail: ' + JSON.stringify(err));
        }
    });
    });
    

    dd.error(function(err) {
        alert('dd error: ' + JSON.stringify(err));
    });

});