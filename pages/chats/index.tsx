

export default function Chats() {
    return (
        <div className="py-10 divide-y-[1px]">
            {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex px-4 cursor-pointer py-3 items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-300"/>
              <div>
                <p className="text-gray-700">Steve Jebs</p>
                <p className="text-sm text-gray-500">내일 오후 2시에 만나요</p>
              </div>
            </div>
            ))}
            
        </div>
    )
}