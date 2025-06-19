import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: Record<number, number>;
}

const loadCartFromStorage = (): Record<number, number> => {
  const stored = sessionStorage.getItem("cart");
  return stored ? JSON.parse(stored) : {};
};

const saveCartToStorage = (items: Record<number, number>) => {
  sessionStorage.setItem("cart", JSON.stringify(items));
};

const initialState: CartState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) => {
      const { id, count } = action.payload;
      state.items[id] = (state.items[id] || 0) + count;
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = {};
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
