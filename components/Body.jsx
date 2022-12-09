import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Search from './Search';
import Cover from './Cover';
import Track from './Track';
import Playlists from './Playlists';
import { playlistIdState } from '../atoms/playerAtom';

function Body({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  // const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  // const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Search
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
            duration: track.duration_ms,
            explicit: track.explicit,
          };
        })
      );
    });
  }, [search, accessToken]);

  // New Releases
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  //My playlists
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getUserPlaylists().then((res) => {
      setPlaylists(
        res.body.items.map((playlist) => {
          return {
            id: playlist.id,
            title: playlist.name,
            cover: playlist.images[0],
            uri: playlist.uri,
          };
        })
      );
      console.log(res.body.items)
    });
  }, [accessToken]);


  return (
    <section className='bg-black ml-20 py-4 space-y-8 lg:max-w-5xl flex-grow md:mr-2.5'>
      <Search search={search} setSearch={setSearch}/>
      <div
        className='grid overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 h-96 py-4
      lg:grid-cols-3 xl:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8 p-4 sm:ml-2'
      >
        {searchResults.length === 0
          ? newReleases
              .slice(0, 8)
              .map((track) => (
                <Cover key={track.id} track={track} chooseTrack={chooseTrack} />
              ))
          : searchResults
              .slice(0, 8)
              .map((track) => (
                <Cover key={track.id} track={track} chooseTrack={chooseTrack} />
              ))}
      </div>
      <div className='flex gap-x-8 absolute min-w-full md:relative ml-6'></div>
      {/* Tracks */}
      <div className='w-96 lg:w-full pr-11'>
        <h2 className='text-white font-bold mb-3'>
          {searchResults.length === 0 ? 'New Releases' : 'Tracks'}
        </h2>
        <div className='space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-96 md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500'>
          {searchResults.length === 0
            ? newReleases
                .slice(4, newReleases.length)
                .map((track) => (
                  <Track
                    key={track.id}
                    track={track}
                    chooseTrack={chooseTrack}
                  />
                ))
            : searchResults
                .slice(4, searchResults.length)
                .map((track) => (
                  <Track
                    key={track.id}
                    track={track}
                    chooseTrack={chooseTrack}
                  />
                ))}
        </div>
      </div>

      <div className='flex gap-x-8 absolute min-w-full md:relative ml-6'></div>
      {/* Playlists */}
      <div className='w-96 lg:w-full pr-11'>
        <h2 className='text-white font-bold mb-3'>My Playlists</h2>
        <div className='space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500'>
          {playlists.map((track) => (
            <Playlists key={playlists.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Body;
