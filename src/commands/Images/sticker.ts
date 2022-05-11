import { Client, decryptMedia, Message } from "@open-wa/wa-automate";
import { Button } from "@open-wa/wa-automate/dist/api/model/button";

export = {
    name:"sticker",
    alias: ["stiker"],
    description: "Generate Sticker From Image",
    execute: async (Message: Message, args: string[],client:Client) => {
    
        const {isMedia, mimetype, quotedMsg} = Message
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'

        if (isMedia || isQuotedImage) {
            const encryptMedia = isQuotedImage ? quotedMsg : Message
            const _mimetype = isQuotedImage ? quotedMsg!.mimetype : mimetype
            const mediaData = await decryptMedia(encryptMedia as any)
            const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
            client.sendImageAsSticker(Message.chatId, imageBase64,{author: args[0]||"author", pack: args[1]||"pack",keepScale:true})
            client.sendButtons(Message.chatId,"bilang makasih dong",([{id:"makasih",text:"Makasih"}] as Button[]))
        }else{
            client.sendText(Message.chatId, "Pake gambar maniez")
        }

    }
}