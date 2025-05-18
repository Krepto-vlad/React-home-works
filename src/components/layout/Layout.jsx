import { Header } from "../header/index";
import { Footer } from "../footer/index";
import { Cart } from "../cart/index";

export default function Layout({ cart, children }) {
  
  return (
    <>
      <Header>
        <Cart cart={cart} />
      </Header>
      {children}
      <Footer />
    </>
  );
}
