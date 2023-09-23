import Image from 'next/image'
import { Inter } from 'next/font/google'
import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const pet = await client.fetch(`*[_type == "pet"]`);

  return {
    props: { pet }
  }
}

export default function Home({ pet }) {

  const { name, image } = pet[0];

  return (
    <main className='grid place-content-center h-full w-full text-lg text-center gap-8 my-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-700'>
      <h1 className='text-5xl'>Sanity and Next13 Template</h1>
      <p className='text-slate-500 font-bold'>Name and Image from Sanity dataset</p>
      <h2 className='text-4xl'>{name}</h2>
      <Image className='h-80 w-80 object-cover rounded-full mx-auto shadow-2xl' src={urlForImage(image).url()} alt={name} width={400} height={400} />
      <Link className='hover:scale-110 duration-300 ease-in-out text-blue-500 font-bold' href={"https://github.com/hahayz77/next-sanity-concept"} target='_blank'><u>GitHub Link</u></Link>
    </main>
  )
}
