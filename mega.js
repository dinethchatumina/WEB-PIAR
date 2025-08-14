const { File } = require('megajs');
const fs = require('fs');
const path = require('path');

class MegaHandler {
    constructor() {
        this.authDir = path.join(__dirname, 'auth_info_baileys');
    }

    /**
     * Download session from Mega.nz URL
     * @param {string} sessionId - The session ID from config
     * @returns {Promise<boolean>} - Success status
     */
    async downloadSession(sessionId) {
        try {
            if (!sessionId) {
                console.log('Please add your session to SESSION_ID env !!');
                return false;
            }

            const sessdata = sessionId.replace("CHATUWA-MD=", "");
            const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
            
            return new Promise((resolve, reject) => {
                filer.download((err, data) => {
                    if (err) {
                        console.error('Error downloading session from Mega:', err);
                        reject(err);
                        return;
                    }

                    // Ensure auth directory exists
                    if (!fs.existsSync(this.authDir)) {
                        fs.mkdirSync(this.authDir, { recursive: true });
                    }

                    fs.writeFile(path.join(this.authDir, 'creds.json'), data, (writeErr) => {
                        if (writeErr) {
                            console.error('Error writing session file:', writeErr);
                            reject(writeErr);
                            return;
                        }
                        
                        console.log("Session downloaded from Mega ✅. Restarting bot...");
                        resolve(true);
                    });
                });
            });
        } catch (error) {
            console.error('Error in downloadSession:', error);
            throw error;
        }
    }

    /**
     * Check if content is likely a session ID rather than JSON
     * @param {string} content - File content to check
     * @returns {boolean} - True if likely a session ID
     */
    isLikelySessionId(content) {
        try {
            JSON.parse(content);
            return false;
        } catch {
            return true;
        }
    }

    /**
     * Check if session file exists and is valid
     * @returns {boolean} - True if session exists and is valid
     */
    isSessionValid() {
        const credsPath = path.join(this.authDir, 'creds.json');
        
        if (!fs.existsSync(credsPath)) {
            return false;
        }

        try {
            const content = fs.readFileSync(credsPath, 'utf8');
            return !this.isLikelySessionId(content);
        } catch {
            return false;
        }
    }
}

module.exports = MegaHandler;
