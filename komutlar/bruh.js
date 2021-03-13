const Discord = require('discord.js')

exports.run = async (client, message, args) => {
message.channel.send('discord.gg/ShVJYxF')
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['pepe'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Pepe Code',
    description: 'Pepe Code Altyapi',
    usage: 'pepe'
  }