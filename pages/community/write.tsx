import Button from "@components/components/button"
import Layout from "@components/components/layout"
import TextArea from "@components/components/textarea"
import useMutation from "@components/libs/client/useMutation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Post } from "@prisma/client";

interface WriteForm {
   question: string;
 }
 interface WriteResponse {
   ok: boolean;
   post: Post;
 }

export default function Write () {
   const router = useRouter();
   const { register, handleSubmit } = useForm<WriteForm>();
   const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
   const onValid = (data: WriteForm) => {
      if(loading) return;
      console.log(data)
      post(data)
    };
    useEffect(() => {
      if (data && data.ok) {
         router.push(`/community/${data.post.id}`);
       }
    }, [data, router])
   return (
      <Layout canGoBack title="Write Post">
         <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
         <TextArea register={register("question", { required: true, minLength: 5 })} required placeholder="질문을 남겨보세요!!" />
            <Button text={loading ? "Loading..." : "Submit" } />
         </form>
     </Layout>
   )
}