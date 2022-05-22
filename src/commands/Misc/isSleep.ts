import { Client, Message } from "@open-wa/wa-automate";

export = {
    name:"isleep",
    description: "isSleep (ownerOnly)",
    execute: async (Message: Message, args: string[],client:Client) => {
        if(Message.fromMe){
            let Data = await import("../../util/GlobalVar")
            Data.isSleep = Boolean(args[0])
            client.reply(Message.chatId, `Understand able its ${args[0]} now`,Message.id)
        }else{
            client.reply(Message.chatId, "Only the owner can use this command",Message.id)
        }
    }
}