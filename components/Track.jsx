import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsBarChartFill,
} from 'react-icons/bs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { MdOutlineExplicit } from 'react-icons/md';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

function Track({ track, chooseTrack }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    chooseTrack(track);

    if (track.uri === playingTrack.uri) {
      setPlay(!play);
    }
  };

  function msToMin(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div
      className='flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-g group transition ease-out'
      onClick={handlePlay}
    >
      <div className='flex items-center'>
        <img
          src={track.albumUrl}
          alt={track.title}
          className='rounded-sm h-12 w-12 object-cover mr-3'
        />
        <div>
          <h4 className='text-white text-sm truncate w-[450px]'>
            {track.title}
          </h4>
          <p className='text-[rgb(179,179,179)] text-[13px] group-hover:text-white'>
            {track.artist}
          </p>
        </div>
      </div>

      <div className='md:ml-auto flex items-center space-x-2.5'>
        <h4>{track.duration && msToMin(track.duration)}</h4>
        {track.popularity && (
          <div className='text-white flex space-x-1 text-sm'>
            <BsBarChartFill className='text-lg' />
            <h4>{track.popularity}</h4>
            {track.explicit && <MdOutlineExplicit />}
          </div>
        )}

        <div className='flex items-center w-[85px] h-10 relative cursor-pointer group-hover:border-white/40'>
          {!hasLiked ? (
            <FaRegHeart
              className='text-xl ml-3'
              onClick={() => setHasLiked(!hasLiked)}
            />
          ) : (
            <FaHeart
              className='text-xl ml-3 text-[#1dd661]'
              onClick={() => setHasLiked(!hasLiked)}
            />
          )}
          {track.uri === playingTrack.uri && play ? (
            <>
              <div className='h-10 w-10 rounded-full border border-[#1dd661] flex items-center justify-center absolute -right-0.5 bg-[#1dd661]hover:scale-110'>
                <BsFillPauseFill className='text-white text-xl' />
              </div>
            </>
          ) : (
            <>
              <div className='h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#1dd661] hover:border-[#1dd661] hover:scale-110'>
                <BsFillPlayFill className='text-white text-xl ml-[1px]' />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Track;
