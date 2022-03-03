import React, {useEffect, useState} from "react"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getAllProducts } from "../ApiManager"

export const Products = () => {
    const [products, setProduct] = useState([])
    const [purchase, makePurchase] = useState({
        customerId: 1,
        employeeId: 1,
        productId: 1
    })

    const history = useHistory()
    

    useEffect(
        () => {
            getAllProducts()
                .then((productArray) => {
                    setProduct(productArray)
                })
        },[]
    )
    
    const createPurchase = (event) => {
        event.preventDefault()
        const newPurchase = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            employeeId: purchase.employeeId,
            productId: parseInt(event.target.id.split("--")[1])
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }

        return(
            fetch("http://localhost:8088/purchases", fetchOption)
                .then(
                    () => {
                        history.push("/products")
                    }
                )
        )
    }

    return (
        <>
        {products.map((product) => {
            // "key" is hidden by React so can't be used as an event target
            return <p key={`product--${product.id}`}>{product.name}, "{product.productType.type}", {product.price}  
            <button onClick={createPurchase} id={`product--${product.id}`} className="purchaseButton">Purchase</button>
            </p>
        })}
        </>
    )
}