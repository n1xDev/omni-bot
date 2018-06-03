var answer = {
	analyzeFile: function(username, str) {
		var str = str.toLocaleLowerCase();
		var answer = username + ", что ты имел в виду? Сформулируй несколько иначе свою мысль, может тогда пойму, хотя может я этого не знаю, поэтому возьму на заметку...";
		for(var i = 0; i < data.length; i++) {
			for(var j = 0; j < data[i][0].length; j++) {
				if(str.indexOf(data[i][0][j]) > -1) {
					if(data[i][1].length < 1)
						answer = this.randomAnswer(data[i][3][0]) + data[i][2][0];
					else {
						for(var k = 0; k < data[i][1].length; k++) {
							if(data[i][1][k].length > 1) {
								for(var m = 0; m < data[i][1][k].length; m++) {
									if(str.indexOf(data[i][1][k][m]) > -1) 
										answer = this.randomAnswer(data[i][3][k]) + data[i][2][k];
								}
							} else {
								if(str.indexOf(data[i][1][k][0]) > -1) {
									answer = this.randomAnswer(data[i][3]) + data[i][2][k];
								}
							}
						}
					}
				}
			}
		}
		if(answer.substr(-13) == "на заметку...") this.setTask(username, str);
		return answer;
	},
	randomAnswer: function(answerObject) {
		return answerObject[tools.getRandom(0, answerObject.length - 1)];
	},
	setTask: function(username, str) {
		add_data.updates.push({"from": username, "text": str, "bots": ""});
		tools.updateDBfile("add_data");
	},
}