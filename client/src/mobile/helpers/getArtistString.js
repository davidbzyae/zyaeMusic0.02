const getArtistString = (artistsObject) => {
  var artist_string = "";
  artistsObject.forEach((artist, i) => {
    if (i !== artistsObject.length - 1)
      artist_string = artist_string + ", " + artist.name;
    else artist_string = artist_string + " & " + artist.name;
  });
  return artist_string.substring(2);
};

export default getArtistString;
