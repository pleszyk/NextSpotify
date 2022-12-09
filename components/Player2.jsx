import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { AiFillFastForward, AiFillFastBackward,  } from 'react-icons/ai'
import { BiPlay, BiPause  } from 'react-icons/bi'

function Player2({ accessToken, trackUri }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  useEffect(() => {
    if (trackUri) {
      setPlay(true);
    }
  }, [trackUri]);


  if (!accessToken) return null;

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-4">
    {/* <div className="flex items-center space-x-4">
      <img
        className="hidden md:inline w-10 h-10"
        src={songInfo?.album?.images?.[0]?.url}
        alt="song-art"
      />
      <div>
        <h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists?.[0]?.name}</p>
      </div>
    </div> */}
    <div className="flex items-center justify-evenly">
      <AiFillFastBackward/>
      {play ? (
        <BiPause onClick={setPlay(false)} className="button w-10 h-10" />
      ) : (
        <BiPlay onClick={setPlay(true)} className="button w-10 h-10" />
      )}
      <AiFillFastForward/>
    </div>
  </div>
  );
}

export default Player2;
