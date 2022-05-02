import {
    create,
    Client,
    Message,
} from '@open-wa/wa-automate';

import * as Handler from './util/handler';
import * as Vars from './util/GlobalVar';
import settings from './util/settings';
import dotenv from 'dotenv';
dotenv.config();

create({
    authTimeout:0,
    logConsole: false,
    multiDevice: settings.MultipleDevice || true,
    useChrome:settings.UseChrome || false,
    executablePath:process.env.PathChrome || '',
    popup:true,
}).then(client => start(client));

async function start(client: Client) {
    let jsons = await import("./util/autoChat.json")
    for (let json of jsons.default) {
        Vars.defaultTags.set(json.text, json)
    }
    Handler.LoadComamnds()
    client.onAnyMessage(async (message: Message) => {
        Handler.Handle(message,client);
    });
}
