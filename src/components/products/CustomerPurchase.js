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
        // iterate over customer purchase
        for (const purchase of purchases) {
            // check if object has current product.id as its key
            if (aggragateMap.has(purchase.productId && purchase.product.price)) {
                // increment the value property by 1
                aggragateMap.set(purchase.productId, (aggragateMap.get(purchase.productId)) + 1)
                // aggragateMap.set(purchase.product.price, (aggragateMap.get(purchase.product.price)) + purchase.product.price)
            }
            // if not add a new key/value pair
            else{
                // key will be an object with the products id property
                // the value will be a quantity
                aggragateMap.set(purchase.productId, 1)
                // aggragateMap.set(purchase.product.price, purchase.product.price)
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
                    if (!productShown.includes(purchase.productId)) {
                        productShown.push(purchase.productId)
                        for (const [productId, purchaseQuantity] of aggragateMap) {
                            if(productId === purchase.productId) {
                                return <div>
                                    <p key={`purchases--${purchase.id}`}>{purchase.product.name} Quantity {purchaseQuantity} {purchase.product.price}</p>
                                        </div>
                            }
                        }
                    }
                })
            }
        </>
    )
}