const express = require("express");
const app = express();

app.listen(() => console.log("iam redy boy"));



const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const convert = require("hh-mm-ss")
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');



const prefix = "-"



client.on('message', message => {
 //OT bad boy
 if(message.content.startsWith(prefix + "server")){ 
	if (message.author.bot || !message.guild) return message.reply("this command for server only")
 
   //OT bad boy
    var EMBED = new Discord.MessageEmbed()
    .setTitle("server info") 
    .addField("server name", `${message.guild.name}`)
    .addField("server id", `${message.guild.id}`)
    .addField("server owner", `${message.guild.owner}`)
    .addField("members", `${message.guild.memberCount}`)
    .addField("Server roles", `${message.guild.roles.cache.size}`)
    .addField("server channels", `${message.guild.channels.cache.size}`)
    .addField("server region", `${message.guild.region}`)
  .addField("Verification Level", `${message.guild.verificationLevel}`)
.addField("created in", `${message.guild.createdAt.toLocaleString()}`)
.addField("Boost", `${message.guild.premiumSubscriptionCount}`)
 
 
.setColor("BLUE")
.setFooter(`Requsted by ${message.author.username}`)
    message.channel.send(EMBED)
  }
})
 

client.on('message', async badboy => {
if(badboy.content.startsWith(prefix + 'vmute')) {
if(!badboy.member.hasPermission("MUTE_MEMBERS")) return badboy.channel.send(`You Don't have the permission :MUTE_MEMBERS`);
let args = badboy.content.split(" ").slice(2).join(" ")
let mention = badboy.mentions.members.first();
if (mention.user.id == client.user.id) return badboy.channel.send("lol no");
if (mention.user.id == badboy.guild.owner.id) return badboy.channel.send(`لا تستطيع اعطاء ميوت للاونر`);
    

   
if(!mention) return badboy.channel.send(`**Usage: ${prefix}mute** \`<@user>\` \`time\``);

  
    if (mention.user.id === badboy.author.id) return badboy.channel.send(`لا تستطيع اعطاء ميوت لنفسك`);


     if (mention.roles.highest.position >= badboy.member.roles.highest.position && badboy.author.id !== badboy.guild.ownerID) return badboy.channel.send(`لا تستطيع اعطاء ميوت لشخص اعلى منك`);

if(!mention.voice.channel) return badboy.channel.send(`يجب ان يكون الشخص في روم صوتي`)
if(!args) return badboy.channel.send(`**Usage: ${prefix}mute** <@user>time`)
mention.send(new Discord.MessageEmbed()
.setTitle(`you got voice mute in ${badboy.guild.name}`)
.addField("time:", `${args}`)
.addField("by:", `${badboy.author.username}`)
)
await mention.voice.setMute(true)
badboy.channel.send(`**✅ - Successfully Voice Muted ${mention.user.tag} For ${args}**`)
setTimeout(() => {
mention.voice.setMute(false)
},ms(args))
}
});//temp voice mute



client.on('message', async badboy => {
if(badboy.content.startsWith(prefix + 'vunmute')) {
if(!badboy.member.hasPermission("MUTE_MEMBERS")) return badboy.channel.send(`You Don't have the permission :MUTE_MEMBERS`);
let mention = badboy.mentions.members.first();
if(!mention) return badboy.channel.send("منشن الشخص")
if (mention.user.id == client.user.id) return badboy.channel.send("lol no");
if (mention.user.id == badboy.guild.owner.id) return badboy.channel.send(`لا تستطيع  `);


    if (mention.user.id === badboy.author.id) return badboy.channel.send(`لا تستطيع اعطاء ميوت لنفسك`);


     if (mention.roles.highest.position >= badboy.member.roles.highest.position && badboy.author.id !== badboy.guild.ownerID) return badboy.channel.send(`لا تستطيع اعطاء ميوت لشخص اعلى منك`);
if(!mention.voice.channel) return badboy.channel.send(`يجب ان يكون الشخص في روم صوتي`)

mention.send(new Discord.MessageEmbed()
.setTitle(`you got  unmute voice in ${badboy.guild.name}`)

.addField("by:", `${badboy.author.username}`)
)

mention.voice.setMute(false)
badboy.channel.send("تم فك الميوت الصوتي عن هاذا الشخص")
}
});//temp voice mute


client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "mute")){

    
    if(!badboy.member.hasPermission("MUTE_MEMBERS")) return badboy.channel.send("انت لا تمتلك صلاحيات كافية")
   let mention = badboy.mentions.members.first();
   if(!mention) return badboy.channel.send("منشن الشخص")

let role = badboy.guild.roles.cache.find(ro => ro.name == 'Muted');
if(!role) {
    badboy.guild.roles.create({
        data: {
            name: 'Muted',
            permissions: [],
            color: 'random'
        }
    })
}
  
if (mention.user.id == client.user.id) return badboy.channel.send("lol no");
if (mention.user.id == badboy.guild.owner.id) return badboy.channel.send(`لا تستطيع اعطاء ميوت للاونر`);
    

badboy.guild.channels.cache.forEach(c => {
c.updateOverwrite(role , {
SEND_MESSAGES: false, 
ADD_REACTIONS: false
});
})
let args = badboy.content.split(" ").slice(2).join(" ")
if(!args) return badboy.channel.send("اكتب الوقت")

    badboy.channel.send(`تم اعطاء الشخص ميوت لمدة ${args}`)
    mention.send(new Discord.MessageEmbed()
    .setTitle(`you got mute in ${badboy.guild.name}`)
    .addField("time:", `${args}`)
    .addField("by:", `${badboy.author.username}`)
    )
mention.roles.add(role)

setTimeout(() => {
mention.roles.remove(role)

},ms(args))
  }
})




client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "unmute")){


    if(!badboy.member.hasPermission("MUTE_MEMBERS")) return badboy.channel.send("انت لا تمتلك صلاحيات كافية")
   let mention = badboy.mentions.members.first();
   if(!mention) return badboy.channel.send(":x:")
       if (mention.user.id === badboy.author.id) return badboy.channel.send(`لا تستطيع فك ميوت لنفسك`);

let role = badboy.guild.roles.cache.find(ro => ro.name == 'Muted');
if(!role) {
    badboy.guild.roles.create({
        data: {
            name: 'Muted',
            permissions: [],
            color: 'random'
        }
    })
}

if (mention.user.id == client.user.id) return badboy.channel.send("lol no");
if (mention.user.id == badboy.guild.owner.id) return badboy.channel.send(`لا تستطيع فك ميوت  للاونر`);
     if (mention.roles.highest.position >= badboy.member.roles.highest.position && badboy.author.id !== badboy.guild.ownerID) return badboy.channel.send(`لا تستطيع  فك الميوت لشخص اعلى منك`);

if(!mention) return badboy.channel.send(`${prefix} mute @user time `);
badboy.guild.channels.cache.forEach(c => {
c.updateOverwrite(role , {
SEND_MESSAGES: true, 
ADD_REACTIONS: false
});
})
badboy.channel.send("تم فك الميوت عن هاذا الشخص")
mention.roles.remove(role)

  }
})//temp text mute



client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "avatar")){
    let user = badboy.mentions.users.first()|| client.users.cache.get(badboy.content.split(' ')[1])
if(!user) return badboy.channel.send("منشن الشخص او ايديه")
var embed = new Discord.MessageEmbed()
.setDescription(`[Avatar Link](${user.avatarURL({dynamic: true})})`)
.setTimestamp()
.setImage(`${user.avatarURL({dynamic: true})}`)
.setFooter(`request by ${badboy.author.username}`)
badboy.channel.send(embed)
  }
})//avatar

client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "embed")){
    var args = badboy.content.split(" ").slice(1).join(" ") 
    if(!args) return 
    var embed = new Discord.MessageEmbed()
    .setDescription(`${args}`)
    .setColor("RANDOM")
    badboy.channel.send(embed)

     }
})//say [embed]



client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "say")){
      var args = badboy.content.split(" ").slice(1).join(" ") 
    if(!args) return 
    badboy.channel.send(args)
  }
})//say [no embed]

client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "hide")){

    if(!badboy.member.hasPermission("MANAGE_CHANNELS")) return

     let everyone = badboy.guild.roles.cache.find(badboy => badboy.name === '@everyone');
          
   badboy.channel.createOverwrite(everyone, {
      VIEW_CHANNEL: false,

    })
    badboy.channel.send("تم اخفاء الروم")
  }
})//hide
client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "unhide")){

    if(!badboy.member.hasPermission("MANAGE_CHANNELS")) return

     let everyone = badboy.guild.roles.cache.find(badboy => badboy.name === '@everyone');
          
    badboy.channel.createOverwrite(everyone, {
      VIEW_CHANNEL: true,
      
    })
    badboy.channel.send("تم اضهار الروم")
  }
})//unhide




client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "lock")){

    if(!badboy.member.hasPermission("MANAGE_CHANNELS")) return

     let everyone = badboy.guild.roles.cache.find(badboy => badboy.name === '@everyone');
          
   badboy.channel.createOverwrite(everyone, {
      SEND_MESSAGES: false,

    })
    badboy.channel.send("تم قفل الروم")
  }
})//lock
client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "unlock")){

    if(!badboy.member.hasPermission("MANAGE_CHANNELS")) return

     let everyone = badboy.guild.roles.cache.find(badboy => badboy.name === '@everyone');
          
    badboy.channel.createOverwrite(everyone, {
      SEND_MESSAGES: true,
      
    })
    badboy.channel.send("تم فتح الروم")
  }
})//unlock






client.on('message', badboy => {
    if(badboy.content.startsWith(prefix + 'ping')) {
        var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Your Ping')
        .setDescription(`> Your Ping | ${client.ws.ping}`)
        .setTimestamp()
        badboy.channel.send(embed);
    }
});//ping



client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "nick")){
    if(!badboy.member.hasPermission("MANAGE_NICKNAMES")) return 
    let user = badboy.mentions.users.first()|| client.users.cache.get(badboy.content.split(' ')[1])
    if(!user) return 
    var args = badboy.content.split(" ").slice(2).join(" ")
    if(!user) return
    badboy.guild.member(user).setNickname(args)
    badboy.channel.send("done")
  }
})//nickname 





client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "kick")){
    if(!badboy.member.hasPermission("KICK_MEMBERS")) return 
        let user = badboy.mentions.users.first()|| client.users.cache.get(badboy.content.split(' ')[1])
if(!user) return badboy.channel.send("لا استطيع ايجاد العضو")
    badboy.guild.member(user).kick()
badboy.channel.send("تم طرد هاذا الشخص")
  }
})//kick

client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "ban")){
    if(!badboy.member.hasPermission("BAN_MEMBERS")) return 
        let user = badboy.mentions.users.first()|| client.users.cache.get(badboy.content.split(' ')[1])
if(!user) return badboy.channel.send("لا استطيع ايجاد العضو")
    badboy.guild.member(user).ban()
badboy.channel.send("تم تبنيد هاذا الشخص")
  }
})//ban


client.on('message', badboy => {
  if(badboy.content.startsWith(prefix + "help")){
    badboy.author.send(`
    vmute --> لاعطاء ميوت صوتي لشخص بوقت
    vkick --> لطرد شخص من روم صوتي
    mute --> ميوت كاتبي لشخص بوقت
    unmute --> لفك ميوت عن شخص
    say --> لجعل البوت يعيد كلامك  بدون امبيد
    embed --> لجعل البوت يعيد كلامك بامبيد
    hide --> لاخفاء الروم
    unhide --> لعرض الروم 
    lock --> لقفل الروم
    unlock --> لفتح الروم 
    server --> لعرض معلومات السيرفر
    kick --> لطرد شخص
    ban --> لتبنيد شخص
    ping --> لعرض سرعت اتصال البوت
    nick --> لتغير نيك نيم لشخص معين

    
    `)
    badboy.react("✅")
  }
})
