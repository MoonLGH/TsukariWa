import {
    create,
    Client,
    Message,decryptMedia, mediaTypes,DecryptableMessage
} from '@open-wa/wa-automate';

create({
    authTimeout:0,
    logConsole: false,
    multiDevice: true,
}).then(client => start(client));

function start(client: Client) {
    client.onAnyMessage(async (message: Message) => {
        let {
            body
        } = message
        console.log(message)
        console.log(body)
        const prefix = '#'
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        if(type !== "chat"){
            body = ""
            if(isMedia){
                body = caption
                if(!caption){
                    body = ""
                }
            }
        }
        const args = body.slice(prefix.length).split(/ +/)
        const command = args.shift()!.toLowerCase()
        const isCmd = body.startsWith(prefix)

        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        if(!isCmd) return

        if(command === 'sticker'){
            if (isMedia || isQuotedImage) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg!.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia as any)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                client.sendImageAsSticker(message.chatId, imageBase64,{author: args[0]||"author", pack: args[1]||"pack"})
            }else{
                client.sendText(message.chatId, "Pake gambar maniez")
            }
        }
        if(command === "test"){
            await client.sendText(message.chatId, "test")
        }else if(command === "say"){
            await client.sendText(message.chatId, args.join(" "))
        }
    });

}