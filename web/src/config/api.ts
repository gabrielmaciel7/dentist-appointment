export default {
  baseUrl: window.location.href.includes('localhost')
    ? 'http://localhost:3333'
    : 'https://whiteeth-server.herokuapp.com/'
}
