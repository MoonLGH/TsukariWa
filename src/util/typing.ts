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

export {command}