import { PayloadAction } from '@reduxjs/toolkit';
import { Product } from './../../models/models';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  listProduct: any[];
}

const initialState: IInitialState = {
  listProduct: [
    
  ],
};

const productCompareSlice = createSlice({
  name: 'compareProduct',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.listProduct.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.listProduct = state.listProduct.filter(
        (item) => item.id !== action.payload.id
      );
    },
    removeAll: (state) => {
      state.listProduct = [];
    },
  },
});

export default productCompareSlice.reducer;
export const { addProduct, removeAll, removeProduct } =
  productCompareSlice.actions;
