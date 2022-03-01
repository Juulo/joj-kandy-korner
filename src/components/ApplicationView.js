import { Route } from "react-router-dom"
import { Products } from "./products/Products"
import { Locations } from "./locations/Locations"
import { Employees } from "./employees/Employees"
import { EmployeeForm } from "./employees/EmployeeForm"
import { Customers } from "./customers/Customer"
import { CustomerPurchase } from "./products/CustomerPurchase"

export const ApplicationView = () => {
    return (
        <>
        <Route exact path="/products">
            <h2>Products</h2>
            <Products/>
        </Route>
        <Route exact path="/locations">
            <h2>Locations</h2>
            <Locations/>
        </Route>
        <Route exact path="/employees">
            <h2>Employees</h2>
            <Employees/>
        </Route>
        <Route exact path="/employee/create">
            <EmployeeForm/>
        </Route>
        <Route exact path="/customers">
            <Customers/>
        </Route>
        <Route exact path="/purchase/customer">
            <CustomerPurchase/>
        </Route>
        </>
    )
}