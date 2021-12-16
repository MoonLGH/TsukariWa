import { Client, Message } from "@open-wa/wa-automate";

export = {
    name:"rmtags",
    description: "rmtags (ownerOnly)",
    execute: async (Message: Message, args: string[],client:Client) => {
        if(Message.fromMe){
            let Data = await import("../../util/GlobalVar")
            Data.defaultTags.delete(args[0])
            client.reply(Message.chatId, `${args[0]} has been removed from tags list`,Message.id)
        }else{
            client.reply(Message.chatId, "Only the owner can use this command",Message.id)
        }
    }
}