import { Client, Message } from "@open-wa/wa-automate";
import fetch from "node-fetch";

export = {
    name:"animeschedule",
    alias:["schedule","AS"],
    description: "Get Today Anime Schedule",
    execute: async (Message: Message, args: string[],client:Client) => {
        let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = new Date()
        let dayOfWeek = weekdays[day.getDay()]
        
        const res = await fetch(`https://api.jikan.moe/v3/schedule/${dayOfWeek}`,{
          method: "GET"
        })
        const json = await res.json()
        let animes = json[dayOfWeek.toLowerCase()].map((anime: any) => anime.title).join("\n")

        client.reply(Message.chatId,`${dayOfWeek} Anime Schedule\n\n${animes}`,Message.id)
    }
}

// Start In : ${countDate(anime.airing_start)}
// function countDate(date:string){
//     let countdown = new Date(Date.now() - Date.parse(date))
//     let days = Math.floor(countdown.getTime() / (1000 * 60 * 60 * 24))
//     let hours = Math.floor((countdown.getTime() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//     let minutes = Math.floor((countdown.getTime() % (1000 * 60 * 60)) / (1000 * 60))
//     let seconds = Math.floor((countdown.getTime() % (1000 * 60)) / 1000)
//     return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
// }