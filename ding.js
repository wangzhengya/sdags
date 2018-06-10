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
            'biz.util.openLink' ,'biz.contact.complexPicker','biz.util.scanCard'] // 必填，需要使用的jsapi列表，注意：不要带dd。
    };
    $('p#data').html(JSON.stringify(ddConfig));
    dd.config(ddConfig);

    dd.ready(function(){
        $('h1').html("success2");
        dd.biz.util.scanCard({ // 无需传参数
            onSuccess: function(data) {
                $('p#err').html(JSON.stringify(data));
            //onSuccess将在扫码成功之后回调
              /* data结构
               {
                 "ADDRESS": "深圳市南山区软件产业基地", 
                 "COMPANY": "深圳市李乔科技有限公司", 
                 "NAME": "李乔",
                 "MPHONE": "861333567890",  
                 "PHONE": "01087654321", 
                 "POSITION": "CEO", 
                 "IMAGE": "http://www.taobao.com/xxx.jpg", 
                 "dt_tranfer": "BusinessCard", 
                 "request_id": "20161206144554_efd40582d477a29df2e3bc62c260cdae"
              }
              */
            },
           onFail : function(err) {
           }
        })
    });

    dd.error(function(err) {
        $('p#err').html(JSON.stringify(err));
    });

});
