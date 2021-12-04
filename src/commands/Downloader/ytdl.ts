import { Client, Message } from "@open-wa/wa-automate";
import ytdl from "ytdl-core"

export = {
    name:"ytdl",
    description: "Download A Video From Youtube",
    execute: async (Message: Message, args: string[],client:Client) => {
        let url = args[0]
        if(!url) return client.reply(Message.chatId,"Please provide a url",Message.id)
        if(!ytdl.validateURL(url) && !ytdl.validateID(url)) return client.reply(Message.chatId,"Invalid Video",Message.id)
        
        let info = await ytdl.getInfo(url)
        let title = info.videoDetails.title
        
        let bufs:Uint8Array[] = [];
        let stream = ytdl(args[0], {
            filter: format => format.container === 'mp4'
        });
        stream.on('data', function (d) {
            bufs.push(d);
        });
        stream.on('end', function () {
            let vid = Buffer.concat(bufs);
            client.sendImage(Message.chatId, bufferToDataUrl("video/mp4",vid), `${title}.mp4`, "Here u go")
        })
    }
}

function bufferToDataUrl(mimetype: string, buffer: Buffer): string {
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
}