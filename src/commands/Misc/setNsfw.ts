import { Client, Message } from "@open-wa/wa-automate";
// this one is just random stuff for my schools

export = {
    name:"setNsfw",
    description: "setNsfw (Custom) (ownerOnly)",
    execute: async (Message: Message, args: string[],client:Client) => {
        if(Message.fromMe){
            let Data = await import("../../util/GlobalVar")
            Data.nsfw = JSON.parse(args[0])
            client.reply(Message.chatId, "allow nsfw has been set to " + Data.autoAbsen,Message.id)
        }else{
            client.reply(Message.chatId, "Only the owner can use this command",Message.id)
        }
    }
}