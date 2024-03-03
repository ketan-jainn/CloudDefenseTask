const fetch = require('node-fetch');
const express = require('express');
const app = express();
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

app.get('/github/callback', async (req, res) => {
    const requestToken = req.query.code;
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: requestToken,
        }),
    });
    const token = await tokenResponse.json();
    if (token.access_token) {
        // Use this token for subsequent API requests
        res.send("Authentication successful");
    } else {
        res.send("Authentication failed");
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
