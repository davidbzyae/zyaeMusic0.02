import axios from "axios";

const getSearchSuggested = (query) => {
  const options = {
    url: `https://zyae.net/music/api/external/soundcloud/search_suggest/${query}`,
    method: "GET",
  };

  axios(options).then((res) => {});

  return;
};

export default getSearchSuggested;
