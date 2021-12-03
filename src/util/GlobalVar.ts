import {Collection} from "@discordjs/collection";
import {command} from "./typing";

const commands = new Collection<string, command>();

let autoChat = true;

// this one is just random stuff for my schools
let autoAbsen = true;

export {
  commands,
  autoChat,
  autoAbsen
};
