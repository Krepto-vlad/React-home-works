import { ReactNode } from "react";
import { Header } from "../header/index";
import { Footer } from "../footer/index";
import { Cart } from "../cart/index";

interface LayoutProps {
  cart?: Record<string, number>;
  children: ReactNode;
}

export default function Layout({ cart= {}, children }: LayoutProps) {
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
