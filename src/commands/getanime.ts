import { Client, Message } from "@open-wa/wa-automate";
import malScraper from "mal-scraper";

export = {
    name:"getanime",
    description: "Get(Search) Anime",
    execute: async (Message: Message, args: string[],client:Client) => {
        let query = args.join(" ");
        if(args.length === 0) return client.reply(Message.chatId, "Please specify an anime name", Message.id);
        const result = await malScraper.getInfoFromName(query)

        if(!result) return client.reply(Message.chatId, "Anime not found", Message.id);
        let text = ""

        if(result.title) text += `Title: ${result.title}\n`
        if(result.englishTitle) text += `English Title: ${result.englishTitle}\n`
        if(result.synonyms) text += `Synonyms: ${result.synonyms.join(", ")}\n`
        if(result.synopsis) text += `Synopsis: ${result.synopsis}\n`
        if(result.type) text += `Type: ${result.type}\n`
        if(result.episodes) text += `Episodes: ${result.episodes}\n`
        if(result.status) text += `Status: ${result.status}\n`
        if(result.aired) text += `Aired: ${result.aired}\n`
        if(result.score || result.scoreStats){
            text += `${result.score ? "Score: " + result.score : ""} ${result.scoreStats ? "- Score Stats: " + result.scoreStats : ""}\n`
        }

        if(result.picture){
            client.sendImage(Message.chatId, result.picture, `${args.join(" ")}.jpg`,text)
        }else{
            client.reply(Message.chatId, text, Message.id)
        }
    }
}