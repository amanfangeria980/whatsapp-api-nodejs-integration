const dotenv = require("dotenv");
dotenv.config();

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
// 1. send a custom message template
const sendMessageTemplate = async () => {
    const response = await axios({
        url: "https://graph.facebook.com/v21.0/538151729380352/messages",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json ",
        },
        data: JSON.stringify({
            messaging_product: "whatsapp",
            to: "919939119911",
            // to: "919801801777",
            type: "template",
            template: {
                name: "hello_world",
                language: { code: "en_US" },
                // component: [
                //     {
                //         type: "header",
                //         paramater: [
                //             {
                //                 type: "text",
                //                 text: "Aman!",
                //             },
                //         ],
                //     },
                //     {
                //         type: "body",
                //         paramater: [
                //             {
                //                 type: "text",
                //                 text: "5",
                //             },
                //         ],
                //     },
                // ],
            },
        }),
    });
    console.log(response.data);
};

// sendMessageTemplate();

// 2. send a text message
const sendMessageText = async () => {
    const response = await axios({
        url: "https://graph.facebook.com/v21.0/538151729380352/messages",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json ",
        },
        data: JSON.stringify({
            messaging_product: "whatsapp",
            //   to: "916378194921",
            //   to: "917078609133",
            to: "919801801777",
            type: "text",
            text: {
                body: "This is a demo message from Aman.",
            },
        }),
    });
    console.log(response.data);
};

// sendMessageText();

// 3. send a image message
const sendMediaMessage = async () => {
    const response = await axios({
        url: "https://graph.facebook.com/v21.0/538151729380352/messages",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json ",
        },
        data: JSON.stringify({
            messaging_product: "whatsapp",
            to: "919801801777",
            //   to: "916378194921",
            //   to: "917078609133",
            type: "image",
            image: {
                link: "https://dummyimage.com/600x400/000/fff.png&text=sanjay",
                caption: "Aman Fangeria sent something...",
            },
        }),
    });
    console.log(response.data);
};

// sendMediaMessage();

// 4.upload our own image and sned

const uploadImageToWhatsappServer = async () => {
    const data = new FormData();
    data.append("messaging_product", "whatsapp");
    data.append("file", fs.createReadStream(process.cwd() + "/puneet.jpg"), {
        contentType: "image/jpeg",
    });
    data.append("type", "image/jpeg");
    const response = await axios({
        url: "https://graph.facebook.com/v21.0/538151729380352/media",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        },
        data: data,
    });
    console.log(response.data);
};
// puneeet image file id: 620979050356096

const sendMediaUploadedMessage = async () => {
    const response = await axios({
        url: "https://graph.facebook.com/v21.0/538151729380352/messages",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json ",
        },
        data: JSON.stringify({
            messaging_product: "whatsapp",
            to: "919801801777",
            // to: "916378194921",
            //   to: "917078609133",
            type: "image",
            image: {
                id: "620979050356096",
                caption: "Aur dharti ke bojh ",
                // link: "https://dummyimage.com/600x400/000/fff.png&text=duggubaby",
            },
        }),
    });
    console.log(response.data);
};
// uploadImageToWhatsappServer(); - get the image id
// sendMessageTemplate();
// sendMediaUploadedMessage();
sendMediaMessage();
