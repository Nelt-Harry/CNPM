const express = require("express");
const multer = require('multer')
const stream = require('stream');
const { google } = require("googleapis")

const { oauth2Client } = require("../configuration/googleDrive")
// const PARENT_FOLDER_ID = process.env.PARENT_FODLER_ID

const router = express.Router();
const upload = multer()

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    return await google.drive({ version: 'v3', auth: oauth2Client }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["1N8xTfb2E4eRKyzV35IHQeKX4ZwfWyTwr"],
        },
        fields: 'id,name',
    })
};


const deleteFile = async (fileId) => {
    google.drive({ version: 'v3', auth: oauth2Client }).files.delete({
        fileId
    })
}

router.delete("/", async (req, res) => {
    if (!oauth2Client.credentials.access_token) {
        oauth2Client.setCredentials({ 'access_token': req.user.google.token })
    }

    const { fileId } = req
    await deleteFile(fileId).then((response) => {
        res.json("deleted file")
    }, (err) => res.json(err))
})

router.post("/", upload.any(), async (req, res) => {
    if (!oauth2Client.credentials.access_token) {
        oauth2Client.setCredentials({ 'access_token': req.user.google.token })
    }

    var idImages = []
    try {
        const { files } = req
        for (let f = 0; f < files.length; f += 1) {
            const { data } = await uploadFile(files[f]);
            idImages.push(data.id)
        }
        res.json(idImages)
    } catch (err) {
        res.json(err)
    }
});

module.exports = router;