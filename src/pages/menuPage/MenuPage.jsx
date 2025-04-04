import { MenuContent } from "../../components/menuContent/index";
import { Layout } from "../../components/layout/index";
import { useState } from "react";

export default function MenuPage() {
  const [totalItems, setTotalItems] = useState(0);

  const updateCartCount = (count) => {
    setTotalItems((prevTotal) => prevTotal + count);
  };

  return (
    <Layout totalItems={totalItems}>
      <MenuContent updateCartCount={updateCartCount} />
    </Layout>
  );
}
