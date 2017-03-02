var fs = require('fs');
//console.log(fs);
//fs.readFileSync('test.txt');
fs.readFile('test.txt',function(err,data){
	if(err){
		console.log(err)
//		console.log(data.toString());
		console.log('读取出错');
	 	return
	}else{
		console.log(data.toString());
	}
})
console.log('zhixingjieshu');
