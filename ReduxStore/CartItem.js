export const ADD_USER = 'ADD_USER'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADD_TO_ORDER = 'ADD_TO_ORDER'
export const CANCEL_FROM_ORDER = 'CANCEL_FROM_ORDER'
export const ADD_CONSULTATION = 'ADD_CONSULTATION'
export const ADD_FAVOURITE = 'ADD_FAVOURITE'
export const UN_FAVOURITE = 'UN_FAVOURITE'
const initialState = {
  users:'',
  cart: [],
  total: 0,
  order:[],
  astro:[],
  fav:[]
}
export const getBasketTotal = (cart) => 
    cart?.reduce((amount, item) => item.price*item.quantity + amount, 0);

const removeProductFromCart = (productId, state) => {
      console.log("Removing product with id: " + productId);
      const updatedCart = [...state.cart];
      const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);
    
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity--;
      if (updatedItem.quantity <= 0) {
        updatedCart.splice(updatedItemIndex, 1);
      } else {
        updatedCart[updatedItemIndex] = updatedItem;
      }
      return { ...state, cart: updatedCart };
    };

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: action.payload,...state.users
         }
    case ADD_TO_CART:
      const updatedCart = [...state.cart];
        const item = updatedCart.findIndex(x=>x.id===action.payload.id);
        if(item<0)
        {
          updatedCart.push({...action.payload,quantity: 1} );
        }
        else{
          
          const updatedItem = {
            ...updatedCart[item]
            
          };
          updatedItem.quantity++;
          updatedCart[item] = updatedItem;
        }
         return {
             ...state,
             cart: updatedCart,
         }    
        
        
    case REMOVE_FROM_CART:
      return removeProductFromCart(action.payload.id, state);     
      
    case ADD_TO_ORDER:
      return {
        ...state,
        order: [action.payload, ...state.order],
    }
    case CANCEL_FROM_ORDER:
      return {
        ...state,
        order: state.order.filter(orderItem => orderItem.id !== action.payload.id),
    }
    case ADD_FAVOURITE:
      return {
        ...state,
        fav: [action.payload, ...state.fav],
    }
    case UN_FAVOURITE:
      return {
        ...state,
        fav: state.fav.filter(favItem => favItem.id !== action.payload.id),
    }
    case ADD_CONSULTATION:
      return {
        ...state,
        astro: [action.payload, ...state.astro],
    }
  }
  return state
}

export default cartItemsReducer