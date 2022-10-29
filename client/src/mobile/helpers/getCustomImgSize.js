const getCustomImgSize = (url, sizeX, sizeY) => {
  const trimmed_url = url.substring(0, url.lastIndexOf("="));
  const return_url = trimmed_url + `=w${sizeX}-h${sizeY}-l90-rj`;
  return return_url;
};

export default getCustomImgSize;
