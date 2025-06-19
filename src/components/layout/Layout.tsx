import { PropsWithChildren } from "react";
import { useAppSelector } from "../../app/hooks";
import { Header } from "../header/index";
import { Footer } from "../footer/index";
import { Cart } from "../cart/index";



export default function Layout({ children }: PropsWithChildren<{}>) {
  const cart = useAppSelector((state) => state.cart.items);
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
