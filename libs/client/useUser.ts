import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";



export default function useUser() {
  const { data, error } = useSWR("/api/users/me"); //key값인 것과 동시에 api호출도 가능
  const router = useRouter();
   
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
  }

  // export default function useUser() {
  //     const [user, setUser] = useState();
  //     const router = useRouter();
  //     useEffect(() => {
  //       fetch("/api/users/me")
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (!data.ok) {
  //             return router.replace("/enter");
  //           }
  //           setUser(data.profile);
  //         });
  //     }, [router]);
  //     return user;
  //   }