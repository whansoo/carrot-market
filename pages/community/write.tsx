import Button from "@components/components/button"
import Layout from "@components/components/layout"
import TextArea from "@components/components/textarea"

export default function Write () {
   return (
      <Layout canGoBack title="Write Post">
         <form className="px-4 py-10">
         <TextArea required placeholder="질문을 남겨보세요!!" />
            <Button text="Submit" />
         </form>
     </Layout>
   )
}