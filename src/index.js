import {} from 'discord.js';
import { Client, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config';
import commands from './commands';

config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID; //This can be replaced if your bot is in many servers

client.on('ready', () => {
  console.log(`+ Logged in as ${client.user.tag}`);
  console.log(`${client}`);
});

client.on('messageCreate', (message) => {});

client.on('interactionCreate', (interaction) => {});

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function main() {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.log('Error refreshing application (/) commands:');
    console.error(error);
  }
}

main();
