import {
    create,
    Client,
    Message,
} from '@open-wa/wa-automate';

import * as Handler from './util/handler';
import settings from './util/settings';
import dotenv from 'dotenv';
dotenv.config();

create({
    authTimeout:0,
    logConsole: false,
    multiDevice: settings.MultipleDevice || true,
    cachedPatch: true,
    useChrome:settings.UseChrome || false,
    executablePath:process.env.PathChrome || '',
}).then(client => start(client));

function start(client: Client) {
    Handler.LoadComamnds()
    client.onAnyMessage(async (message: Message) => {
        Handler.Handle(message,client);
    });
}