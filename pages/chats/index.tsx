import Layout from "@components/components/layout";
import Link from "next/link";

export default function Chats() {
    return (
      <Layout title="채팅" hasTabBar>
        <div className="py-3 divide-y-[1px]">
            {[1, 2, 3, 4, 5].map((_, i) => (
                 <Link href={`/chats/${i}`} key={i} className="flex px-4 cursor-pointer py-3 items-center space-x-3">
                   <div className="w-12 h-12 rounded-full bg-slate-300" />
                   <div>
                     <p className="text-gray-700">Steve Jebs</p>
                     <p className="text-sm  text-gray-500">
                       See you tomorrow in the corner at 2pm!
                     </p>
                   </div>
               </Link>
            ))}
        </div>
      </Layout>
        
    )
}