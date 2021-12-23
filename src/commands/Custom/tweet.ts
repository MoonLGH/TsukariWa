import { Client, Message } from "@open-wa/wa-automate";
// this one is just random stuff for my schools
import Twitter from "twitter";
import dotenv from "dotenv";
dotenv.config();

export = {
    name:"tweet",
    description: "tweet something on my tweeter",
    execute: async (Message: Message, args: string[],client:Client) => {
        let Data = await import("../../util/GlobalVar")
        if(Data.allowTweet === false) {
            return client.reply(Message.chatId, "Tweeting is disabled",Message.id)
        }
        var twt = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY!,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
            access_token_key: process.env.TWITTER_ACCESS_KEY!,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET!
        });
        twt.post('statuses/update', {
            status: `${args.join(" ")}\n\n\n\n\n\n -${Message.sender.formattedName}`
        }).then(function (tweet) {
            client.reply(Message.chatId, "Tweeted\nLook at https://twitter.com/MoonLIsGood/status/${tweet.id_str}`)",Message.id)
        }).catch(err =>{
            console.log(err)
        })
    }
}