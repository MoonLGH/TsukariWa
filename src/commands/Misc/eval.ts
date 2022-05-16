import { Client, Message } from "@open-wa/wa-automate";

export = {
    name:"eval",
    description: "eval a javascript code",
    execute: async (Message: Message, args: string[],client:Client) => {
        if(!Message.fromMe) return client.sendText(Message.chatId, "you are not me")
        const evalVal = eval(args.join(" "))
        client.sendText(Message.chatId, evalVal)
    }
}