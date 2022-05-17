import { Client, Message } from "@open-wa/wa-automate";
import {rps} from "./GlobalVar"
import {rpsModel} from "./typing"

export function RPS(message:Message,client:Client){
    const id = message.selectedButtonId.split("-")[2]

    let colRps = rps.get(id)
    if(!colRps){
        return client.sendText(message.chatId,"Probably the game has been stopped")
    }

    if(colRps!.challanging !== message.sender.id || colRps.host !== message.sender.id){
        return client.sendText(message.chatId,"You are not the challanger/host")
    }

    let progress = picked(message,colRps)
    if(progress){
        return client.sendText(message.chatId,"You are not the challanger/host")
    } else {
        return client.sendText(message.chatId,`@${message.sender.id.split("@")[0]} picked`)
    }

}

function picked(message:Message,rps:rpsModel){
    const pick = message.selectedButtonId.split("-")[1]
    const id = message.selectedButtonId.split("-")[2]
    
    rps.currentstate.push({name:`@${message.sender.id.split("@")[0]}`,chosen:pick})

    if(rps.currentstate.length !== 2) {
        return null
    }
    let result = ""

    if (rps.currentstate[0].chosen === rps.currentstate[1].chosen) result = "It's a draw!";
    else if (rps.currentstate[0].chosen === "✌️" && rps.currentstate[1].chosen === "✋") result = `**${rps.currentstate[0].name}** wins!`;
    else if (rps.currentstate[0].chosen === "🤜" && rps.currentstate[1].chosen === "✌️") result = `**${rps.currentstate[0].name}** wins!`;
    else if (rps.currentstate[0].chosen === "✋" && rps.currentstate[1].chosen === "🤜") result = `**${rps.currentstate[0].name}** wins!`;
    else if (rps.currentstate[1].chosen === "✌️" && rps.currentstate[0].chosen === "✋") result = `**${rps.currentstate[1].name}** wins!`;
    else if (rps.currentstate[1].chosen === "🤜" && rps.currentstate[0].chosen === "✌️") result = `**${rps.currentstate[1].name}** wins!`;
    else if (rps.currentstate[1].chosen === "✋" && rps.currentstate[0].chosen === "🤜") result = `**${rps.currentstate[1].name}** wins!`;

    return result
}