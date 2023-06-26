const axios = require('axios');

class GitAuth {
  constructor({ clientId, clientSecret, redirectUri }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  getAuthorizeUrl(state, scope) {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state,
      scope,
    });
    return `${baseUrl}?${params.toString()}`;
  }

  async getAccessToken(code) {
    const url = 'https://github.com/login/oauth/access_token';
    const config = {
      headers: {
        Accept: 'application/json',
      },
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri,
      },
    };
    const response = await axios.post(url, null, config);
    return response.data.access_token;
  }

  async getUser(accessToken) {
    const url = 'https://api.github.com/user';
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'GitAuth',
      },
    };
    const response = await axios.get(url, config);
    return {
      name: response.data.name,
      email: response.data.email,
      avatarUrl: response.data.avatar_url,
    };
  }
}

module.exports = GitAuth;