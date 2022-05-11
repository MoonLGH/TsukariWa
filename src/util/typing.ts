import { Client, Message } from '@open-wa/wa-automate';

interface command {
    name: string;
    description: string;
    category: string;
    filepath: string,
    args: string[];
    alias: string[];
    execute: (Message:Message,args:string[],Client:Client) => void
}

interface button {
    name: string;
    filepath: string,
    execute: (Message:Message,Client:Client) => void
}

interface tags {
    text: string;
    reply: string;
    exclude?: string[];
}

export {command,tags,button}