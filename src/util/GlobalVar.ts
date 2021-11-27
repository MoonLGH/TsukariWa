import {Collection} from "@discordjs/collection";
import {command} from "./typing";

const commands = new Collection<string, command>();

export {
  commands,
};
