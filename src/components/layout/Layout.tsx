import { ReactNode } from "react";
import { useAppSelector } from "../../app/hooks";
import { Header } from "../header/index";
import { Footer } from "../footer/index";
import { Cart } from "../cart/index";

interface LayoutProps {
  cart?: Record<string, number>;
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
