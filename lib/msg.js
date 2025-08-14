const { getContentType } = require('baileys-pro');

// SMS message handler
const sms = (conn, m) => {
    const messageType = getContentType(m.message);
    const messageBody = m.message;
    
    return {
        key: m.key,
        message: messageBody,
        type: messageType,
        sender: m.key.fromMe ? conn.user.id.split(':')[0] + '@s.whatsapp.net' : m.key.participant || m.key.remoteJid,
        from: m.key.remoteJid,
        quoted: messageType === 'extendedTextMessage' && messageBody.extendedTextMessage?.contextInfo?.quotedMessage || null
    };
};

// Download media message
const downloadMediaMessage = async (message) => {
    const messageType = getContentType(message.message);
    const messageContent = message.message[messageType];
    
    if (messageContent?.url) {
        try {
            const response = await require('axios').get(messageContent.url, { responseType: 'arraybuffer' });
            return Buffer.from(response.data);
        } catch (error) {
            throw new Error(`Failed to download media: ${error.message}`);
        }
    }
    
    return null;
};

module.exports = {
    sms,
    downloadMediaMessage
};
