var http=require('http');
var parse=require('url').parse;
var join=require('path').join;
var fs =require('fs');

var root =__dirname;

var server=http.createServer(function(req,res){
   // Разбор url адреса для получения пути 	
   var url=parse(req.url);
   // Сборка абсолютного пути
   var path=join(root,url.pathname);
   var stream=fs.createReadStream(path);
   // Запись файла для ответа
   stream.on('data',function(chunk){
   	res.write(chunk);
   });
   stream.on('end',function(){
   	// Завершение ответа после закрытия файла 
    res.end();
   });
   // Обработка на случай ошибки
   stream.on('error',function(){
   	res.statusCode='500';
   	res.write('Not Found');
   })
});

server.listen(3000);