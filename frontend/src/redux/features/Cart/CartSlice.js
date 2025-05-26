
import { createSlice } from '@reduxjs/toolkit';
import  Swal  from 'sweetalert2';
const initialState = {
    cartItems: []
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemId = action.payload.id || action.payload._id; // Ensure correct ID reference
            if (!itemId) {
                console.error("Item is missing an ID:", action.payload);
                return;
            }

            const existingItem = state.cartItems.find(item => (item.id || item._id) === itemId);

            if (!existingItem) {
                state.cartItems.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product added to the cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
            } else {
                Swal.fire({
                    title: "Already added to the cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ok"
                  
                  });
            }
        },
        removeFromCart:(state,action)=>{
            state.cartItems =state.cartItems.filter(item=>item._id !== action.payload._id)
        },
        clearCart:(state)=>{
            state.cartItems=[]
        }     
    }
});

// Export the actions
export const { addToCart ,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
