const axios = require("axios").default;
console.log("con cá");
var q = "cá";
function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi,
           function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
           });
  }
  
axios
  .get(
    encodeURI(
      `https://www.google.com/complete/search?q=${q}&client=gws-wiz&xssi=t`
    ),
    { responseType: "arraybuffer", reponseEncoding: "binary" }
  )
  .then((res) => {
    //   let a  =res.data.toString('ISO-8859-1')
    let html = unicodeToChar(res.data.toString('latin1'));

    console.log(html);
  });
