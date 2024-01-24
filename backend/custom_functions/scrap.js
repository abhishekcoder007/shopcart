const cheerio = require("cheerio");
var axios = require("axios");


//to check if url is valid or not
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};



const getImages = async (url) => {
  const imageList = [];

  if (!isValidUrl(url)) {
    return {
      error: "Invalid URL",
    };
  }
  try {
    const response = await axios.get(`${url}`);

    try {
      const $ = cheerio.load(response?.data);
      $("img").each((i, image) => {
        const imageUrl = $(image).attr("src");
        if (imageUrl) {
          imageList.push(imageUrl);
        }
      });

      // if  it has not domain name then it domain name

      const List = imageList.map((ele) => {
        if (ele.indexOf(url) >= 0) {
          return ele;
        } else {
          let text = `${url}${ele}`;
          return text;
        }
      });
      return List;
      
    } catch (err) {
      return [];
    }
  } catch (err) {
    console.error(err?.message);
    const data = {
      error: err.message,
    };
    return data;
  }
};

module.exports = { getImages };
