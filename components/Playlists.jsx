function Playlists({ track }) {

  const handleclick = () => {
    console.log(track.id)
  }


  return (
    <div className='flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-g group transition ease-out' onClick={handleclick}>
      <div className='flex items-center'>
        {track.cover && (<img
          src={track.cover.url}
          alt={track.title}
          className='rounded-sm h-12 w-12 object-cover mr-3'
        />)}
        <div>
          <h4 className='text-white text-sm truncate w-[450px]'>
            {track.title}
          </h4>
        </div>
      </div>
    </div>
  );
}
export default Playlists;
