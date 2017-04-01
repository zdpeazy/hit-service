var request = require('request');
var url = require('url');
var moment = require('moment');
var Cookies = require('cookies');
var uuidV1 = require('uuid/v1');//通用唯一识别码
module.exports = {
	//返回地址参数信息
	logic: function(req, res){
		function urlInfo(urlhost){
			return {
				href: url.parse(req.url).href,
				query: url.parse(req.url,true).query,
				pathname: url.parse(req.url,true).pathname,
				/*time: moment().format('YYYY-MM-DD HH:mm:ss'),*/
				time: moment().format('X')
			}
		} 
		var resInfo = urlInfo();
		return resInfo;
		//res.write(resInfo.href+'~~~~'+resInfo.pathname+'~~~~'+resInfo.query.id+'~~~~'+resInfo.query.name+'~~~~'+resInfo.query.desc+'~~~~'+resInfo.time);
	},
	//获取访问者的ip
	getClientIp: function(req){
		var ipAddress;
		var headers = req.headers;
		var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
		forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
		if (!ipAddress) {
			ipAddress = req.connection.remoteAddress;
		}
		return ipAddress;
	},
	//判断用户的终端
	checkClinetModel: function(req){
		var device = '';
		function brows($agent){
			return {
				trident: $agent.indexOf('Trident') > -1,
	            presto: $agent.indexOf('Presto') > -1, 
	            webKit: $agent.indexOf('AppleWebKit') > -1, 
	            gecko: $agent.indexOf('Gecko') > -1 && $agent.indexOf('KHTML') == -1,
	            mobile: !!$agent.match(/AppleWebKit.*Mobile.*/), 
				ios: !!$agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
				android: $agent.indexOf('Android') > -1 || $agent.indexOf('Linux') > -1, 
				iPhone: $agent.indexOf('iPhone') > -1 || $agent.indexOf('Mac') > -1,
				iPad: $agent.indexOf('iPad') > -1, 
			}
		}
        var deviceAgent=brows(req.headers['user-agent']);

		if (deviceAgent.trident){device = 'pc(Trident)';}
		if (deviceAgent.presto){device = 'pc(presto)';}
		if (deviceAgent.webKit){device = 'pc(webKit)';}
		if (deviceAgent.gecko){device = 'pc(gecko)';}
		if (deviceAgent.mobile && deviceAgent.ios){device = 'ios';}
		if (deviceAgent.mobile && deviceAgent.android){device = 'android';}
		if (deviceAgent.mobile && deviceAgent.iPhone){device = 'iPhone';}
		if (deviceAgent.mobile && deviceAgent.iPad){device = 'ipad';}
		return device;
	},
	//给用户做标记
	setCookie: function(req, res){
		req.cookies = new Cookies(req,res);
		var uuid = uuidV1();//生成唯一标识符
		var c_uuido = req.cookies.get('uuidInfo');
		if(c_uuido == undefined){
			req.cookies.set('uuidInfo',uuid,{
				maxAge:30 * 24 * 60 * 60 * 60,
			});
			c_uuido = uuid;
		}
		return c_uuido;
	}
	
}
