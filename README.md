# GitHub Auth Library
 A library to authenticate with github API.


# Example

```javascript
const GitAuth = require('auth-github');

const gitAuth = new GitAuth({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'https://example.com/callback',
});

// Generate an authorization URL for the Git provider's OAuth flow
const state = Math.random().toString(36).substring(2, 15);
const scope = 'user';
const authorizeUrl = gitAuth.getAuthorizeUrl(state, scope);

// Redirect the user to the authorization URL
res.redirect(authorizeUrl);

// Exchange the authorization code for an access token
const accessToken = await gitAuth.getAccessToken(code);

// Retrieve the authenticated user's profile information
const user = await gitAuth.getUser(accessToken);
console.log(user);
```