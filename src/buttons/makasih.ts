import { Client, Message } from "@open-wa/wa-automate";

export = {
    name:"makasih",
    execute: function(message:Message,client:Client){
        client.sendText(message.chatId,"sama sama")
    }
}