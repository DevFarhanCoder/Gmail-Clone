import { useState } from 'react';
import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
}

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
`

const ComposeMail = ({ open, setOpenDrawer }) => {
    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    // Update config with environment variables
    const config = {
        Username: process.env.REACT_APP_SMTP_USERNAME,
        Password: process.env.REACT_APP_SMTP_PASSWORD,
        Host: process.env.REACT_APP_SMTP_HOST,
        Port: parseInt(process.env.REACT_APP_SMTP_PORT, 10) // Convert Port to a number
    };

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const sendEmail = async (e) => {
        e.preventDefault();

        if (window.Email) {
            try {
                const message = await window.Email.send({
                    ...config,
                    To: data.to,
                    From: config.Username, // Use the email from config
                    Subject: data.subject,
                    Body: data.body
                });
                alert(`Email sent successfully: ${message}`);
            } catch (error) {
                console.error('Email sending error:', error);
                alert('Failed to send email. Please try again later.');
                return;
            }
        } else {
            alert('Email sending service not available.');
            return;
        }

        const payload = {
            to: data.to,
            from: config.Username,
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'devfarhancoder',
            starred: false,
            type: 'sent'
        };

        try {
            await sentEmailService.call(payload);
            setOpenDrawer(false);
            setData({});
        } catch (error) {
            console.error('Error saving sent email:', error);
            alert('Failed to save sent email.');
        }
    }

    const closeComposeMail = async (e) => {
        e.preventDefault();

        const payload = {
            to: data.to,
            from: config.Username,
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'devfarhancoder',
            starred: false,
            type: 'drafts'
        };

        try {
            await saveDraftService.call(payload);
            setOpenDrawer(false);
            setData({});
        } catch (error) {
            console.error('Error saving draft email:', error);
            alert('Failed to save draft email.');
        }
    }

    return (
        <Dialog
            open={open}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
            </Header>
            <RecipientWrapper>
                <InputBase placeholder='Recipients' name="to" onChange={(e) => onValueChange(e)} value={data.to || ''} />
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)} value={data.subject || ''} />
            </RecipientWrapper>
            <TextField 
                multiline
                rows={20}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                name="body"
                onChange={(e) => onValueChange(e)}
                value={data.body || ''}
            />
            <Footer>
                <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDrawer(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;
