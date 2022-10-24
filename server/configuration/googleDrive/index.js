const { google } = require("googleapis")

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SERECT = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.GOOGLE_CALLBACK_URL

exports.oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SERECT,
    REDIRECT_URI
);