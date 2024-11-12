import Sidebar from "./Sidebar"
import Body from "./Body"
import Right from "./Right"
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";
import Player from "./Player";
import Player2 from "./Player2";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {

  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setShowPlayer(true);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <main className="flex justify-between min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar/>
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
      <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} />

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  )
}
export default Dashboard