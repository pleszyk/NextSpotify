import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import RecentlyPlayed from './RecentlyPlayed';
import { signOut } from 'next-auth/react';
import { SlLogout } from 'react-icons/sl';

function Right({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <section className='p-4 space-y-8 pr-8 hidden md:block'>
      <div className='float-right'>
        <button onClick={() => signOut({ redirect: false })}>
          <SlLogout />
        </button>
      </div>

      {/* Recently Played Tracks */}
      <div className='bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4'>
        <div className='flex items-center justify-between'>
          <h4 className='text-white font-bold text-sm'>Recently Played</h4>
        </div>
        <hr className='border-1 border-[#262626]' />

        <div className='space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[600px] scrollbar-hide'>
          {recentlyPlayed.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Right;
