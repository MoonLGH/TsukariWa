import Collection from "@discordjs/collection";
import { Client, Message } from "@open-wa/wa-automate";
import { tags,grouptags } from "../../util/typing"
export = {
    name:"addtags",
    description: "addtags",
    execute: async (Message: Message, args: string[],client:Client) => {
        let Data = await import("../../util/GlobalVar")
        let findDefault = checkDuplicate(Data.defaultTags,args)
        let findGroup = checkDuplicateGroup(Data.tagsGroup,args)
        if(findDefault || findGroup) {
            client.reply(Message.chatId, `Failed to add, conflicted stuff`,Message.id)
            return 
        }
        if(Message.fromMe){
            Data.defaultTags.set(args[0].toLowerCase(),{
                text:args[0].toLowerCase(),
                reply: args.join(" ").replace(args[0],""),
            })
            client.reply(Message.chatId, `Tag ${args[0]} has been added`,Message.id)
            client.reply(Message.chatId, `Owner detected, adding to Main tags`,Message.id)
        }else{
            if(!Message.isGroupMsg){
                client.reply(Message.chatId, `Only for group command`,Message.id)
                return
            }
            if(!Data.tagsGroup.find((a)=>a.name === Message.from)){
                Data.tagsGroup.push({name:Message.from,tags:[]})
            }
            Data.tagsGroup.find((a)=>a.name === Message.from)?.tags.push({
                text:args[0].toLowerCase(),
                reply: args.join(" ").replace(args[0],""),
            })
            client.reply(Message.chatId, `Group Non-Owner detected, adding to Group tags`,Message.id)
        }
    }
}

function checkDuplicate(Tags:Collection<string,tags>,str:string[]){
    let jsontag = Tags.toJSON()
    for (let strs of str) {
        for (let tag of jsontag) {
            if(tag.text.toLowerCase() === strs.toLowerCase()){
                return true
            }
            for (let reply of tag.reply.split(" ")){
                if(reply.toLowerCase() === strs.toLowerCase()) {
                    return true
                }
            }
        }
    }
    return false
}

function checkDuplicateGroup(tags:grouptags[],strs:string[]){
    for (let str of strs){
        for (let group of tags){
            for(let tag of group.tags){
                if(tag.text.toLowerCase() === str.toLowerCase()){
                    return true
                }
                for (let text of tag.reply.split(" ")){
                    if(text.toLowerCase() === str.toLowerCase()) {
                        return true
                    }
                }
            }
        }
    }
    return false
}