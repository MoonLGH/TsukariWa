import { Client, Message,ContactId } from '@open-wa/wa-automate';

interface command {
    name: string;
    description: string;
    category: string;
    filepath: string,
    args: string[];
    alias: string[];
    execute: (Message:Message,args:string[],Client:Client) => void
}

export interface rpsModel{
    host:ContactId;
    challanging:ContactId;
    uniqueId:string;
    currentstate: state[];
}

interface state {
    name:string;
    chosen:string
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