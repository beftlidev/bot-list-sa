const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
const Embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('⚠ Hata!')
.setDescription('Bu komutu kullanabilmek için `'+message.guild.roles.cache.find(Roller => Roller.id === ayarlar.BANYetkilisi).name+'` rolüne sahip olman gerekli.')
if (!message.member.roles.cache.find(Rol => Rol.id === ayarlar.BANYetkilisi)) return message.channel.send(Embed).then(Message => Message.delete({timeout: 7500}))
const Pepe = message.mentions.users.first()
if (!Pepe) return message.channel.send('Üye Etiketlemeniz Gerek.').then(Message => Message.delete({timeout: 7500}))
message.react('✅')
message.channel.send(`Ow Sh*t! ${message.author} Yargı Dağıtıyor! Bence Ona Yaklaşmayın!`)
setTimeout(async() => {
await message.guild.members.cache.get(Pepe.id).ban({reason : args.slice(1).join(' ') || 'Belirtilmedi'+' | By: '+message.author.tag})
Pepe.send(`\`${message.guild.name}\` Adlı Sunucudan \`${message.author.tag}\` Tarafından \`${args.slice(1).join(' ') || 'Belirtilmedi'}\` Sebebiyle Yasaklandın!`,{files:['https://cdn.discordapp.com/attachments/681905635482402817/773814044858777610/tenor_2.gif']})
},2500)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban'],
  permLevel: 0
}

exports.help = {
  name: 'Ban',
  description: 'LOL!',
  usage: 'ban'
}