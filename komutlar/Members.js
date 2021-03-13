const Discord = require('discord.js')

exports.run = async (client, message, args) => {
const OtuzGünlükler = message.guild.members.cache.filter(Pepe => !Pepe.user.bot && new Date().getTime() - Pepe.joinedAt.getTime() < 30*24*60*60*1000).size
const YediGünlükler = message.guild.members.cache.filter(Pepe => !Pepe.user.bot && new Date().getTime() - Pepe.joinedAt.getTime() < 7*24*60*60*1000).size
const YirmiDörtSaatlikler = message.guild.members.cache.filter(Pepe => !Pepe.user.bot && new Date().getTime() - Pepe.joinedAt.getTime() < 1*24*60*60*1000).size
const PepeCode = new Discord.MessageEmbed()
.setColor('AQUA')
.addField('**Members**',message.guild.memberCount,true)
.addField('**Online**',message.guild.members.cache.filter(Pepe => Pepe.presence.status !== 'offline').size,true)
.addField('**Humans**',message.guild.memberCount-message.guild.members.cache.filter(Pepe => Pepe.user.bot).size,true)
.addField('**Bots**',message.guild.members.cache.filter(Pepe => Pepe.user.bot).size,true)
.addField('**24 Saate Girenler**',YirmiDörtSaatlikler,true)
.addField('**Bu Hafta Girenler**',YediGünlükler,true)
.addField('**Bu Ay Girenler**',OtuzGünlükler,true)
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Kontrol Ediliyor..')).then(Mesaj => {
setTimeout(() => {
Mesaj.edit(PepeCode)
},2500)
})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['members','say'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Pepeler',
    description: 'Pepeleri Gösterir',
    usage: 'm'
  }