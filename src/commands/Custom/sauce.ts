import { Client, decryptMedia, Message } from "@open-wa/wa-automate";
import sagiri from "sagiri";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import fs from "fs";

export = {
    name:"sauce",
    description: "sauce",
    execute: async (Message: Message, args: string[],client:Client) => {
        if(!process.env.Sauce_API) return console.log("you would need sauce nao api key for that");
        const {isMedia, quotedMsg} = Message
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'

        if(!isMedia && !isQuotedImage) return client.reply(Message.chatId,"Please send an image",Message.id)
        const encryptMedia = isQuotedImage ? quotedMsg : Message
        const mediaData = await decryptMedia(encryptMedia as any)
        let name = randomName();
        writeFile(name,mediaData)

        const sagiriClient = sagiri(process.env.Sauce_API);
        const results = await sagiriClient(`./temp/${name}`);

        if(results.length < 1) return client.reply(Message.chatId,"No results found",Message.id)
        const result = results[0]
        let strings = `Founded with ${result.similarity.toFixed(3)}% similarity\nin ${result.site}\n${result.authorName ? `Author ${result.authorName}\n`:""}${result.authorUrl ? `Author Url ${result.authorUrl}\n`:""}${result.url}`

        client.sendFileFromUrl(Message.chatId,result.url,"result.png",strings,Message.id)
        cleanFile(name)
    }
}

function randomName():string {
    let name = `${Math.random().toString(36).substring(2)}.png`
    return name
}

function bufferToDataUrl(mimetype: string, buffer: Buffer): string {
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
}

function cleanFile(name:string){
    fs.unlinkSync("./temp/" + name)
}

function writeFile(name:string,data:Buffer){
    fs.writeFileSync("./temp/" + name,data)
}