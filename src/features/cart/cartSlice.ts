import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: Record<number, number>;
}

const initialState: CartState = {
  items: {},
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
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
