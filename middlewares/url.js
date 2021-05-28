function setRequestURL(url) {
    if(process.env.NODE_ENV === 'production') {
        return url;
      } else {
        return requestUrl = "http://localhost:3000" + url;
      }
}

module.exports = {
    setRequestURL
};