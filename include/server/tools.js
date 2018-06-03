var tools = {
	unicode2text: function(utext) {
		var x = utext;
		var r = /\\u([\d\w]{4})/gi;
		x = x.replace(r, function (match, grp) {
			return String.fromCharCode(parseInt(grp, 16)); } );
		x = unescape(x);
		return x;
	},
	getUsername: function(nick, uid) {
		if(nick != undefined) return nick;
		else return uid;
	},
	getRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	updateDBfile: function(dbname) {
		var obj_to_str;
		switch(dbname) {
			case "data": { obj_to_str = JSON.stringify(data, null, "\t"); break; };
			case "add_data": { obj_to_str = JSON.stringify(add_data, null, "\t"); break; };
			default: { return; break; };
		}
	    fs.writeFileSync('data/' + dbname + '.db', obj_to_str);
	},
}