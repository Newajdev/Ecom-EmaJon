import { getShoppingCart } from "../fakedb";

const cartProductsLoader = async () => {
    const storedCart = getShoppingCart();

    const storedcardIds = Object.keys(storedCart)
    console.log(storedcardIds);

    const loadedProducts = await fetch('https://ecom-emo-server.vercel.app/productsByIds',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(storedcardIds)
    });
    const products = await loadedProducts.json();

    // if cart data is in database, you have to use async await
    

    const savedCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    // if you need to send two things
    // return [products, savedCart]
    // another options
    // return { products, cart: savedCart }

    return savedCart;
}

export default cartProductsLoader;