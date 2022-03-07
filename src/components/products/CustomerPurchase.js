import React, {useState, useEffect} from "react"

export const CustomerPurchase = () => {
    const [purchases, updatePurchase] = useState([])
    const [aggragateMap, setMap] = useState([])

    // create a variable to store our customer so we can display their purchases
    const kustomer = localStorage.getItem("kandy_customer")

    // useEffect to update the customer purchases on page load
    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?customerId=${parseInt(kustomer)}&_expand=product`)
                .then(res => res.json())
                .then(
                    (data) => {
                        updatePurchase(data)
                    }
                )
        },[]
    )
    
    // useEffect that runs our aggragate Map whenever ever purchases changes for our customer
    useEffect(
        () => {
            createLineItem()
        },[purchases]
    )

    // create a function that iterates over customer purchase
    const createLineItem = () => {
        // create a blank Map
        const aggragateMap = new Map()
        // iterate over customer purchases
        for (const purchase of purchases) {
            // check if object has current product.id as a key
            if (aggragateMap.has(purchase.productId)) {
                // if we do, create an object as a copy of our map and set its value equal to the key we get from our map
                let copyOfAggragate = aggragateMap.get(purchase.productId)
                // set the values of that copy to the values that we want
                //quantity increases by 1
                copyOfAggragate.quantity = copyOfAggragate.quantity + 1

                // totalPrice increases by by the amount of the product price
                copyOfAggragate.totalPrice = copyOfAggragate.totalPrice + purchase.product.price
                
                // set our map's key value to equal our new copy
                aggragateMap.set(purchase.productId, copyOfAggragate)
                
            }
            // if not add a new key/value pair
            else{
                // our key will have a value that is an object with a quantity and a total price
                aggragateMap.set(purchase.productId, {quantity: 1, totalPrice: purchase.product.price})
                
            }
        }

        setMap(aggragateMap)
    }
    
    let productShown = []

    return (
        <>
            <h2>Your Orders</h2>
            {
                purchases.map((purchase) => {
                    if (!productShown.includes(purchase.productId)) { //if our product isn't in our product shown array
                        productShown.push(purchase.productId)   //push it into product shown array
                        for (const [productId, productObject] of aggragateMap) {    // then for every product of aggragateMap
                            if(productId === purchase.productId) {  //if the productId key matches purchase.productId return html
                                return <div> 
                                    <p key={`purchases--${purchase.id}`}>{purchase.product.name} Quantity {productObject.quantity} {productObject.totalPrice}</p>
                                        </div>
                            }
                        }
                    }
                })
            }
        </>
    )
}