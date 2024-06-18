const cart = []

const handleCart = (state=cart, action) =>{
    const product = action.payload
    switch(action.type){
        case "ADDITEM":
            // Check if product already in cart
            const exist = state.find((x) => x.id_produit === product.id_produit)
            if(exist){
                // Increase the quantity
                return state.map((x)=>x.id_produit ===product.id_produit?{...x, qty: x.qty+1}:x)
            }
            else{
                return [...state, {...product, qty:1}]
            }
            break;
        case "DELITEM":
            const exist2 = state.find((x) => x.id_produit === product.id_produit)
            if(exist2.qty === 1){
                return state.filter((x)=>x.id_produit!==exist2.id_produit)
            }
            else{
                return state.map((x)=> x.id_produit===product.id_produit?{...x, qty:x.qty-1}:x)
            }
            break;

        default:
            return state
            break;
    }
}

export default handleCart