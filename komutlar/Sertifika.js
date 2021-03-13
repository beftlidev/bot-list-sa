const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
const Embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('⚠ Hata!')
.setDescription('Bu komutu kullanabilmek için `'+message.guild.roles.cache.find(Roller => Roller.id === ayarlar.BOTModRol).name+'` rolüne sahip olman gerekli.')
if (!message.member.roles.cache.find(Rol => Rol.id === ayarlar.BOTModRol)) return message.channel.send(Embed).then(Hata => Hata.delete({timeout:15000}))
const Üye = message.mentions.members.first()
if (!Üye) return message.channel.send(Embed.setDescription('Lütfen üye etiketleyin.')).then(Hata => Hata.delete({timeout:15000}))
const Client = await db.fetch(`BOT_${Üye.id}`)
//if (Client.length > 2) return message.react('806579000565694484').then(() => message.react('2️⃣'))
if (!Client) return message.channel.send('Sanırım Bu Kullanıcının Botu Yok').then(Hata => Hata.delete({timeout:15000}))
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