const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Get buffer from URL
const getBuffer = async (url, options = {}) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer', ...options });
        return Buffer.from(response.data);
    } catch (error) {
        throw new Error(`Failed to get buffer from ${url}: ${error.message}`);
    }
};

// Get group admins
const getGroupAdmins = (participants) => {
    let admins = [];
    for (let i of participants) {
        if (i.admin === 'admin' || i.admin === 'superadmin') admins.push(i.id);
    }
    return admins;
};

// Generate random string
const getRandom = (ext = '') => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};

// Human readable number format
const h2k = (number) => {
    const si = [
        { v: 1E3, s: "K" },
        { v: 1E6, s: "M" },
        { v: 1E9, s: "B" },
        { v: 1E12, s: "T" },
        { v: 1E15, s: "P" },
        { v: 1E18, s: "E" }
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (number >= si[index].v) break;
    }
    return (number / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
};

// Check if URL is valid
const isUrl = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
};

// JSON parser with error handling
const Json = (string) => {
    try {
        return JSON.parse(string);
    } catch {
        return {};
    }
};

// Runtime formatter
const runtime = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
};

// Sleep function
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Fetch JSON from URL
const fetchJson = async (url, options = {}) => {
    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch JSON from ${url}: ${error.message}`);
    }
};

module.exports = {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson
};
