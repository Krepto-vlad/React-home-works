import { RootState } from "../../app/store";

export const selectProductsList = (state: RootState) => state.products.list;
