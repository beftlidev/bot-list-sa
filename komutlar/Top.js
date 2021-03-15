const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')

exports.run = async (client, message, args) => {
const Sıralama = db.all().filter(data => data.ID.startsWith(`Count_`)).sort((a,b) => b.data - a.data)
Sıralama.length = 10
let SonuçDB = ''
for (var i in Sıralama) {
SonuçDB += `**${Sıralama.indexOf(Sıralama[i])+1}. ${client.users.cache.get(Sıralama[i].ID.slice(6)).username}** - **${Sıralama[i].data}** Ekleme.\n`
}
const PepeCode = new Discord.MessageEmbed()
.setColor('#12ae87')
.setAuthor('Leaderboard')
.setDescription(`**${moment(message.guild.members.cache.get(client.user.id).joinedAt, 'DD').fromNow()}den** beri veriler kaydedildi
(Son güncelleme **bir kaç sanyiye önce**, gelecek güncelleme **gün içerisinde**)

${SonuçDB ? SonuçDB:'Veri Yok.'}`)
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
message.channel.send(PepeCode)
}
    
    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['top'],
        permLevel: 0
      }
      
      exports.help = {
        name: 'Top',
        description: 'Top BOT',
        usage: 'top'
      }