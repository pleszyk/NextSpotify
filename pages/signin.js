import Head from 'next/head';
import Image from 'next/image';
import logo from '../components/img/logo.png';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '../components/Loader';

function SignIn({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if(session) return <Loader/>

  return (
    <div className='bg-black h-screen flex flex-col items-center pt-60 space-y-8'>
      <Head>
        <title>Login - Spotify</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <Image
        src={logo}
        alt='Spotify'
        width={450}
        height={450}
        priority={true}
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className='text-black py-4 px-6 rounded-full bg-[#1dd661] transition duration-300 
            ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 animate-pulse'
            onClick={() => signIn(provider.id)}
            //hover:bg-[#1db954]
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
export default SignIn;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
