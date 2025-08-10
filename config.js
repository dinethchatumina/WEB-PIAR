const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_IMG:Process.env.ALIVE_IMG || "https://images.app.goo.gl/DF4BJeZWK8wZZRpM9",
ALIVE_MSG:Process.env.ALIVE_MSG || "HELLOW, I AM YOU NAME I AM ALIVE NOW !",
};
