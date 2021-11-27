import * as Handler from './util/handler';
import {commands} from './util/GlobalVar';
import fs from "fs"

async function start(){
    await Handler.LoadComamnds()
    fs.writeFileSync("./src/commands/commandsList.json",JSON.stringify(commands.map(cmd => {
        return {
            name: cmd.name,
            alias: cmd.alias,
            description: cmd.description,
            path: `/src/commands/${cmd.name}.ts`
        }
    })))
    console.log("Done")
    return commands.toJSON()
}

(async()=>{await start()})().then(console.log) 