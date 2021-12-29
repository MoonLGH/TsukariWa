import { Client, Message } from "@open-wa/wa-automate";
import axios from "axios";
import nana, { nHentaiAPI } from "nana-api"
const nanaApi = new nana()
import fetch from "node-fetch"

const TYPE = {
    j: "jpg",
    p: "png",
    g: "gif"
}
export = {
    name:"nhsearch",
    description: "Search on nhenti using code/name",
    execute: async (Message: Message, args: string[],client:Client) => {
        let q = args.join(" ")

        let exist = await isExist(q)
        if(exist.res === true){
            let book = exist.book!
            let text = ""
            text += `[${book.id}] ${book.title.english}`
            text += `\nGenre = ${book.tags.map(tag => tag.name).join(" ")}`
            client.reply(Message.chatId, text, Message.id)
            client.reply(Message.chatId, "Thumbnailnya ku send di pm, bahaya disini", Message.id)

            let imgurl = `https://i.nhentai.net/galleries/${book.media_id}/1.${(TYPE as any)[book.images.cover.t]}`
            let res = await axios.get(imgurl, { responseType: 'arraybuffer'})
            const buffer = Buffer.from(res.data, 'base64');

            client.sendImage(Message.sender.id, bufferToDataUrl(`image/${(TYPE as any)[book.images.cover.t]}`,buffer), `result.${(TYPE as any)[book.images.cover.t]}`,"here u go")
        }else {
            let apisearch = await nanaApi.search(q)
            if(apisearch.results.length < 1) return client.reply(Message.chatId,"No results found",Message.id)
            let rand = apisearch.results[0]
            let book = (await nanaApi.g(rand.id) as nHentaiAPI)

            let text = ""
            text += `[${book.id}] ${book.title.english}`
            text += `\nGenre = ${book.tags.map(tag => tag.name).join(" ")}`
            client.reply(Message.chatId, text, Message.id)
            client.reply(Message.chatId, "Thumbnailnya ku send di pm, bahaya disini", Message.id)

            let imgurl = `https://i.nhentai.net/galleries/${book.media_id}/1.${(TYPE as any)[book.images.cover.t]}`
            let res = await axios.get(imgurl, { responseType: 'arraybuffer'})
            const buffer = Buffer.from(res.data, 'base64');
            
            client.sendImage(Message.sender.id, bufferToDataUrl(`image/${(TYPE as any)[book.images.cover.t]}`,buffer), `result.${(TYPE as any)[book.images.cover.t]}`,"here u go")
        }
    }
}

function bufferToDataUrl(mimetype: string, buffer: Buffer): string {
   return `data:${mimetype};base64,${buffer.toString("base64")}`;
}

async function isExist(id:string|number){
    try{
        let book = await nanaApi.g(id)
        if(book === null){
            return {res:false}
        }
        return {res:true,book}
    }catch(e){
        return {res:false}
    }
}