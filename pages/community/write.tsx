


export default function Write () {
   return (
     <form className="px-4 py-10">
        <textarea id="description" className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "rows={4} placeholder="질문을 남겨보세요!"/>
        <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
            Submit
        </button>
     </form>
   )
}