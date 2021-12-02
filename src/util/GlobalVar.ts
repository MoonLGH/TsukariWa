import {Collection} from "@discordjs/collection";
import {command} from "./typing";

const commands = new Collection<string, command>();

let autoChat = true;
export {
  commands,
  autoChat
};
