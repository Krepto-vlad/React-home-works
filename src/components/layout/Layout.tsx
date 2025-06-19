import { PropsWithChildren } from "react";
import { useAppSelector } from "../../app/hooks";
import { Header } from "../header/index";
import { Footer } from "../footer/index";
import { Cart } from "../cart/index";
import { selectCartItems } from "../../features/cart/selectors";

export default function Layout({ children }: PropsWithChildren<{}>) {
  const cart = useAppSelector(selectCartItems);
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
