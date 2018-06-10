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
        $('h1').html("success");
        dd.biz.contact.createGroup({
            corpId: data.corpId, //企业id，可选，配置该参数即在指定企业创建群聊天
            users: [], //默认选中的用户工号列表，可选；使用此参数必须指定corpId
            onSuccess: function(result) {
                /*{
                    id: 123   //企业群id
                }*/
                $('p#err').html(result);
            },
            onFail: function(err) {
            }
        });
    });

    dd.error(function(err) {
        $('p#err').html(JSON.stringify(err));
    });

});
