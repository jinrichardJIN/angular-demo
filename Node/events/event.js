var events = require('events');
var eventEmitter = new events.EventEmitter();
//事件逻辑  李金唱歌--->所有人都要死----->警察把李金抓走了


eventEmitter.on('sing',function(res){
	console.log('李金要唱歌');
	eventEmitter.emit('die');
	console.log('警察把李金抓走了')
})
eventEmitter.on('die',function(){
	console.log('所有人都要死');
	var a = 0;
	for(var i=0;i<10000;i++){
		a+=i;
	}
	console.log('人已经死光了'+a);
})
eventEmitter.emit('sing');




