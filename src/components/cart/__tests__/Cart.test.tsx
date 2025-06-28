import { render, screen } from "@testing-library/react";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";

const renderCart = (cart = {}) =>
  render(
    <BrowserRouter>
      <Cart cart={cart} />
    </BrowserRouter>
  );

describe("Cart component", () => {
  it("displays 0 if the cart is empty", () => {
    renderCart({});
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("displays the total number of products", () => {
    renderCart({ 1: 2, 2: 3 });
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("contains a link to /order", () => {
    renderCart({ 1: 1 });
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/order");
  });
});
