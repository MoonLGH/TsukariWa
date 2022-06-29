import { Client, Message } from "@open-wa/wa-automate";

export = {
    name:"addtags",
    description: "addtags (ownerOnly)",
    execute: async (Message: Message, args: string[],client:Client) => {
            let Data = await import("../../util/GlobalVar")
            Data.defaultTags.set(args[0],{
                text:args[0],
                reply: args.join(" ").replace(args[0],""),
            })
            client.reply(Message.chatId, "Tag has been added",Message.id)
    }
}