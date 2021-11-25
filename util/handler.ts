import { Message,Client } from "@open-wa/wa-automate";
import settings from "./settings";
import fs from "fs"
import { commands } from "./GlobalVar";

const prefix = settings.prefix;
export async function Handle(Message:Message,Client:Client) {  
    if(Message.body || Message.body.startsWith(prefix)){
        if(Message.body === "") return;
        let args = Message.body.slice(prefix.length).split(/ +/);
        let command = args.shift()
        
        console.log(command)
        if(!command) return
        if(commands.has(command.toLowerCase()) || (commands.find((cmd) => {
            if(!cmd.alias) return false;
            return cmd.alias.includes(command!.toLowerCase())
        }))) {
            let cmd = commands.get(command);
            cmd!.execute(Message, args,Client);
        }
    }
} 

export async function LoadComamnds(){
    const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".ts"));

    for(let file of commandFiles){
        const command = await import(`../commands/${file}`);
        commands.set(command.name.toLowerCase(), command);
    }
}