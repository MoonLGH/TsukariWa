import { Client, Message } from "@open-wa/wa-automate";
import { Snowflake } from "@sapphire/snowflake";
import {rps} from "../../util/GlobalVar"

let snow = new Snowflake(Date.now())
export = {
    name:"rps",
    description: "Generate Sticker From Image",
    execute: async (Message: Message, args: string[],client:Client) => {
        if(Message.mentionedJidList.length !== 1) return client.sendText(Message.chatId,"Please mention a use")
        const id = GenerateUniqueId()
        rps.set(`${id}`,{
            uniqueId:`${id}`,
            host:Message.sender.id,
            challanging:Message.mentionedJidList[0],
            currentstate:[]
        })

        client.sendButtons(Message.chatId,"test",[{id:`rps-rock-${id}`,text:"🪨"},{id:`rps-paper-${id}`,text:"📝"},{id:`rps-scissors-${id}`,text:"✂️"}],`@${Message.mentionedJidList[0].split("@")[0]} ${Message.sender.shortName} asked you to play`,"Rock paper scissors")
    }
}


function GenerateUniqueId(){
    let Generate = snow.generate();
    if(rps.has(`${Generate}`)){
        Generate = GenerateUniqueId()
    }
    return Generate
}