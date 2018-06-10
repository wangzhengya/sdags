
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
    DingTalkPC.config(ddConfig);

    DingTalkPC.ready(function(res){
        console.log("ready");
        $('h1').html("完成校验jsapi");
        DingTalkPC.device.notification.toast({
            type: "information", //toast的类型 alert, success, error, warning, information, confirm
            text: '这里是个toast', //提示信息
            duration: 3, //显示持续时间，单位秒，最短2秒，最长5秒
            delay: 0, //延迟显示，单位秒，默认0, 最大限制为10
            onSuccess : function(result) {
                /*{}*/
            },
            onFail : function(err) {}
        })
        /*{
            authorizedAPIList: ['device.notification.alert'], //已授权API列表
            unauthorizedAPIList: [''], //未授权API列表
        }*/
         // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
    DingTalkPC.error(function(err) {
        $('p#err').html(JSON.stringify(err));
    });

});
