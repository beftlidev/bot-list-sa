const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const express = require('express')
const ayarlar = require('./ayarlar.json')
const app = express()
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
const Peppe = message => {
  console.log(`${message}`)
}

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./komutlar/', (Error, Files) => {
    if (Error) console.error(Error)
    Peppe(`${Files.length} Komut Yüklenecek!`)
    Files.forEach(Pepe => {
        let Props = require(`./komutlar/${Pepe}`)
        Peppe(`Yüklenen Komut: ${Props.help.name}.`)
        client.commands.set(Props.help.name, Props)
        Props.conf.aliases.forEach(Alias => {
        client.aliases.set(Alias, Props.help.name)
})})})

client.reload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 client.commands.set(command, CMD)
 CMD.conf.aliases.forEach(Alias => {
 client.aliases.set(Alias, CMD.help.name)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}

client.load = command => {
 return new Promise((Resolve, Reject) => {
 try {
 let CMD = require(`./komutlar/${command}`)
client.commands.set(command, CMD)
CMD.conf.aliases.forEach(Alias => {
client.aliases.set(Alias, CMD.help.name)
})
Resolve()
} catch (Hata) {
Reject(Hata)
}})}

client.unload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}
// RevengeNYKS \\
client.on('guildMemberAdd',async member => {
if (member.user.bot && db.has(`Ekledi_${member.id}`)) {
const BOTEkleyen = await db.fetch(`Ekledi_${member.id}`)
client.channels.cache.get(ayarlar.BOTModKanal).messages.fetch({around: db.fetch(`Mesaj_${member.id}`), limit:1}).then(async REmbed => {
const Embed = REmbed.first().delete()
})
const Log = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(Audit => Audit.entries.first())
client.guilds.cache.get(member.guild.id).members.cache.get(BOTEkleyen).roles.add(ayarlar.GeliştiriciRolü)
const Embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('🎉 Müjde!')
.setDescription(`🎉 Tebrikler! \`${member.guild.name}\` Adlı Sunucuda Sırada Olan \`${client.users.cache.get(member.id).tag}\` Adlı Botunuz \`${client.users.cache.get(Log.executor.id).tag}\` Tarafından Onaylandı! (Sunucudan Çıkarsan Atılacaktır.)`)
.setThumbnail(member.user.avatarURL())
.setFooter(member.guild.name+'・'+member.guild.memberCount,member.guild.iconURL({dynamic:true}))
client.users.cache.get(BOTEkleyen).send('<@'+BOTEkleyen+'>',Embed)
client.channels.cache.get('761883917065125889').send(`**<@${BOTEkleyen}> Adlı Kullanıcının \`${client.users.cache.get(member.id).tag}\` Adlı Sistemde Onay Bekleyen Botu \`${client.users.cache.get(Log.executor.id).tag} [${db.fetch(`Count_${Log.executor.id}`) || 1}]\` Tarafından Kabul Edildi.**`)
db.add(`Count_${Log.executor.id}`,1)
member.roles.add('761883877010047006')
client.channels.cache.get('802863275531304990').send(`📢 📥 Otomatik Rol Verildi Seninle Beraber **${member.guild.memberCount}** Kişiyiz! ✅ Hoşgeldin! **${member.user.tag} (<@${member.id}> \`${client.users.cache.get(Log.executor.id).tag} [${db.fetch(`Count_${Log.executor.id}`) || 1}]\`)**`)
} else {
member.roles.add('761883878373589012')

}
})
// [ ----------------------------------------------] \\
client.on('ready',async () => {
client.user.setActivity('Eklenen Botları',{ type: 'WATCHING'})
client.channels.cache.get(ayarlar.SesKanalı).join()
client.channels.cache.get('808008226715992114').messages.fetch({around: '809443590471417877', limit: 1}).then(async REmbed => {
const Embed = REmbed.first()
Embed.reactions.removeAll().then(() => {
Embed.react('806568770339864616')
Embed.react('809439874293039165')
Embed.react('809439873966407710')
Embed.react('🤖')
})
})
setInterval(() => {
client.channels.cache.get('806852174255751209').edit({name:'📆 Tarih・'+moment().format('LL')})
},60000)
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('message',async message => {
if (message.content === '!js') return message.channel.send('<#777181903051685918> Kanalına Göz At!')
if (message.content === 'p!js') return message.channel.send('<#777181903051685918> Kanalına Göz At!')
if (message.channel.id == '761883915131813888') return message.delete()
if (message.channel.type === 'dm' && message.author.id !== client.user.id) {
const Revenge = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle(`${client.emojis.cache.get('812091473204871279')} **Bir mesaj atıldı!**`)
      .setDescription(`${message.author} kullanıcısı özelime bir mesaj attı.`)
      .addField('\u200b','\u200b')
      .addField('» **Yazar hakkında**',`
      İsim: **(${message.author.tag} | ${message.author.id})**`)
      .addField('\u200b','\u200b')
      .addField('» **MESAJ**',`\`\`\`${message.content}\`\`\``)
      .setTimestamp()
      .setThumbnail(message.author.avatarURL({dynamic:true}))
      .setFooter(moment(message.author.createdAt).format('LLL'))
client.users.cache.get('675593025468235806').send(Revenge)
}
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('guildMemberRemove', async member => {
const BOTDurum = await db.fetch(`BOT_${member.id}`)
if (BOTDurum) {
client.users.fetch(BOTDurum).then(async(User) => {
client.guilds.cache.get('761877959262732289').members.cache.get(await db.fetch(`BOT_${member.id}`)).kick()
client.channels.cache.get('761883917065125889').send(`\`${member.user.tag}\` Sunucudan Ayrıldı. \`${User.tag}\` Adındaki Botunu Attım 👌`)
db.delete(`BOT_${member.id}`)
})
} else {return;}
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('messageDelete',async message => {
if (message.author.bot) return;
      const Revenge = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle(`${client.emojis.cache.get('812091473204871279')} **Bir mesaj silindi!**`)
      .setDescription(`${message.author} kullanıcısı <#${message.channel.id}> kanalından bir mesaj sildi.`)
      .addField('\u200b','\u200b')
      .addField('» **Yazar hakkında**',`
      İsim: **\`${message.member.displayName || message.author.tag} (${message.author.tag} | ${message.author.id})\`**
      Giriş sırası: **\`${message.guild.members.cache.filter(Pepeler => message.member.joinedTimestamp >= Pepeler.joinedTimestamp).size}\`**`)
      .addField('\u200b','\u200b')
      .addField('» **MESAJ**',`\`\`\`${message.content}\`\`\``)
      .setTimestamp()
      .setThumbnail(message.author.avatarURL({dynamic:true}))
      .setFooter(moment(message.author.createdAt).format('LLL'))
client.users.cache.get(message.guild.owner.id).send(message.guild.owner,Revenge)
})

client.on('messageUpdate',async (oldMessage, newMessage) => {
if (oldMessage.author.bot) return;
      const Revenge = new Discord.MessageEmbed()
      .setColor('ORANGE')
      .setTitle(`${client.emojis.cache.get('812091473204871279')} **Bir mesaj güncellendi!**`)
      .setDescription(`${oldMessage.author} kullanıcısı <#${oldMessage.channel.id}> kanalından bir mesaj güncelledi.`)
      .addField('\u200b','\u200b')
      .addField('» **Yazar hakkında**',`
      İsim: **\`${oldMessage.member.displayName} (${oldMessage.author.tag} | ${oldMessage.author.id})\`**
      Giriş sırası: **\`${oldMessage.guild.members.cache.filter(Pepeler => oldMessage.member.joinedTimestamp >= Pepeler.joinedTimestamp).size}\`**`)
      .addField('\u200b','\u200b')
      .addField('» **Eski Mesaj**','```'+oldMessage.content+'```')
      .addField('» **Yeni Mesaj**','```'+newMessage.content+'```')
      .setTimestamp()
      .setThumbnail(oldMessage.author.avatarURL({dynamic:true}))
      .setFooter(moment(oldMessage.author.createdAt).format('LLL'))
client.users.cache.get(oldMessage.guild.owner.id).send(oldMessage.guild.owner,Revenge)
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('voiceStateUpdate', async (Code, Pepe) => {
if (Pepe.member.user.bot && Pepe.channelID && Pepe.member.user.id == client.user.id && !Pepe.selfDeaf) {
Pepe.setSelfDeaf(true)
}
if (Pepe.member.user.bot && Pepe.channelID && Pepe.member.user.id == client.user.id && !Pepe.selfMute) {
Pepe.setSelfMute(true)
}
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('messageDelete',async message => {
    const Bilgi = db.fetch(`Bilgi_${message.id}`)
    if (!Bilgi) return;
    const Clientt = Bilgi.Client
    client.users.fetch(Clientt).then((Client) => {
        const Ceon = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor(client.user.tag,client.user.avatarURL())
        .setFooter(client.user.username,client.user.avatarURL())
        .setTimestamp()
        .setDescription(`❓ **| Reddetme sebebi yazınız.**`)
        client.channels.cache.get(message.channel.id).send(Ceon).then(Message => {
		Message.delete({timeout:20000})
            client.guilds.cache.get(message.guild.id).channels.cache.get(message.channel.id).awaitMessages(Message => ['675593025468235806','334063167606882305','749665141980659762','322756173654786050','','','','',''].includes(Message.author.id), {max: 1,time: 120000,errors: ['time']
            }).then(async Collected => {
            let Cevap;
            const Cevap1 = Collected.first().content
            if (!Cevap1) Cevap = 'Belirtilmedi'
            if (Cevap1) Cevap = Cevap1
            client.channels.cache.get(message.channel.id).bulkDelete(2)
            client.channels.cache.get('761883917065125889').send(`**<@${Bilgi.Gönderen}> Adlı Kullanıcının \`${Client.tag}\` Adlı Sistemde Onay Bekleyen Botu \`${Message.author.tag}\` Tarafından \`${Cevap}\` Sebebiyle Reddedildi.**`)
            })
            })
        
    })
    })
// RevengeNYKS \\
client.elevation = message => {
    if (!message.guild) {
        return
    }
    let permlvl = 0
    if (message.member.hasPermission('BAN_MEMBERS')) permlvl = 2
    if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 3
    if (message.author.id === ayarlar.sahip) permlvl = 4
    return permlvl
}

client.login(ayarlar.token)