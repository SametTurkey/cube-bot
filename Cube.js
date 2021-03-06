// SametTurkey || 2018

const Discord = require("discord.js");
const request = require("request");
const os = require("os")
const url = require("url")
const delay = require("delay")
const mysql = require("mysql")
const google = require("google")
const sha256 = require("crypto-js/sha256")
const fs = require("fs")
// const levels = JSON.parse(fs.readFileSync("./levels.json", "utf8"))

const Prefix = "c!";

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

var con = mysql.createConnection({
    host: process.env.VERITABANI_IP,
    port: 3307,
    user: process.env.VERITABANI_KULLANICI,
    password: process.env.VERITABANI_PAROLA,
    database: "cubediscord"
});

const DevreDisiGuildler = [
	"264445053596991498"
]

const WindowsResimleri = [
 	"https://i.hizliresim.com/qG92VD.gif", // Windows 10
 	"https://i.hizliresim.com/W7WrJY.gif", // Windows XP
 	"https://i.hizliresim.com/Md9lNg.gif" // Windows 7
 ]

const CSGOResimleri = [
	"https://i.hizliresim.com/oOzYkX.gif", // CSGO
	"https://i.hizliresim.com/gOL46Z.gif", // CSGO
	"https://i.hizliresim.com/gOL4rZ.gif", // CSGO
	"https://i.hizliresim.com/z0E2Lg.gif"
]

const AtaturkResimleri = [
	"https://i.hizliresim.com/W7r6d8.jpg", // Atatürk
	"https://i.hizliresim.com/3ER1dM.jpg", // Atatürk
	"https://i.hizliresim.com/Rn6bqR.jpg", // Atatürk
	"https://i.hizliresim.com/p6YmLa.jpg", // Atatürk
	"https://i.hizliresim.com/kOY1lD.jpg", // Atatürk
	"https://i.hizliresim.com/NZb97X.jpg"
]

const KediResimleri = [
	"https://i.hizliresim.com/z0EgVB.gif", // Kedi
	"https://i.hizliresim.com/G91Eky.gif", // Kedi
	"https://i.hizliresim.com/y0nml0.gif", // Kedi
	"https://i.hizliresim.com/6J6QkN.gif", // Kedi
	"https://i.hizliresim.com/W7r4Zq.gif", // Kedi
	"https://i.hizliresim.com/3ERNaO.gif"
]

google.lang = "tr"
google.nextText = "Sonraki"

var bot = new Discord.Client();

bot.on("ready", function(login) {
    console.log("Hazır!");
    console.log(bot.user.username + "#" + bot.user.discriminator + " ismiyle giriş yapıldı!");
    bot.user.setGame("c!yardim | 1/1 | " + bot.guilds.size + " sunucu!", 'https://www.twitch.tv/turkishtr2', 1);
});

bot.on("guildCreate", function(guild) {
    if (DevreDisiGuildler.includes(guild.id)) return;
    if (guild.channels.first().type == "text") {
                guild.channels.first().send("Beni sunucunuza eklediğiniz için teşekkür ederim! Birkaç bilgi istiyorsanız :robot:, " + os.EOL + "**-** `c!yardim` komutu size komutları gösterir." + os.EOL + "**-** `c!bilgi` komutu size bot hakkında bilgi verir." + os.EOL + "**-** Ayrıca botumuzun discord sunucusunada katılmayı unutmayın! https://discord.gg/eEm46bW" + os.EOL + os.EOL + "Bazı Ayarlar: " + os.EOL + "**Küfür Kapalı** adında rol oluşturarak küfürleri engelleyebilirsiniz." + os.EOL + "**Reklam Kapalı** adında rol oluşturarak reklamları engelleyebilirsiniz." + os.EOL + "**URL Kapalı** adında rol oluşturarak urlleri engelleyebilirsiniz.");
    }
    //var con = mysql.createConnection({
    //    host: process.env.VERITABANI_IP,
    //    port: 3307,
    //    user: process.env.VERITABANI_KULLANICI,
    //    password: process.env.VERITABANI_PAROLA,
    //    database: "cubediscord"
    //});
    //con.connect(function(err) {
    //    var sql = "CREATE TABLE `cubediscord`.`server-" + guild.id + "` ( `id` VARCHAR(18) NOT NULL DEFAULT '0' , `level` VARCHAR(18) NOT NULL DEFAULT '0' ) ENGINE = InnoDB;"
    //    con.query(sql, function(err) {
    //        if (err) console.log(err);
    //    });
    //});
    bot.user.setGame("c!yardim | 1/1 | " + bot.guilds.size + " sunucu!", 'https://www.twitch.tv/turkishtr2', 1);
});

bot.on("guildDelete", function(guild) {
    //var con = mysql.createConnection({
    //    host: process.env.VERITABANI_IP,
    //    port: 3307,
    //    user: process.env.VERITABANI_KULLANICI,
    //    password: process.env.VERITABANI_PAROLA,
    //    database: "cubediscord"
    //});
    //con.connect(function(err) {
    //    var sql = "DROP TABLE `cubediscord`.`" + guild.id + "`"
    //    con.query(sql, function(err) {
    //        if (err) console.log(err);
    //    });
    //});
    bot.user.setGame("c!yardim | 1/1 | " + bot.guilds.size + " sunucu!", 'https://www.twitch.tv/turkishtr2', 1);
});

bot.on("guildMemberAdd", function(member) {
    if (DevreDisiGuildler.includes(member.guild.id)) return;
    if (member.guild.channels.first().type == "text") {
        member.guild.channels.first().send("| :inbox_tray: | **" + member.user.username + "** Sunucuya Giriş Yaptı!");
    }
    if (member.guild.channels.find("name", "cube-log")) {
	   var embed = new Discord.RichEmbed()
	   	.setAuthor(member.username, member.avatarURL)
	   	.setTitle(":inbox_tray: Sunucuya Katıldı")
	   	.addField("ID", member.id, true)
	   	.addField("Kayıt Tarihi", member.createdAt, false)
	   	.setColor(3447003)
            	.setThumbnail(newrole.guild.iconURL)
            	.setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
	   member.guild.channels.find("name", "cube-log").send(embed);
    }
});

bot.on("guildMemberLeave", function(member) {
    if (DevreDisiGuildler.includes(member.guild.id)) return;
    if (member.guild.channels.first().type == "text") {
        member.guild.channels.first().send("| :outbox_tray: | **" + member.user.username + "** Sunucudan Ayrıldı!");
    }
    if (member.guild.channels.find("name", "cube-log")) {
	   var embed = new Discord.RichEmbed()
	   	.setAuthor(member.username, member.avatarURL)
	   	.setTitle(":inbox_tray: Sunucuya Katıldı")
	   	.addField("ID", member.id, true)
	   	.addField("Son Mesaj Tarihi", member.lastMessage.createdAt, false)
	   	.setColor(3447003)
            	.setThumbnail(newrole.guild.iconURL)
            	.setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
	   member.guild.channels.find("name", "cube-log").send(embed);
    }
});

bot.on("roleUpdate", function(oldrole, newrole) {
    if (DevreDisiGuildler.includes(newrole.guild.id)) return;
    if (!newrole.guild.channels.find("name", "cube-log")) {
        if (newrole.name != oldrole.name || newrole.permissions != oldrole.permissions) {
	     if (newrole.guild.channels.first().type == "text") {
		 var embed = new Discord.RichEmbed()
            		.setAuthor("Rol Güncellemesi", newrole.guild.iconURL)
            		.addField("**>**  Eski Rol İsmi", oldrole.name, true)
            		.addField("**>**  Eski Rol Yetkileri", oldrole.permissions, true)
            		.addField("**>**  Yeni Rol İsmi", newrole.name, true)
            		.addField("**>**  Yeni Rol Yetkileri", newrole.permissions, true)
            		.setColor(3447003)
            		.setThumbnail(newrole.guild.iconURL)
            		.setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
            	newrole.guild.channels.first().send(embed);
	     }
        }
    }
    else {
	 var embed = new Discord.RichEmbed()
            .setAuthor("Rol Güncellemesi", newrole.guild.iconURL)
            .addField("**>**  Eski Rol İsmi", oldrole.name, true)
            .addField("**>**  Eski Rol Yetkileri", oldrole.permissions, true)
            .addField("**>**  Yeni Rol İsmi", newrole.name, true)
            .addField("**>**  Yeni Rol Yetkileri", newrole.permissions, true)
            .setColor(3447003)
            .setThumbnail(newrole.guild.iconURL)
            .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
         newrole.guild.channels.find("name", "cube-log").send(embed);   
    }
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (message.content.startsWith(Prefix)) {
    try {

    var args = message.content.substring(Prefix.length).split(" ")

    switch (args[0].toLowerCase().replace("ı", "i").replace("ü", "u").replace("ş", "s").replace("ç", "c")) {
        case "adminduyuru":
            const mesaj = args.join(" ").replace(args[0]).replace(" ", "").replace("undefined", "")
            if (message.author.id == "273453450019471361" || message.author.id == "293006152692662273" || message.author.id == "225925576551038977") {
                bot.guilds.forEach(function(guild) {
                    if (guild.channels.first().type == "text") {
                        guild.channels.first().send(mesaj);
                    }
                });
            }
            else {
                message.delete()
            }
            break
        case "yasakla":
            const kullanici = args[1]
            let member = message.mentions.members.first();
            if (!message.member.roles.some(r=>["BanMembers"].includes(r.name))) {
                if (!args[1] == "") {
                    const sebep = args.join(" ").replace(args[0], "").replace(args[1], "")
                    if (!args[2] == "") {
                        if (!member) {
                            return message.channel.send("**Kullanıcı bulunamadı!**");
                        }
                        if (member.bannable) {
                            member.ban(sebep)
                            message.channel.send("<@" + member.id + ">, **sunucudan başarıyla `" + sebep + "` sebebiyle yasaklandı!**");
                            var embed = new Discord.RichEmbed()
                                .setAuthor("Cube - Yasaklama", bot.user.avatarURL)
                                .setDescription(message.guild.name + "sunucusundan yasaklandınız!")
                                .addField("**>**  **YASAKLAYAN: **" + "<@" + message.author.id + ">", "**SEBEP: **" + sebep)
                                .setColor(3447003)
                                .setThumbnail(message.author.avatarURL)
                                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                            member.user.send(embed);
                        }
                        else {
                            message.channel.send("**Kullanıcı yasaklanamıyor. Kullanıcının yetkisi daha yüksek olabilir!**");
                        }
                    }
                    else {
                        message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                    }
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            break
        case "at":
            const atilacakkullanici = args[1]
            let atilacakmember = message.mentions.members.first();
            if (!message.member.roles.some(r=>["KickMembers"].includes(r.name))) {
                if (!args[1] == "") {
                    const sebep = args.join(" ").replace(args[0], "").replace(args[1], "")
                    if (!args[2] == "") {
                        if (!atilacakmember) {
                            return message.channel.send("**Kullanıcı bulunamadı!**");
                        }
                        if (atilacakmember.bannable) {
                            atilacakmember.kick(sebep)
                            message.channel.send("<@" + atilacakmember.id + ">, **sunucudan başarıyla `" + sebep + "` sebebiyle atıldı!**");
                        }
                        else {
                            message.channel.send("**Kullanıcı yasaklanamıyor. Kullanıcının yetkisi daha yüksek olabilir!**");
                        }
                    }
                    else {
                        message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                    }
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            break
        case "tavsiye":
            if (!args[1] == "") {
                var tavsiye = args.join(" ").replace(args[0]).replace(" ", "").replace("undefined", "")
                var webhook = new Discord.WebhookClient("396661614402600960", process.env.TAVSIYE_TOKEN)
                var embed = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .addField("**>**  Tavsiye", tavsiye)
                    .setColor(3447003)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                webhook.send(embed);
                message.channel.send(":white_check_mark: **Tavsiyeniz `" + tavsiye + "` başarıyla gönderildi!**");
            }
            break
        case "avatar":
            var embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(3447003)
                .setImage(message.author.avatarURL)
                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
            message.channel.send(embed)
            break
        case "hataverdirme":
            throw new Error("İsteğe bağlı hata verdirildi!")
            break
        case "bilgi":
            var embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .addField("**>**  Yapımcı", "<@273453450019471361>")
                .addField("**>**  Yapımcılar", "<@293006152692662273> ve <@225925576551038977>")
                .addField("**>**  Altyapı", "Discord.JS (hydrabolt)")
                .addField("**>**  Sürüm", "Yok")
                .addField("**>**  Cube Resmi Sunucu", "https://discord.gg/eEm46bW")
                .addField("**>**  Cube Davet Linki", "https://bit.ly/CubeDiscord")
                .setColor(3447003)
                .setThumbnail(bot.user.avatarURL)
                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
            message.channel.send(embed)
            break
        case "bol":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    const result = args[1] / args[2]
                    message.channel.send(result);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "carp":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    const result = args[1] * args[2]
                    message.channel.send(result);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "cikar":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    const result = args[1] - args[2]
                    message.channel.send(result);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "davetolustur":
            if (message.member.roles.some(r=>["CreateInstantInvite"].includes(r.name))) {
                message.channel.createInvite().then(invite =>
                    message.channel.send(":white_check_mark: **Başarılı! **" + invite.url)
                );
            }
            else {
                message.delete()
            }
            break
        // case "level":
            // var embed = new Discord.RichEmbed()
                // .setAuthor(message.author.username, message.author.avatarURL)
                // .addField("**>** Mesajlar", levels[message.guild.id][message.author.id].level)
                // .setColor(3447003)
                // .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
            // message.channel.send(embed);
            // break
        case "oylama":
            if (!args[1] == "") {
                if (message.member.roles.some(r=>["Administrator"].includes(r.name))) {
                    var oylama = args.join(" ").replace(args[0], "").replace("undefined", "")
                    var embed = new Discord.RichEmbed()
                        .setAuthor("Oylama", message.guild.iconURL)
                        .addField("**>** Konu", oylama)
                        .setColor(3447003)
                        .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                    message.channel.send(embed).then((oylamamessage) =>
                    {
                        oylamamessage.react("✅")
                        oylamamessage.react("❌")
                    });
                }
                else {
                    message.delete()
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
	case "havadurumu":
	    if (!args[1] == "") {
		var havadurumu = args.join(" ").replace(args[0], "").replace("undefined", "").replace(" ", "")
		var havadurumuid = ""
		var havadurumuname = ""
		var havadurumudescription = ""
		var havadurumucountry = ""
		var havadurumuhumidity = ""
		var havadurumuwindspeed = ""
		request.get("http://api.openweathermap.org/data/2.5/weather?APPID=f4f00e4463cd080d8de2b99ff72c3526&q=" + havadurumu, {host: "http://api.openweathermap.org/data/2.5/weather?APPID=f4f00e4463cd080d8de2b99ff72c3526&q=" + havadurumu}, function(err,res,body) {
			var havadurumuresponse = JSON.parse(body)
			if (havadurumuresponse.cod == 200) {
				havadurumuid = havadurumuresponse.id
				havadurumuname = havadurumuresponse.name
				havadurumudescription = havadurumuresponse.weather[0].description
				havadurumucountry = havadurumuresponse.sys.country
				havadurumuhumidity = havadurumuresponse.main.humidity
				havadurumuwindspeed = havadurumuresponse.wind.speed
				var embed = new Discord.RichEmbed()
					.setTitle(":sunny: " + havadurumuname)
					.setDescription("Bilgiler %100 doğru olmayabilir.")
					.addField("**>** ID", havadurumuid, true)
					.addField("**>** Açıklama", havadurumudescription.replace("few clouds", "Az Bulutlu").replace("broken clouds", "Parçalı Bulutlu").replace("sunny", "Güneşli").replace("clear sky", "Açık Hava").replace("overcast clouds", "Kapalı Bulutlar"), true)
					.addField("**>** Ülke", havadurumucountry, true)
					.addField("**>** Nem", havadurumuhumidity, true)
					.addField("**>** Rüzgar Hızı", havadurumuwindspeed, true)
					.setColor(3447003)
					.setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
				message.channel.send(embed);
			}
			else {
				message.channel.send("**Şehir bulunamadı!**");
			}
		});
	    }
	    else {
		    message.channel.send("**Komut parametreleri eksik veya hatalı!**"); 
	    }
	    break
        case "steam":
            if (!args[1] == "") {
                var steam = args.join(" ").replace(args[0], "").replace("undefined", "").replace(" ", "")
                var steamid = ""
		var steamusername = ""
		var steamrealname = ""
		var steamcountry = ""
		var steamavatar = ""
		var steamfriends = ""
		var steamgames = ""
                request.get("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=D007A91AEECB430CED9666E886056870&vanityurl=" + steam, {"host": "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=D007A91AEECB430CED9666E886056870&vanityurl=" + steam}, function(err,res,body) { 
			var responseid = JSON.parse(body)
			if (responseid.response.success == 1) {
				steamid = responseid.response.steamid
				request.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=D007A91AEECB430CED9666E886056870&steamids=" + steamid, {host: "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=D007A91AEECB430CED9666E886056870&steamid=" + steamid}, function(err,res,body) {
					var responseuser = JSON.parse(body)
					steamusername = responseuser.response.players[0].personaname
					steamrealname = responseuser.response.players[0].realname
					steamcountry = responseuser.response.players[0].loccountrycode
					steamavatar = responseuser.response.players[0].avatarfull
					request.get("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=D007A91AEECB430CED9666E886056870&steamid=" + steamid, {host: "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=D007A91AEECB430CED9666E886056870&steamid=" + steamid}, function(err,res,body) {
						var responsegames = JSON.parse(body)
						steamgames = responsegames.response.game_count
						request.get("http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=D007A91AEECB430CED9666E886056870&steamid=" + steamid, {host: "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=D007A91AEECB430CED9666E886056870&steamid=" + steamid}, function(err,res,body) {
							var responsefriends = JSON.parse(body)
							steamfriends = Object.keys(responsefriends.friendslist.friends[0]).length
							var embed = new Discord.RichEmbed()
								.setAuthor(steamusername, steamavatar)
								.addField("**>** ID", steamid, true)
								.addField("**>** Gerçek İsim", steamrealname.replace("undefined", "Belirlenmedi"), true)
								.addField("**>** Ülke", steamcountry.replace("undefined", "Belirlenmedi"), true)
								.addField("**>** Arkadaş Sayısı", steamfriends, true)
								.addField("**>** Oyun Sayısı", steamgames, true)
								.setColor(3447003)
								.setThumbnail(steamavatar)
								.setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
							message.channel.send(embed);
						});
					});
				});
			}
			else {
				message.channel.send("**Kullanıcı bulunamadı!**");
			}
                });
            }
	    else {
		   message.channel.send("**Komut parametreleri eksik veya hatalı!**"); 
	    }
            break
	case "eval":
	    if (args[1] == "") {
		  if (message.author.id == "273453450019471361" || message.author.id == "293006152692662273" || message.author.id == "225925576551038977") {
			var evalcommand = args.join(" ").replace(args[0], "").replace("undefined", "") 
			var evaled = eval(code);

      			if (typeof evaled !== "string")
        			evaled = require("util").inspect(evaled);

      			message.channel.send(clean(evaled), {code:"xl"});
		  }
		  else {
			  message.delete()
		  }
	    }
	    break
	case "base64":
	    if (!args[1] == "") {
		   var base64 = args.join(" ").replace(args[0], "").replace("undefined", "") 
		   var encrypted = new Buffer(base64).toString('base64')
		   message.channel.send(":white_check_mark: **" + encrypted + "**");
	    }
	    else {
		  message.channel.send("**Komut parametreleri eksik veya hatalı!**");  
	    }
	    break
	case "sha256":
	    if (!args[1] == "") {
		   var sha256text = args.join(" ").replace(args[0], "").replace("undefined", "") 
		   var encrypted = sha256(sha256text)
		   message.channel.send(":white_check_mark: **" + encrypted + "**");
	    }
	    else {
		  message.channel.send("**Komut parametreleri eksik veya hatalı!**");  
	    }
	    break
        case "google":
            if (!args[1] == "") {
                var googlearama = args.join(" ").replace(args[0], "").replace("undefined", "")
                var sonuclar = ""
                google(googlearama, function(err, res) {
                    for (var i = 0; i < 1; ++i) {
                        var link = res.links[i]
                        message.channel.send("**" + link.title + "**" + ' - ' + link.href);
                    }
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "hastebin":
            if (!args[1] == "") {
                request.post({
                    headers: {"content-type":"text/plain"},
                    url: "https://hastebin.com/documents",
                    form: args.join(" ").replace(args[0], "")
                }, function(error, response, body){
                    const result = JSON.parse(body)
                    message.channel.send(":white_check_mark: **Başarıyla Yüklendi: **`" + result.key + "`");
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "host":
            var embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .addField("**>**  Bit", os.arch(), true)
                .addField("**>**  Sürüm", os.release(), true)
                .addField("**>**  Platform", os.type(), true)
                .setColor(3447003)
                .setThumbnail(bot.user.avatarURL)
                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
            message.channel.send(embed)
            break
        case "kagit":
            message.react("📄")
            var randomresponse = ["Taş", "Kağıt", "Makas"]
            if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Taş") {
                message.channel.send(":new_moon: Taş. | **Sen Kazandın**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Kağıt") {
                message.channel.send(":page_facing_up: Kağıt. | **Eşitiz**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Makas") {
                message.channel.send(":scissors: Makas. | **Ben Kazandım**");
            }
            break
        case "kanalbilgisi":
            var embed = new Discord.RichEmbed()
                .setAuthor(message.channel.name, message.guild.iconURL)
                .addField("**>**  ID", message.channel.id)
                if (message.channel.nsfw) {
                    embed.addField("**>**  Uygunsuz", "Evet", true)
                }
                else {
                    embed.addField("**>**  Uygunsuz", "Hayır", true)
                }
                embed.addField("**>**  Oluşturuldu", message.channel.createdAt, true)
                .setColor(3447003)
                .setThumbnail(message.guild.iconURL)
                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
            message.channel.send(embed)
            break
        case "konustur":
            var konustur = args.join(" ").replace(args[0], "")
            if (!args[1] == "") {
                message.delete()
                message.channel.send(konustur);
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "kullanicibilgisi":
            if (!args[1] == "") {
                var memberinfo = message.mentions.members.first();
                if (memberinfo) {
                    var embed = new Discord.RichEmbed()
                        .setAuthor(memberinfo.user.username, memberinfo.user.avatarURL)
                        .addField("**>**  ID", memberinfo.id, true)
                        .addField("**>**  Kullanıcı Adı", memberinfo.user.username, true)
                        .addField("**>**  Kayıt Tarihi", memberinfo.user.createdAt, true)
                        if (memberinfo.user.bot) {
                            embed.addField("**>** Bot", "Evet", true)
                        }
                        else {
                            embed.addField("**>** Bot", "Hayır", true)
                        }
                        embed.setColor(3447003)
                        .setThumbnail(memberinfo.user.avatarURL)
                        .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                    message.channel.send(embed)
                }
                else {
                    return message.channel.send("**Kullanıcı bulunamadı!**");
                }
            }
            else {
                var embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .addField("**>**  ID", message.author.id, true)
                .addField("**>**  Kullanıcı Adı", message.author.username, true)
                .addField("**>**  Kayıt Tarihi", message.author.createdAt, true)
                if (message.author.bot) {
                    embed.addField("**>** Bot", "Evet", true)
                }
                else {
                    embed.addField("**>** Bot", "Hayır", true)
                }
                embed.setColor(3447003)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                message.channel.send(embed)
            }
            break
        case "kurallar":
            var embed = new Discord.RichEmbed()
                .setTitle(":closed_book: Kurallar")
                .addField("**>**  :point_right: Küfür Yasaktır", "**---------------------------------**")
                .addField("**>**  :point_right: Argo Yasaktır", "**---------------------------------**")
                .addField("**>**  :point_right: Reklam Yasaktır", "**---------------------------------**")
                .setColor(3447003)
                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
            message.channel.send(embed)
            break
        case "makas":
            message.react("✂")
            var randomresponse = ["Taş", "Kağıt", "Makas"]
            if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Taş") {
                message.channel.send(":new_moon: Taş. | **Ben Kazandım**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Kağıt") {
                message.channel.send(":page_facing_up: Kağıt. | **Sen Kazandın**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Makas") {
                message.channel.send(":scissors: Makas. | **Eşitiz**");
            }
            break
        case "mcavatar":
            if (!args[1] == "") {
                var username = args.join(" ").replace("mcavatar", "").replace(" ", "").replace(" ", "_")
                var embed = new Discord.RichEmbed()
                    .setImage("https://minotar.net/cube/" + username + "/100.png")
                    .setColor(3447003)
                message.channel.send(embed);
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "mcbasarim":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    var title = args[1].replace("ş", "s").replace("ç", "c").replace("ğ", "g").replace("ü", "u").replace("ı", "i").replace("Ş", "S").replace("Ç", "C").replace("Ğ", "G").replace("Ü", "U")
                    var description = args.join(" ").replace(args[0], "").replace(args[1], "").replace(" ", "").replace(" ", "").replace("ş", "s").replace("ç", "c").replace("ğ", "g").replace("ü", "u").replace("ı", "i").replace("Ş", "S").replace("Ç", "C").replace("Ğ", "G").replace("Ü", "U")
                    var embed = new Discord.RichEmbed()
                        .setImage(url.parse("https://achievecraft.net/i/19.1/" + title + "/" + description + ".png").href)
                        .setColor(3447003)
                    message.channel.send(embed);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "mcskin":
            if (!args[1] == "") {
                var oyuncu = args.join(" ").replace(args[0]).replace(" ", "").replace(" ", "_").replace("undefined", "")
                var embed = new Discord.RichEmbed()
                    .setImage(url.parse("https://minotar.net/armor/body/" + oyuncu + "/" + "100.png").href)
                    .setColor(3447003)
                message.channel.send(embed);
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "mcsunucu":
            if (!args[1] == "") {
                var ip = args.join(" ").replace(args[0]).replace(" ", "").replace(" ", ".").replace("undefined", "")
                request.get("https://api.mcsrvstat.us/1/" + ip, {"host": "https://api.mcsrvstat.us/1/" + ip}, function(err,res,body) { 
                    var json = JSON.parse(body)
                    if (!json.offline) {
                        var serverIP = json.ip
                        var serverPort = json.port
                        var serverMotd = json.motd.clean
                        var serverPlayers = json.players.online
                        var serverMaxPlayers = json.players.max
                        var serverIcon = json.icon
                        var serverVersion = json.version
                        var serverSoftware
                        if (json.software) {
                            serverSoftware = json.software
                        }
                        else {
                            serverSoftware = "Algılanmadı"
                        }
                        var embed = new Discord.RichEmbed()
                            .setAuthor("Minecraft Sunucusu", "https://use.gameapis.net/mc/query/icon/" + ip)
                            .setTitle("<:aktif:399225238883139586> Sunucu Aktif!")
                            .addField("**>**  Motd", serverMotd, false)
                            .addField("**>**  Oyuncular", serverPlayers + "/" + serverMaxPlayers, true)
                            .addField("**>**  Sürüm", serverVersion, true)
                            .addField("**>**  Yazılım", serverSoftware, true)
                            .addField("**>**  Port", serverPort, true)
                            .setColor(3447003)
                            .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                            .setThumbnail("https://use.gameapis.net/mc/query/icon/" + ip)
                        message.channel.send(embed)
                    }
                    else {
                        message.channel.send("**Sunucu Aktif Değil!**");
                    }
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
	case "robloxgrup":
	    if (!args[1] == "") {
		var robloxgrup = args.join(" ").replace(args[0], "").replace("undefined", "").replace(" ", "")  
		var robloxgrupid = ""
		var robloxgrupname = ""
		var robloxgrupowner = ""
		var robloxgrupicon = ""
		var robloxgrupdescription = ""
		request.get("https://api.roblox.com/groups/" + robloxgrup, {host: "https://api.roblox.com/groups/" + robloxgrup}, function(err,res,body) {
			var grupresponse = JSON.parse(body)
			if (!grupresponse.errors) {
				robloxgrupid = grupresponse.Id
				robloxgrupname = grupresponse.Name
				robloxgrupowner = grupresponse.Owner.Name
				robloxgrupdescription = grupresponse.Description
				request.get("https://www.roblox.com/group-thumbnails?params=%5B%7BgroupId:" + robloxgrupid + "%7D%5D", {host: "https://www.roblox.com/group-thumbnails?params=%5B%7BgroupId:" + robloxgrup + "%7D%5D"}, function(err,res,body) {
					var grupiconresponse = JSON.parse(body)
					robloxgrupicon = grupiconresponse[0].thumbnailUrl
					var embed = new Discord.RichEmbed()
						.setAuthor(robloxgrupname, robloxgrupicon)
						.addField("**>** ID", robloxgrupid, true)
						.addField("**>** Sahibi", robloxgrupowner, true)
						.addField("**>** Açıklama", robloxgrupdescription, false)
						.setColor(3447003)
                				.setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                				.setThumbnail(robloxgrupicon)
					message.channel.send(embed);
				});
			}
			else {
				message.channel.send("**Grup bulunamadı!**");
			}
		});
	    }
	    else {
		   message.channel.send("**Komut parametreleri eksik veya hatalı!**"); 
	    }
	    break
        case "robloxavatar":
            if (!args[1] == "") {
                var oyuncu = args.join(" ").replace(args[0]).replace(" ", "").replace(" ", "_").replace("undefined", "")
                request.get("https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=" + oyuncu, {"host": "https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&username=" + oyuncu, "followAllRedirects": true}, function(err,res,body) {
                    var embed = new Discord.RichEmbed()
                        .setImage(res.request.uri.href)
                        .setColor(3447003)
                    message.channel.send(embed);
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "sarkiturkce":
            var songs = ["Manuş Baba - Eteği Belinde",
                "Ziynet Sali - Ağlar Mıyım? Ağlamam",
                "Mabel Matiz - Ya Bu İşler Ne",
                "İrem Derici - Bazı Aşklar Yarım Kalmalı",
                "Murat Dalkılıç & Oğuzhan Koç - Aşinayız",
                "Mustafa Ceceli - Geçti O Günler",
                "Hadise - Sıfır Tolerans",
                "Aleyna Tilki - Sen Olsan Bari",
                "Tuğba Yurt - İnceden İnceden",
                "Oğuzhan Koç - Vermem Seni Ellere",
                "Buhay - Sahiden",
                "Hande Yener - Benden Sonra",
                "Bahadır Tatlıöz - Takvim",
                "Ozan Doğulu feat Ece Seçkin - Sayın Seyirciler",
                "Ferhat Göçer feat Volga Tamöz - Günah (Slow Versiyon)",
                "Emre Aydın - Beni Vurup Yerde Bırakma",
                "İlyas Yalçıntaş - Gel Be Gökyüzüm",
                "Edis - Çok Çok",
                "Erdem Kınay Feat Merve Özbey - Boynun Borcu",
                "Derya Uluğ - Nabız 180"]
            var embed = new Discord.RichEmbed()
                .setTitle(songs[Math.floor(Math.random() * songs.length)])
                .setDescription("Türkçe Şarkı")
                .setColor(3447003)
            message.channel.send(embed);
            break
        case "sarkiyabanci":
            var songs = ["Super Sako Feat Spitakci Hayko - Mi Gna",
                "Sean Paul Feat Dua Lipa - No Lie",
                "Jason Derulo Feat Nicki Minaj & TY Dolla Sign - Swalla",
                "Luis Fonsi & Daddy Yankee feat Justin Bieber - Despacito",
                "Massari - Done Da Da",
                "No Method - Let Me Go",
                "Anne Marie - Ciao Adios",
                "Inna - Gimme Gimme",
                "Mahmut Orhan Feat Eneli - Save Me",
                "Jax Jones Feat Raye - You Don't Know Me",
                "Pitbull & J Balvin Feat Camila Cabello - Hey Ma",
                "A - Wa Feat Pitbull - Habib Galbi",
                "Charlie Puth - Attention",
                "Artistic Raw Feat Ida - In The Middle",
                "Arilena Ara - Nentori - Bess Remix",
                "ED Sheeran - Shape Of You",
                "Katy Perry Feat Skip Marley - Chained To The Rhythm",
                "Marian Hill - Down",
                "Ofenbach - Be Mine",
                "Arash Feat Mohombi - Se Fue"]
            var embed = new Discord.RichEmbed()
                .setTitle(songs[Math.floor(Math.random() * songs.length)])
                .setDescription("Yabancı Şarkı")
                .setColor(3447003)
            message.channel.send(embed);
            break
        case "slots":
            var esyalar = [
                ":moneybag: ",
                ":dollar: ",
                ":euro: ",
                ":pound: ",
                ":money_with_wings: ",
                ":gem: ",
                ":yen: "
            ]
            var item1 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item2 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item3 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item4 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item5 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item6 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item7 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item8 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var item9 = esyalar[Math.floor(Math.random() * esyalar.length)]
            var slots = message.channel.send(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "----------").then((msg) =>
            {
                delay(750).then(() => {
                    msg.edit(item4 + item5 + item6 + os.EOL + item7 + item8 + item9 + "<" + os.EOL + item1 + item2 + item3 + os.EOL + "----------")
                    delay(750).then(() => {
                        msg.edit(item7 + item8 + item9 + os.EOL + item1 + item2 + item3 + "<" + os.EOL + item4 + item5 + item6 + os.EOL + "----------")
                        delay(750).then(() => {
                            msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "----------")
                            delay(750).then(() => {
                                if (item4 == item5 && item5 == item6) {
                                    msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "KAZANDIN")
                                }
                                else {
                                    msg.edit(item1 + item2 + item3 + os.EOL + item4 + item5 + item6 + "<" + os.EOL + item7 + item8 + item9 + os.EOL + "KAYBETTIN")
                                }
                            })
                        })
                    })
                })
            });
            break
        case "sorusor":
            if (!args[1] == "") {
                var soru = args.join(" ").replace(args[0]).replace(" ", "").replace("undefined", "")
                var cevaplar = [
                    "Evet",
                    "Hayır",
                    "Belki",
                    "Olabilir"
                ]
                var embed = new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .addField("**>**  Soru", soru, false)
                    .addField("**>**  Cevap", cevaplar[Math.floor(Math.random() * cevaplar.length)], true)
                    .setColor(3447003)
                    .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                message.channel.send(embed)
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "sunucubilgisi":
	    if (!message.guild) return message.channel.send("**Özel mesaj ile bu komut kullanılamaz!**");
            var embed = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .addField("**>**  ID", message.guild.id, true)
                .addField("**>**  İsim", message.guild.name, true)
                .addField("**>**  Sahibi", "<@" + message.guild.owner.id + ">" + ", (" + message.guild.owner.id + ")", true)
                .addField("**>**  Bölge", message.guild.region, true)
                .addField("**>**  Kanallar", message.guild.channels.size, true)
                .addField("**>**  Üyeler", message.guild.memberCount, true)
                .addField("**>**  Roller", message.guild.roles.size, true)
                .addField("**>**  Ana Kanalı", "<#" + message.guild.channels.first().id + ">", true)
                .addField("**>**  Zaman Aşımı Süresi", message.guild.afkTimeout + " saniye", true)
                .addField("**>**  Doğrulama Seviyesi", message.guild.verificationLevel.toString().replace("0", "Yok").replace("1", "Düşük").replace("2", "Orta").replace("3", "(╯°□°）╯︵ ┻━┻").replace("4", "┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"), true)
                .addField("**>**  Sakıncalı İçerik Filtresi", message.guild.explicitContentFilter.toString().replace("true", "Etkin").replace("false", "Devre Dışı"), true)
                .addField("**>**  Oluşturulma Tarihi", message.guild.createdAt, false)
                .setColor(3447003)
                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                .setThumbnail(message.guild.iconURL)
            message.channel.send(embed)
            break
        case "sunucuduyuru":
            if (!args[1] == "") {
                var duyuru = args.join(" ").replace(args[0]).replace(" ", "").replace("undefined", "")
                if (message.member.roles.some(r=>["Administrator"].includes(r.name))) {
                    message.guild.channels.forEach(function(channel) {
                        if (channel.type == "text") {
                            channel.send(duyuru);
                        }
                    });
                }
                else {
                    message.delete()
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "sunucuikon":
	    if (!message.guild) return message.channel.send("**Özel mesaj ile bu komut kullanılamaz!**");
            var embed = new Discord.RichEmbed()
                .setImage(message.guild.iconURL)
                .setColor(3447003)
            message.channel.send(embed);
            break
        case "topla":
            if (!args[1] == "") {
                if (!args[2] == "") {
                    const result = args[1] - -Math.abs(args[2])
                    message.channel.send(result);
                }
                else {
                    message.channel.send("**Komut parametreleri eksik veya hatalı!**");
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "temizle":
            if (!args[1] == "") {
                if (message.member.roles.some(r=>["Manage Messages"].includes(r.name))) {
                    var temizle = parseInt(args[1])
                    if (temizle > 100)
                    return message.channel.send("**Mesaj silme sınırı 100'dür!**");
                    if (temizle < 2)
                    return message.channel.send("**Minimum 2 mesaj silinebilir!**");
                    message.channel.bulkDelete(temizle)
                    message.channel.send(":white_check_mark: **" + temizle + "**");
                }
                else {
                    message.delete()
                }
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "twitch":
            if (!args[1] == "") {
                var yayinci = args.join(" ").replace(args[0]).replace(" ", "").replace("undefined", "")
                request.get("https://api.twitch.tv/kraken/streams/" + yayinci, {"host": "https://api.twitch.tv/kraken/streams/" + yayinci, headers: {"content-type": "application/vnd.twitchtv.v5+json", "Client-ID": "ds1ln5ziugn2v3yb44bhjf7mx24i8l"}}, function(err,res,body) { 
                    var json = JSON.parse(body)
                    if (json.stream !== null) {
                        var channelUsername = json.stream.channel.display_name
                        var channelURL = json.stream.url
                        var channelUserImage = json.stream.channel.logo
                        var channelStreamName = json.stream.channel.status
                        var channelStreamGame = json.stream.game
                        var channelStreamViewers = json.stream.viewers
                        var channelStreamPreview = json.stream.preview.large
                        var embed = new Discord.RichEmbed()
                            .setAuthor(channelUsername, channelUserImage)
                            .setTitle("<:aktif:399225238883139586> Şimdi Yayında!")
                            .addField("**>**  Yayın", channelStreamName, false)
                            .addField("**>**  Oyun", channelStreamGame, true)
                            .addField("**>**  İzleyici", channelStreamViewers, true)
                            .setImage(channelStreamPreview)
                            .setColor(3447003)
                            .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                            .setThumbnail(channelUserImage)
                        message.channel.send(embed)
                    }
                    else {
                        message.channel.send("**Kullanıcı Aktif Değil!**");
                    }
                });
            }
            else {
                message.channel.send("**Komut parametreleri eksik veya hatalı!**");
            }
            break
        case "tas":
            message.react("🌑")
            var randomresponse = ["Taş", "Kağıt", "Makas"]
            if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Taş") {
                message.channel.send(":new_moon: Taş. | **Sen Kazandın**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Kağıt") {
                message.channel.send(":page_facing_up: Kağıt. | **Eşitiz**");
            }
            else if (randomresponse[Math.floor(Math.random() * randomresponse.length)] == "Makas") {
                message.channel.send(":scissors: Makas. | **Ben Kazandım**");
            }
            break
	case "ping":
	    var ping = message.channel.send("Ping!").then((pinglatency) => {
		    var latency = pinglatency.createdTimestamp - message.createdTimestamp
		    pinglatency.edit("**Gecikme Süresi: `" + latency + "ms`**")
	    });
	    break
	case "windows":
 	    var embed = new Discord.RichEmbed()
 	    	.setTitle("<:windows:400026747741011968> Windows")
 	    	.setImage(WindowsResimleri[Math.floor(Math.random() * WindowsResimleri.length)])
 	    	.setColor(3447003)
 	    message.channel.send(embed);
 	    break
	case "csgo":
 	    var embed = new Discord.RichEmbed()
 	    	.setTitle("<:csgo:401045015289135114> CSGO")
 	    	.setImage(CSGOResimleri[Math.floor(Math.random() * CSGOResimleri.length)])
 	    	.setColor(3447003)
 	    message.channel.send(embed);
 	    break
	case "ataturk":
 	    var embed = new Discord.RichEmbed()
 	    	.setTitle("<:ataturk:401048704360120341> Atatürk")
 	    	.setImage(AtaturkResimleri[Math.floor(Math.random() * AtaturkResimleri.length)])
 	    	.setColor(3447003)
 	    message.channel.send(embed);
 	    break
	case "kedi":
 	    var embed = new Discord.RichEmbed()
 	    	.setTitle("<:kedi:401053333898395649> Kedi")
 	    	.setImage(KediResimleri[Math.floor(Math.random() * KediResimleri.length)])
 	    	.setColor(3447003)
 	    message.channel.send(embed);
 	    break
        case "yardim":
            var embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setTitle("<:yardim:401040634745454597> Yardım Komutları")
                .addField("**>**  Moderasyon Komutları", "c!at <kullanici> - Kullanıcıyı Atar!" + os.EOL + 
                "c!sunucuduyuru <mesaj> - Sunucudaki bütün kanallara mesaj atar!" + os.EOL +
                "c!temizle <sayi> - Sayı kadar mesaj temizler!" + os.EOL + 
                "c!yasakla <kullanici> <sebep> - Kullanıcıyı sunucudan yasaklar!")
	    	.addField("**>** Resim Komutları", "c!windows - Windows başlangıcı gönderir!" + os.EOL +
		"c!csgo - CSGO gifleri gönderir!" + os.EOL + 
		"c!ataturk - Atatürk resimleri gönderir!" + os.EOL + 
		"c!kedi - Kedi gifleri gönderir!")
                .addField("**>**  Eğlence Komutları", "c!avatar - Avatarınızı Gösterir!" + os.EOL +
                "c!kagit - Taş-Kağıt-Makas!" + os.EOL +
                "c!konustur <mesaj> - Botu konuşturur!" + os.EOL +
                "c!makas - Taş-Kağıt-Makas!" + os.EOL +
                "c!slots - Slots Oyunu!" + os.EOL +
                "c!sorusor <mesaj> - Bota soru sorun!" + os.EOL +
                "c!tas - Taş-Kağıt-Makas!" + os.EOL +
                "c!yazitura - Yazı Tura Oyunu!")
                .addField("**>**  Bilgi Komutları", "c!bilgi - Bot hakkında bilgiler gösterir!" + os.EOL +
                "c!host - Host Bilgileri!" + os.EOL +
                "c!kullanicibilgisi <kullanici> - Kullanıcı Bilgilerini Gösterir!" + os.EOL +
                "c!kurallar - Genel kuralları gösterir!" + os.EOL +
                "c!sunucubilgisi - Sunucu bilgilerini gösterir!" + os.EOL +
                "c!kanalbilgisi - Kanal bilgilerini gösterir!" + os.EOL +
                "c!yardim - Bu komut listesini gösterir!")
                .addField("**>**  Matematik Komutları", "c!topla <sayi> <sayi> - İki sayıyı toplar!" + os.EOL +
                "c!cikar <sayi> <sayi> - İki sayıyı çıkarır!" + os.EOL +
                "c!carp <sayi> <sayi> - İki sayıyı çarpar!" + os.EOL +
                "c!bol <sayi> <sayi> - İki sayıyı böler!")
                .addField("**>**  Oyun Komutları", "c!mcsunucu <ip> - Minecraft sunucu durumunu gösterir!" + os.EOL + 
                "c!mcavatar <kullaniciadi> - Minecraft avatarını gösterir!" + os.EOL +
                "c!mcbasarim <baslik> <yazi> - Minecraft başarımı oluşturur!" + os.EOL +
                "c!mcskin <kullaniciadi> - Minecraft skinini gösterir!" + os.EOL +
                "c!robloxavatar <kullaniciadi> - Roblox avatarını gösterir!")
                .addField("**>**  API Komutları", "c!twitch <kullaniciadi> - Yayın durumunu gösterir!" + os.EOL +
                "c!hastebin <yazi> - Hastebin'e yazı yükler!" + os.EOL +
		"c!havadurumu <sehir> - Şehirin hava durumunu görüntüler!" + os.EOL + 
		"c!steam <kullanici> - Steam kullanıcısını bilgilerini görüntüler!" + os.EOL + 
                "c!google <yazi> - Google araması yapar!")
                .addField("**>**  Diğer Komutlar", "c!tavsiye <mesaj> - Tavsiye gönderir!" + os.EOL + 
                "c!davetolustur - Davet oluşturur!" + os.EOL +
		"c!base64 <yazi> - Yazıyı base64 şekline çevirir!" + os.EOL + 
		"c!sha256 <yazi> - Yazıyı sha256 şekline çevirir!" + os.EOL + 
		"c!ping - Botun gecikmesini görüntüler!" + os.EOL + 
                "c!sarkiturkce - Türkçe şarkı ismi önerir!" + os.EOL +
                "c!sarkiyabanci - Yabancı şarkı ismi önerir!" + os.EOL +
                "c!sunucuikon - Sunucu ikonunu gösterir!" + os.EOL +
                "c!zaman - Şimdiki zamanı gösterir!")
                .setColor(3447003)
                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                .setThumbnail(bot.user.avatarURL)
                message.react("🤖")
                message.react("❔")
                message.react("💖")
                message.author.send(embed);
		message.channel.send("**<@" + message.author.id + ">, yardım komutlarını direkt mesaj olarak yolladım!** :mailbox_with_mail:");
                break
        case "yazitura":
            var yazitura = message.channel.send("<:yazi:383974767742418949>").then((msg) => {
                var cevaplar = [
                    "Yazı",
                    "Tura"
                ]
                delay(500).then(() => {
                    msg.edit("<:tura:389159536277323776>")
                    delay(500).then(() => {
                        msg.edit("<:yazi:389159538957352962>")
                        delay(500).then(() => {
                            msg.edit("<:tura:389159536277323776>")
                            delay(500).then(() => {
                                msg.edit("<:tura:389159536277323776>")
                                delay(500).then(() => {
                                    msg.edit("<:yazi:389159538957352962>")
                                    if (cevaplar[Math.floor(Math.random() * cevaplar.length)] == "Yazı") {
                                        msg.edit("<:yazi:389159538957352962> **| Sonuç: Yazı**")
                                    }
                                    else if (cevaplar[Math.floor(Math.random() * cevaplar.length)] == "Tura") {
                                        msg.edit("<:tura:389159536277323776> **| Sonuç: Tura**")
                                    }
                                });
                            });
                        });
                    });
                });
            });
            break
        case "zaman":
            var embed = new Discord.RichEmbed()
                .setTitle(":clock4: Zaman")
                .addField("**>**  Saat", new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), true)
                .addField("**>**  Tarih", new Date(), false)
                .setColor(3447003)
                .setFooter("Cube | SametTurkey#0286 | " + new Date(), bot.user.avatarURL)
                .setThumbnail(bot.user.avatarURL)
            message.channel.send(embed);
            break
        default:
            message.channel.send("**Bilinmeyen komut!**");
    }
    }
    catch (err) {
        message.channel.send("<@" + message.author.id + ">, **komut kullanırken bir hata oluştu: " + os.EOL + "`" + err + "`" + os.EOL + os.EOL + "Lütfen bildirin! <@273453450019471361>, <@293006152692662273>**");
    }
    }
    else {
    
    // if (!message.author.bot) {
        // if (!levels[message.guild.id]) levels[message.guild.id] = {
        //    
        // }
        // if (!levels[message.guild.id][message.author.id]) levels[message.guild.id][message.author.id] = {
        //     level : 0
        // };
        // levels[message.guild.id][message.author.id].level++
        //
        // fs.writeFile("./levels.json", JSON.stringify(levels), (err) => {
        //     if (err) console.error(err)
        // });
    //}
        
    if (message.content.toLowerCase() == "merhaba") {
        message.react("👋")
        message.channel.send("**Merhaba**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase() == "sa") {
        message.react("👋")
        message.channel.send("**Aleyküm Selam**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase() == "iyi geceler") {
        message.react("🌝")
        message.channel.send("**İyi Geceler**, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase().startsWith("teyzen")) {
        message.react("😂")
        message.channel.send("**Yok Baban** :smile:, <@" + message.author.id + ">!");
    }

    if (message.content.toLowerCase().indexOf("discord.gg/") > -1) {
        if (!message.author.bot) {
		if (!message.guild) return;
		if (message.guild.roles.find("name", "Reklam Kapalı")) {
			message.react("😡")
			message.delete()
			message.channel.send("<@" + message.author.id + ">, **lütfen reklam yapma!**");
		}
        }
    }

    if (message.content.toLowerCase().indexOf("https") > -1 || message.content.toLowerCase().indexOf("http") > -1) {
        if (message.content.toLowerCase().indexOf("discord.gg/") > -1) {
            if (message.author.bot == false) {
		if (!message.guild) return;
		if (message.guild.roles.find("name", "Reklam Kapalı")) {
			message.react("😡")
			message.delete()
			message.channel.send("<@" + message.author.id + ">, **lütfen reklam yapma!**");
		}
            }
        }
        else {
            if (message.author.bot == false) {
		if (!message.guild) return;
		if (message.guild.roles.find("name", "URL Kapalı")) {
			message.react("😡")
			message.delete()
			message.channel.send("<@" + message.author.id + ">, **lütfen URL'leri özelden paylaş!**");
		}
            }
        }
    }

    if (message.content.toLowerCase().indexOf("küfür") > -1 ||
    message.content.toLowerCase().indexOf("siktir") > -1 ||
    message.content.toLowerCase().indexOf("sikerim") > -1 ||
    message.content.toLowerCase().indexOf("amına") > -1 ||
    message.content.toLowerCase().indexOf("amina") > -1 ||
    message.content.toLowerCase().indexOf("amcık") > -1 ||
    message.content.toLowerCase().indexOf("amcik") > -1 ||
    message.content.toLowerCase().indexOf("ananı") > -1 ||
    message.content.toLowerCase().indexOf("ecdadını") > -1 ||
    message.content.toLowerCase().indexOf("sikiyim") > -1 ||
    message.content.toLowerCase().indexOf("orospu") > -1 ||
    message.content.toLowerCase().indexOf("orospu çocuğu") > -1 ||
    message.content.toLowerCase().indexOf("yarrak") > -1 ||
    message.content.toLowerCase().indexOf("pipi") > -1 ||
    message.content.toLowerCase().indexOf("göt") > -1 ||
    message.content.toLowerCase().indexOf("götveren") > -1 ||
    message.content.toLowerCase().indexOf("göt veren") > -1 ||
    message.content.toLowerCase().indexOf("bok") > -1 ||
    message.content.toLowerCase().indexOf("piç") > -1 ||
    message.content.toLowerCase().indexOf(" amk") > -1 ||
    message.content.toLowerCase().indexOf(" mk") > -1) {
        if (!message.channel.nsfw) {
            if (message.author.bot == false) {
                message.react("😠")
                message.delete()
                message.channel.send("<@" + message.author.id + ">, **lütfen küfür etme!**");
            }
        }
    }
    }
});

bot.login(process.env.BOT_TOKEN);
