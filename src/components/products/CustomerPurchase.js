import React, {useState, useEffect} from "react"

export const CustomerPurchase = () => {
    const [purchases, updatePurchase] = useState([])

    const kustomer = localStorage.getItem("kandy_customer")

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
    
    // create a function that iterates over customer purchase
    const createLineItem = () => {
        // create a blank Map
        const aggragateMap = new Map()
        // iterate over customer purchase
        for (const map of aggragateMap) {
            // check if object has current product.id as its key
            if (map) {
                // increment the value property by 1
                map.set("value", (map.get("value")) + 1)
            }
            // if not add a new key/value pair
            else{
                // key will be an object with the products id and price properties
                map.set("key", "id", "price")
                // the value will be a quantity
                map.set("value", 1)
            }
        }

    }

    return (
        <>
            <h2>Your Orders</h2>
            {
                purchases.map((purchase) => {
                    return <div>
                        <h3 key={`purchases--${purchase.id}`}>Order # {purchase.id}</h3>
                        <p>Quanity {}</p>
                        <p>1 {purchase.product.name}</p>
                    </div>
                })
            }
        </>
    )
}