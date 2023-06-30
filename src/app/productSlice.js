import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    IDLE:'idle',
    ERROR : 'error',
    LOADING: 'loading',
});
export const productSlice = createSlice({
    name:"product",
    initialState:{
        data:[],
        status: STATUSES.IDLE,

},

    //slices
    reducers:{
        //actions or payloads
          setProducts(state,action){
            state.data = action.payload;
          },
          setStatus(state,action){
            state.status = action.payload;
          },
         
    },
});

export const {setProducts,setStatus}=productSlice.actions;
export default productSlice.reducer;

//THUNKS
export function fetchProduct(){
    return async function fetchProductThunk(dispatch,getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const res = await fetch("https://fakestoreapi.com/products");
            //convert it to json
            const data = await res.json();
            dispatch(setProducts(data));
            //after getting the data set it back to idle
            dispatch(setStatus(STATUSES.IDLE));
        }catch(err){
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}