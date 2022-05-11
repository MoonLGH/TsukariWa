import { Client, Message } from "@open-wa/wa-automate";

export = {
    name:"test",
    execute: function(message:Message,client:Client){
        client.sendText(message.chatId,"ping pongs")
    }
}