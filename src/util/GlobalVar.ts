import {Collection} from "@discordjs/collection";
import {command,tags} from "./typing";

const commands = new Collection<string, command>();
const defaultTags = new Collection<string, tags>();

let autoChat = true;

// this one is just random stuff for my schools
let autoAbsen = true;

let allowTweet = false;

export {
  commands,
  autoChat,
  autoAbsen,
  defaultTags,
  allowTweet,
};
