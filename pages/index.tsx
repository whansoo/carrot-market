
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="dark:md:hover:bg-teal-400 bg-[url('/vercel.svg')]">
      <h2 className="text-[97851px] text-[#000]">Hello</h2>
    </div>
  )
}
