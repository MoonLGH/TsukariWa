import {Collection} from "@discordjs/collection";
import {command,tags,button,rpsModel,grouptags} from "./typing";

const commands = new Collection<string, command>();
const buttons = new Collection<string, button>();
const defaultTags = new Collection<string, tags>();
const rps = new Collection<string, rpsModel>();
const tagsGroup:grouptags[] = []

let autoChat = true;
let nsfw = false;
let isSleep = false;

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
  buttons,
  rps,
  isSleep,
  tagsGroup
};
