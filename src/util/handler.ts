import { Message,Client } from "@open-wa/wa-automate";
import settings from "./settings";
import fs from "fs"
import { commands,autoChat,autoAbsen } from "./GlobalVar";
import { command } from "./typing";

const prefix = settings.prefix;
export async function Handle(Message:Message,Client:Client) {  
    if(Message.type !== "chat"){
        Message.body = ""
        if(Message.isMedia){
            Message.body = Message.caption
            if(!Message.caption){
                Message.body = ""
            }
        }
    }
    if(Message.body && Message.body.startsWith(prefix)){
        if(Message.body === "") return;
        let args = Message.body.slice(prefix.length).split(/ +/);
        let command = args.shift()
        
        console.log(command)
        if(!command) return
        if(commands.has(command.toLowerCase()) || commands.find(cmd => cmd.alias.includes(command!.toLowerCase()))) {
            let cmd = commands.get(command) || commands.find((cmd) => cmd.alias.includes(command!.toLowerCase()));
            cmd!.execute(Message, args,Client);
        }
    }else {
        let check = await checkTag(Message.body)
        if(check && check.reply === true && autoChat === true){
            Client.reply(Message.chatId,check.replyWith,Message.id)
        }

        // this one is just random stuff for my schools, You can delete this
        checkAbsen(Message.body,Client,Message)
    }
} 

async function checkTag(str:string){
    let jsons = await import("./autoChat.json")

    let exist = jsons.default.find(json => str.toLowerCase().includes(json.text))
    if(exist){
        if(exist.exclude && !exist.exclude.find(ex => str.toLowerCase().includes(ex.toLowerCase()))){
            return {reply:true,replyWith:exist.reply}
        }else if(exist.exclude && exist.exclude.find(ex => str.toLowerCase().includes(ex.toLowerCase()))){
            return null
        }            
        return {reply:true,replyWith:exist.reply}
    }
    return null
}

export async function LoadComamnds(){
    const commandFiles = fs
    .readdirSync("./src/commands/")
    .filter((file) => file.endsWith(".ts"));

    for(let file of commandFiles){
        const command = await import(`../commands/${file}`);
        commands.set(command.name.toLowerCase(), {
            name: command.name,
            alias: command.alias || [],
            description: command.description,
            execute: command.execute
        } as command);
    }
}


// this one is just random stuff for my schools

function checkAbsen(body:string,client:Client,Message:Message){
    let NoAbsen = "13."
    let Name = "Farrel Athaillah"
    if(!body.includes(NoAbsen) || autoAbsen === false) return
    let lines = body.split("\n")

    // check if line with NoAbsen already have Name,if no write one
    if(lines.find(line => line.includes(NoAbsen) && !line.includes(Name))){
        let index = lines.findIndex(line => line.includes(NoAbsen))
        lines[index] = `${NoAbsen} ${Name}`

        client.sendText(Message.chatId,lines.join("\n"))
    }
}