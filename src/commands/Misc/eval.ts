import { Client, Message } from "@open-wa/wa-automate";
import * as ts from "typescript"
import {inspect} from "util"

function clean(text:string) {
    return String(text).replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
  }

export = {
    name:"eval",
    description: "eval a javascript code",
    execute: async (Message: Message, args: string[],client:Client) => {
        if(!Message.fromMe) return client.sendText(Message.chatId, "you are not me")
        try{
            const matches = args.join(" ").match(/```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/)?.groups;

            let coded = matches!.code;
          if (matches!.lang && matches!.lang.toLowerCase() === "ts") {
            coded = ts.transpile(matches!.code);
          }
          let evaled = eval(coded);
          const raw = evaled;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let promise:any; let output; let bin; let download; let type; let color;
    
          if (evaled instanceof Promise) {
            // eslint-disable-next-line prefer-const
            promise = await evaled
                .then((res) => {
                  return {resolved: true, body: inspect(res, {depth: 0})};
                })
                .catch((err) => {
                  return {rejected: true, body: inspect(err, {depth: 0})};
                });
          }
    
          if (typeof evaled !== "string") {
            evaled = inspect(evaled, {depth: 0});
          }
    
          if (promise) {
            output = clean(promise.body);
          } else {
            output = clean(evaled);
          }
    
          if (promise?.resolved) {
            color = "GREEN";
            type = "Promise (Resolved)";
          } else if (promise?.rejected) {
            color = "RED";
            type = "Promise (Rejected)";
          } else {
            color = "GREY";
            type = (typeof raw).charAt(0).toUpperCase() + (typeof raw).slice(1);
          }
    
    
          if (output.length > 1000) {
            await fetch("https://hastebin.com/documents", {
              method: "POST",
              body: output,
              headers: {"Content-Type": "text/plain"},
            }).then((res) => res.json())
                .then((json) => bin = "https://hastebin.com/" + json.key + ".js")
                .catch(() => null);
          }
    
          let str = output.length > 1000 ? bin : output
          return client.sendText(Message.chatId,(str as string))
        } catch(err) {
            return client.sendText(Message.chatId,(err as Error).name)
        }
    }
}