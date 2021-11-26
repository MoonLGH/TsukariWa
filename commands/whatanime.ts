import { Client, decryptMedia, Message } from "@open-wa/wa-automate";
import fetch from "node-fetch"
import fs from "fs"

export = {
    name:"whatanime",
    alias:["wait","whatanimeisthis","whatanimeisthat"],
    description:"What Anime Is That",
    execute: async (message: Message, args: string[],client:Client) => {
        if ((message.isMedia && message.type === 'image') || (message.quotedMsg && message.quotedMsg.type === 'image')) {
            let msg = message
            if (message.isMedia) {
                var mediaData = await decryptMedia(message, 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')
            } else {
                msg = (message.quotedMsg as Message)
                var mediaData = await decryptMedia(message.quotedMsg as Message, 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36')
            }
            console.log(mediaData.byteLength)
            // const imgBS4 = `data:${msg.mimetype};base64,${mediaData.toString('base64')}`
            client.reply(msg.chatId, 'Searching....', msg.id)
            try {
            fetch('https://api.trace.moe/search', {
                method: 'POST',
                body: mediaData,
                headers: { "Content-Type": "image/jpeg" }
            }).then(res => res.json())  
            .then(async (resolt) => {            
                if (!resolt.result || (resolt.result && resolt.result.length <= 0)) {
                    console.log(resolt)
                    return client.reply(msg.chatId, 'Maaf, saya tidak tau ini anime apa', msg.id)
                }
                let teks = ""
                const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.result[0]
                
                const { title: { chinese, english, native, romaji } ,isAdult } = (await getAnilistInfo(anilist_id) as Anime)
                
                
                if (similarity < 0.92) {
                    teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                }
                teks += `➸ *Title Japanese* : ${romaji}\n➸ *Title chinese* : ${chinese}\n➸ *Title Romaji* : ${romaji}\n➸ *Title English* : ${english}\n`
                teks += `➸ *Ecchi* : ${isAdult}\n`
                teks += `➸ *Eps* : ${episode.toString()}\n`
                teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                client.sendFileFromUrl(msg.chatId, video, `${filename}.mp4`, teks, msg.id).catch(() => {
                    client.reply(msg.chatId, teks, msg.id)
                })
            }).catch( err => {
                console.log(err)
                client.reply(message.chatId, 'Error, kayaknya kebesaran gambarnya', message.id)
            })
            } catch (e) {
                client.reply(message.chatId, 'Error, kayaknya kebesaran gambarnya', message.id)
            }
        }else{
            client.reply(message.chatId, 'Gimmie some pic stupid', message.id)
        }
    }    
}


interface Animes {
    result : Anime[]
}

interface Anime {
    isAdult: boolean,
    title: {
        english: string,
        native: string,
        romaji: string,
        chinese: string,
    }
    episode: number, 
    similarity: number,
    filename: string,
    at: string, 
    tokenthumb: string,
    anilist_id: string
}


const getAnilistInfo = (id:string) =>
  new Promise(async (resolve) => {
    const response = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      body: JSON.stringify({
        query: `query($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            idMal
            title {
              native
              romaji
              english
            }
            synonyms
            isAdult
          }
        }
        `,
        variables: {
          id
        },
      }),
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (response.status >= 400) {
      console.error(1070, response.status, await response.text());
      return resolve({
        text: "`Anilist API error, please try again later.`"
      });
    }
    return resolve((await response.json()).data.Media);
});