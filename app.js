console.log("Starting bot app...");
// telegram.me/newsocialhelperbot.
// 254457533:AAH48hku5H-5q2UMyfDAN5_08_3L3faKvGk

//266373146:AAE3w5T4SX6GOnDAVnfmUnvRo8way4n6vXc

//var token = '254457533:AAH48hku5H-5q2UMyfDAN5_08_3L3faKvGk';
var token = '266373146:AAE3w5T4SX6GOnDAVnfmUnvRo8way4n6vXc';
var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(token, {polling: true});
var express = require('express');
var http = require('http');
var fs = require("fs");
eval(fs.readFileSync('include/server/tools.js')+'');
eval(fs.readFileSync('include/server/answer.js')+'');
var data = JSON.parse(fs.readFileSync('data/data.db', 'utf8'));
var add_data = JSON.parse(fs.readFileSync('data/add_data.db', 'utf8'));
var buttons = JSON.parse(fs.readFileSync('data/buttons.db', 'utf8'));
var stdin = process.openStdin(); // For debug.
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server, {});

app.use('/static', express.static(__dirname + '/static'));
server.listen(8080);
app.all('/requests', function (req, res) {
	res.sendfile(__dirname + '/requests.html');
});

io.sockets.on('connection', function (client) {
	client.on('getData', function(data) {
		client.emit("getData", { alldata: add_data });
	});
});

bot.on('message', function (msg) {
	/*console.log(msg.chat.first_name);
    var chatId = msg.chat.id;
    console.log("> (" + msg.text + ") -- от " + tools.getUsername(msg.chat.username, msg.chat.id));
    if(msg.text != "FAST  START") {
    	bot.sendMessage(chatId, answer.analyzeFile(msg.chat.first_name, msg.text), {caption: "Social Helper"});
    } else {
    	var options = {
	    	reply_markup: JSON.stringify({
	    		keyboard: [
	    		[{ text: 'FAST  START', callback_data: '1', resize_keyboard: true }]
	    		]
	    	})
	    };
		for(var i = 0; i < buttons.length; i++) {
			var new_options = {
				  reply_markup: JSON.stringify({
				    inline_keyboard: [
				      [{ text: buttons[i][0], callback_data: '1', url: 'https://telegram.me/' + buttons[i][0] }]
				    ]
				  })
				};
			bot.sendMessage(msg.chat.id, buttons[i][1], new_options).then(function (sended) {});
		}
    }*/
    var chatId = msg.chat.id;
    console.log("> (" + msg.text + ") -- от " + tools.getUsername(msg.chat.username, msg.chat.id));

    var options = {
	    reply_markup: JSON.stringify({
	    	keyboard: [
	    	[{ text: 'FAST  START', callback_data: '1', resize_keyboard: true }]
	    	]
	    })
	};
	
	if(msg.text == "/dostart") bot.sendMessage(msg.chat.id, "Запущено.", options).then(function (sended) {});
	else if(msg.text == "/start") bot.sendMessage(msg.chat.id, "Запущено.", options).then(function (sended) {});
	else if(msg.text == "/restart") bot.sendMessage(msg.chat.id, "Запущено.", options).then(function (sended) {});

    if(msg.text != "FAST  START") {
    	bot.sendMessage(chatId, answer.analyzeFile(msg.chat.first_name, msg.text), {caption: "Social Helper"});
    } else {
    	for(var i = 0; i < buttons.length; i++) {
		var options = {
			reply_markup: JSON.stringify({
				  	inline_keyboard: [
				    [{ text: buttons[i][0], callback_data: '1', url: 'https://telegram.me/' + buttons[i][0] }]
				]
			})
		};
		if(msg.text == "FAST  START") bot.sendMessage(msg.chat.id, buttons[i][1], options).then(function (sended) {});
	}
    }
});