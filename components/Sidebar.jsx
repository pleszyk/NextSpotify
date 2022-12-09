import Image from 'next/image';
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
// import { BiLogOut } from 'react-icons/bi'
import icon from './img/icon.png'
import { signOut } from 'next-auth/react';
import { SlLogout } from 'react-icons/sl';

function Sidebar() {
  return (
    <section className='fixed top-0 z-40 flex flex-col p-4 items-center
     bg-black w-[80px] h-screen space-y-8'>
      <Image
        src={icon}
        alt='Spotify'
        width={40}
        height={40}
        priority={true}
      />
      <div className='flex flex-col space-y-8'>
        <BsFillGrid3X3GapFill className='cursor-pointer text-2xl'/>
        <div className='md:hidden'>
        <button onClick={() => signOut({ redirect: false })}>
          <SlLogout />
        </button>
        </div>
        {/* <BiLogOut className='cursor-pointer text-2xl'/> */}
      </div>
      
    </section>
  );
}
export default Sidebar;
