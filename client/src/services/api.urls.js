const BASE_URL = 'https://gmailclone-2024.vercel.app/'; // Change this to your actual backend URL

export const API_URLS = {
    saveSentEmails: {
        endpoint: `${BASE_URL}/api/emails/save`, // Full endpoint URL
        method: 'POST'
    },
    saveDraftEmails: {
        endpoint: `${BASE_URL}/api/emails/save-draft`, // Full endpoint URL
        method: 'POST'
    },
    getEmailFromType: {
        endpoint: `${BASE_URL}/api/emails`, // Full endpoint URL
        method: 'GET'
    },
    toggleStarredMails: {
        endpoint: `${BASE_URL}/api/emails/starred`, // Full endpoint URL
        method: 'POST'
    },
    deleteEmails: {
        endpoint: `${BASE_URL}/api/emails/delete`, // Full endpoint URL
        method: 'DELETE'
    },
    moveEmailsToBin: {
        endpoint: `${BASE_URL}/api/emails/bin`, // Full endpoint URL
        method: 'POST'
    }
};
