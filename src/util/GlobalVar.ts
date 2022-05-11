import {Collection} from "@discordjs/collection";
import {command,tags,button} from "./typing";

const commands = new Collection<string, command>();
const buttons = new Collection<string, button>();
const defaultTags = new Collection<string, tags>();

let autoChat = true;
let nsfw = false

// this one is just random stuff for my schools
let autoAbsen = true;

let allowTweet = false;

export {
  commands,
  autoChat,
  autoAbsen,
  defaultTags,
  allowTweet,
  nsfw,
  buttons
};
