import { Client, Message } from "@open-wa/wa-automate";

export = {
    name:"test",
    description: "Test Command",
    execute: async (Message: Message, args: string[],client:Client) => {
        client.sendText(Message.chatId, "test")
    }
}