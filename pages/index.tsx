
import Layout from '@components/components/layout'
import FloatingButton from '@components/components/floating-button'
import Item from '@components/components/item'
import useUser from '@components/libs/client/useUser';
import useSWR, { SWRConfig } from "swr";
import { Product } from "@prisma/client";
import client from '@components/libs/server/client';

export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}
export function Home () {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout title="홈" hasTabBar>
    <div className="flex flex-col space-y-5 divide-y">
      {data?.products?.map((product) => (
        <Item
          id={product.id}
          key={product.id}
          title={product.name}
          price={product.price}
          comments={1}
          hearts={product._count?.favs || 0}
          image={product.image}
        />
      ))}
      <FloatingButton href="/products/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </div>
  </Layout>
    
  )
}

export default function Page ({products}: {products: ProductWithCount[]}) {
  return (
  <SWRConfig value={{
    fallback: {
      "/api/products": {
        ok: true,
        products,
      }
    }
  }}>
     <Home />
  </SWRConfig>
  );
}

export async function getServerSideProps() {
  const products = await client.product.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}