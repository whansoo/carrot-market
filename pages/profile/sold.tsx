import Item from "@components/components/item"
import Layout from "@components/components/layout"
import ProductList from "@components/components/product-list"



export default function Sold() {
    return (
      <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
      <ProductList kind="sales" />
      </div>
    </Layout>
      )
}