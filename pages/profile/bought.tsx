import Item from "@components/components/item"
import Layout from "@components/components/layout"
import ProductList from "@components/components/product-list"




export default function Bought() {
    return (
      <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
      <ProductList kind="purchases" />
      </div>
    </Layout>
      )
}

