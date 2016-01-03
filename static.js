var http=require('http');
var parse=require('url').parse;
var join=require('path').join;
var fs =require('fs');

// присваеваем переменной root путь к папке в которой находится файл
var root =__dirname;

var server=http.createServer(function(req,res){
   // Разбор url адреса для получения пути 	
   var url=parse(req.url);
   // Сборка абсолютного пути
   var path=join(root,url.pathname);
   // проверка существования файла
   fs.stat(path,function(err,stat){
      if (err){
      	 //файла не существует
      	 if('ENOENT'==err.code){
      	 	res.statusCode='404';
      	 	res.end('Not found');
      	 }else{
      	 	// другая ошибка
      	 	res.statusCode='500';
      	 	res.end('Internal Server Error');
      	 }
      }else{
           res.setHeader('Content-Lenght', stat.size);
           // установка кодирировки utf-8 для воспринимания кирилических символов
           res.setHeader('Content-Type','text/plain; charset ="utf8"');
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
		   });

         }
    });

});

server.listen(3000);