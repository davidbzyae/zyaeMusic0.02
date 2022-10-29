import React from "react";

// libs
import { useParams } from "react-router-dom";

const PlaylistPage = () => {
  const [playlistID, setPlaylistID] = React.useState("");
  const { handle } = useParams();

  React.useEffect(console.log(handle), [handle]);

  return <div>PlaylistPage</div>;
};

export default PlaylistPage;
