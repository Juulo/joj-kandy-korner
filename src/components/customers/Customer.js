import React, {useState, useEffect} from "react";
import { getAllCustomers, getAllPurchases } from "../ApiManager";

export const Customers = () => {
    const [customers, updateCustomer] = useState([])
    const [purchases, updatePurchases] = useState([])

    useEffect(
        () => {
            getAllCustomers()
            .then(updateCustomer)
            .then(getAllPurchases)
            .then(
                    (data) => {
                        updatePurchases(data)
                    }
                )
                    
        },[]
    )

    useEffect(
        () => {
            const getNumberOfPurchases = customers.map((customer) => {
                customer.numberOfPurchases = purchases.filter(purchase => customer.id === purchase.customerId).length
                return customer
            })

            getNumberOfPurchases.sort((a, b) => {
                return b.numberOfPurchases - a.numberOfPurchases 
            })

            updateCustomer(getNumberOfPurchases)

        },[purchases]
    )

    

    return (
        <>
        <h2>Customers</h2>
        {
            customers.map((customer) => {
                return <p key={`customer--${customer.id}`}>{customer.name} {
                    //after mapping through the customers array we need to also map through purchases array
                    purchases.filter((purchase) => customer.id === purchase.customerId).length
                        // then we find whether or not our customer.id matches the customerId in purchases
                            //if it does then we can return the length of that array of purchases
                    }
                </p>
            })
        }
        </>
    )
}