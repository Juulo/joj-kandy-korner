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

    return (
        <>
            <h2>Your Orders</h2>
            {
                purchases.map((purchase) => {
                    return <div><h3 key={`purchases--${purchase.id}`}>Order # {purchase.id}</h3>
                        <p>1 {purchase.product.name}</p>
                    </div>
                })
            }
        </>
    )
}