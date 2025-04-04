import { Header } from "../header/index";
import { Footer } from "../footer/index";

export default function Layout({totalItems, children}) {
  return (
    <>
      <Header totalItems={totalItems} />
      {children}
      <Footer />
    </>
  );
}
