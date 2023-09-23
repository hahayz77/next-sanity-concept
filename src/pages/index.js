import Image from 'next/image'
import { Inter } from 'next/font/google'
import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';

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
    <main>
      <h1>{name}</h1>
      <Image src={urlForImage(image).url()} alt={name} width={400} height={400} />
    </main>
  )
}
