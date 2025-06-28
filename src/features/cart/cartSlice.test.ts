import reducer, {
  addToCart,
  removeFromCart,
  clearCart,
} from "./cartSlice";

beforeEach(() => {
  sessionStorage.clear();
  jest.resetModules();
});

describe("cartSlice", () => {
  it("adds the item to the cart", () => {
    const state = reducer(undefined, addToCart({ id: 1, count: 2 }));
    expect(state.items[1]).toBe(2);
    expect(JSON.parse(sessionStorage.getItem("cart")!)).toEqual({ "1": 2 });
  });

  it("removes item from cart", () => {
    const initialState = {
      items: { 1: 2, 2: 3 },
    };
    const state = reducer(initialState, removeFromCart(2));
    expect(state.items).toEqual({ 1: 2 });
    expect(JSON.parse(sessionStorage.getItem("cart")!)).toEqual({ "1": 2 });
  });

  it("clears the recycle bin", () => {
    const initialState = {
      items: { 1: 5, 2: 6 },
    };
    const state = reducer(initialState, clearCart());
    expect(state.items).toEqual({});
    expect(sessionStorage.getItem("cart")).toBe(null);
  });

    it("initializes state from sessionStorage", () => {
    const mockCart = { 7: 1, 8: 3 };
    sessionStorage.setItem("cart", JSON.stringify(mockCart));

    const cartReducer = require("./cartSlice").default;

    const state = cartReducer(undefined, { type: "init" });
    expect(state.items).toEqual(mockCart);
  });
});

