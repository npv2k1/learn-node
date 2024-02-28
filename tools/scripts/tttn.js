const fetch = require("node-fetch");
const axios = require("axios").default;
// Tự động đăng ký tttn
(async () => {
  const {data} = await axios.post(
    "https://api.thuctap.zcode.vn/api/auth/login",
    {
      username: "",
      password: "",
    },
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        authorization: "Bearer null",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        Referer: "https://thuctapcntt.ptit.edu.vn/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    }
  );
    console.log(data);

  axios
    .post(
      "https://api.thuctap.zcode.vn/api/lecturer/registration",
      {
        lecturer: "sonnm",
      },
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,vi;q=0.8",
          authorization: `Bearer ${data.access_token}}`,
          "content-type": "application/json;charset=UTF-8",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://thuctapcntt.ptit.edu.vn/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
})();
