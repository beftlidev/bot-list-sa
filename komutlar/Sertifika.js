const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
const Embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('⚠ Hata!')
.setDescription('Bu komutu kullanabilmek için `'+message.guild.roles.cache.find(Roller => Roller.id === ayarlar.BOTModRol).name+'` rolüne sahip olman gerekli.')
if (!message.member.roles.cache.find(Rol => Rol.id === ayarlar.BOTModRol)) return message.channel.send(Embed).then(Message => Message.delete({timeout: 7500}))
const Üye = message.mentions.members.first()
if (!Üye) return message.channel.send(Embed.setDescription('Lütfen üye etiketleyin.')).then(Message => Message.delete({timeout: 7500}))
const Client = await db.fetch(`BOT_${Üye.id}`)
if (!Client) return message.channel.send('Sanırım Bu Kullanıcının Botu Yok').then(Message => Message.delete({timeout: 7500}))
client.users.fetch(Client).then((User) => {
Üye.roles.add(ayarlar.SertifikalıKullanıcıRol)
message.guild.members.cache.get(Client).roles.add(ayarlar.SertifikalıBOTRol)
message.guild.channels.cache.get(ayarlar.BOTLog).send(`<@${Üye.id}> Adlı Kullanıcının \`${User.tag}\` Adlı Botu ${message.author} Tarafından Sertifikalandı!`)
client.users.cache.get(Üye.id).send(`\`${message.guild.name}\` Adlı Sunucuda ${message.author.tag}(\`${message.author.id}\`) Tarafından \`${User.tag}\` Botuna Sertifika Verildi`)
message.react('✅')
})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sertifika','s'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Sertifika Verme',
    description: 'Sertifika Verme',
    usage: 's'
  }