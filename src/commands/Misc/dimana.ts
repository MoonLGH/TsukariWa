import { Client, Message } from "@open-wa/wa-automate";

export = {
    name:"dimana",
    description: "dimana",
    execute: async (Message: Message, args: string[],client:Client) => {
            client.reply(Message.chatId, "Halo, paketnya bisa di antar ke kantor als di pasar pemda lantai 2 ya \nUntuk lebih lengkapnya di https://goo.gl/maps/jk6oumx9kEe281ch9",Message.id)
    }
}