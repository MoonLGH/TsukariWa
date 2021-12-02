import { Client, decryptMedia, Message } from "@open-wa/wa-automate";
import Jimp from "jimp"

const fonts = [{name:"black",font:Jimp.FONT_SANS_128_BLACK},{name:"white",font:Jimp.FONT_SANS_128_WHITE}]
export = {
    name:"meme",
    description: "Generate Sticker From Image",
    execute: async (Message: Message, args: string[],client:Client) => {
        const {isMedia, mimetype, quotedMsg} = Message
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'

        if(!isMedia && !isQuotedImage) return client.reply(Message.chatId,"Please send an image",Message.id)
        const encryptMedia = isQuotedImage ? quotedMsg : Message
        const mediaData = await decryptMedia(encryptMedia as any)
        if(args.length === 0) return client.reply(Message.chatId,"Please send an image",Message.id)
        if(args.length === 1) return client.reply(Message.chatId,"Please Make a bottom Text",Message.id)


        let font = Jimp.FONT_SANS_128_WHITE

        if(fonts.find(f => f.name === args[0].toLowerCase())){
          font = fonts.find(f => f.name === args[0].toLowerCase())!.font
          args.shift()
        }
        let fulltext = args.join(" ")
        let topText:string, bottomText:string
        if(fulltext.includes("|")){
            let split = fulltext.split("|")
            topText = split.shift()!
            bottomText = split.join(" ")
        }else{
            let split = fulltext.split(" ")
            topText = split.shift()!
            bottomText = split.join(" ")
        }
        Jimp.read(mediaData, (err, lenna) => {
            Jimp.loadFont(font).then(font => {
              if (err) throw err;
              lenna
                .quality(100) // set JPEG quality
                // print Bottom Text and Top Text
                
                .print(
                  font,
                  lenna.bitmap.width / 2 - (Jimp.measureText(font, topText) / 2),
                  0,  
                  {   
                    text: topText,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_TOP
                  },  
                  Jimp.measureText(font, topText)
                )
                .print(
                  font,
                  lenna.bitmap.width / 2 - (Jimp.measureText(font, bottomText) / 2),
                  lenna.bitmap.height - Jimp.measureTextHeight(font, bottomText,100),  
                  {   
                    text: bottomText,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
                  },  
                  Jimp.measureText(font, bottomText)
                )
                .getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                    if (err) throw err;
                    client.sendImage(Message.chatId, bufferToDataUrl("image/png",buffer), "mim.png","Silahkan")
                })
            });
        })
    }
}

function bufferToDataUrl(mimetype: string, buffer: Buffer): string {
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
  }