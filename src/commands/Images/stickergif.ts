import { Client, decryptMedia, Message } from "@open-wa/wa-automate";

export = {
    name: "stickergif",
    description: "Sticker GIF",
    execute: async (message: Message, args: string[], client: Client) => {
        const isQuotedGif = message.quotedMsg && message.quotedMsg.mimetype === 'image/gif'
        const isQuotedVideo = message.quotedMsg && message.quotedMsg.type === 'video'

        if (message.isMedia && message.type === 'video' || message.mimetype === 'image/gif') {
            try {
                const mediaData = await decryptMedia(message)
                await client.sendMp4AsSticker(message.chatId, mediaData, { fps: 24, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0 })
            } catch (err) {
                console.error(err)
                await client.reply(message.from, "Something Error",message.id)
            }
        } else if (isQuotedGif || isQuotedVideo) {
            try {
                const mediaData = await decryptMedia(message.quotedMsg as Message)
                await client.sendMp4AsSticker(message.chatId, mediaData, { fps: 24, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0 })
            } catch (err) {
                console.error(err)
                await client.reply(message.from, "Video Limit exceed", message.id)
            }
        } else {
            await client.reply(message.from, "Heh salah format", message.id)
        }
    }
}