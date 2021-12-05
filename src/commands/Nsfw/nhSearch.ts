import { Client, Message } from "@open-wa/wa-automate";
import nana from "nana-api"
const nanaApi = new nana()
import fetch from "node-fetch"
import axios from "axios";

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
            text += `[${book.id}] ${book.title}`
            text += `\nGenre = ${book.tags.length !== 0 ? book.tags.map(tag => tag.name).join(" ") : "Unknown"}`
            client.reply(Message.chatId, text, Message.id)
            client.reply(Message.chatId, "Thumbnailnya ku send di pm, bahaya disini", Message.id)

            let imgurl = `https://i.nhentai.net/galleries/${book.media_id}/1.${(TYPE as any)[book.images.cover.t]}`
            // const buffer = await getFileContentByUrl(imgurl)
            client.sendFileFromUrl(Message.chatId, imgurl, `1.${(TYPE as any)[book.images.cover.t]}`, text, Message.id)
            // client.sendImage(Message.chatId, bufferToDataUrl(`image/${(TYPE as any)[book.images.cover.t]}`, buffer),`image.${(TYPE as any)[book.images.cover.t]}`,"Nih cover gambar yang tadi")
        }else {
            let apisearch = await nanaApi.search(q)
            let rand = apisearch.results[Math.floor(Math.random() * apisearch.results.length)]
            let book = await nanaApi.g(rand.id)

            let text = ""
            text += `[${book.id}] ${book.title}`
            text += `\nGenre = ${book.tags.length !== 0 ? book.tags.map(tag => tag.name).join(" ") : "Unknown"}`
            client.reply(Message.chatId, text, Message.id)
            client.reply(Message.chatId, "Thumbnailnya ku send di pm, bahaya disini", Message.id)

            let imgurl = `https://i.nhentai.net/galleries/${book.media_id}/1.${(TYPE as any)[book.images.cover.t]}`
            // const buffer = await getFileContentByUrl(imgurl)
            client.sendFileFromUrl(Message.chatId, imgurl, `1.${(TYPE as any)[book.images.cover.t]}`, text, Message.id)
            // client.sendFileFromUrl(Message.chatId, bufferToDataUrl(`image/${(TYPE as any)[book.images.cover.t]}`, buffer),`image.${(TYPE as any)[book.images.cover.t]}`,"Nih cover gambar yang tadi")
        }
    }
}
function bufferToDataUrl(mimetype: string, buffer: Buffer): string {
    if(mimetype === "image/jpg") mimetype = "image/jpeg"
   return `data:${mimetype};base64,${buffer.toString("base64")}`;
}


async function getFileContentByUrl(
  download_url: string
): Promise < Buffer > {
  const response = await axios.get(download_url, {
    responseType: "arraybuffer",
  });
  return Buffer.from(response.data, "base64");
}

async function isExist(id:string|number){
    try{
        let book = await nanaApi.g(id)
        return {res:true,book}
    }catch(e){
        return {res:false}
    }
}