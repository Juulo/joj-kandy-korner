import React, {useState, useEffect} from "react";

export const Customers = () => {
    const [customers, updateCustomer] = useState([])

    useEffect(
        () => {
            return fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then(
                    (customerArray) => {
                        updateCustomer(customerArray)
                })
        },[]
    )

    return (
        <>
        <h2>Customers</h2>
        {
            customers.map((customer) => {
                return <p key={`customer--${customer.id}`}>{customer.name}</p>
            })
        }
        </>
    )
}