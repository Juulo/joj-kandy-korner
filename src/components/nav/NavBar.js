import { Link } from "react-router-dom"

export const NavBar = () => {
    return(
        // Link basically tells the browser "hey set the url to this link please" which then gets routed to a component
        <ul className="navbar">
            <div className="navbar_item active">
                <Link className="navbar_link" to="/locations">Locations</Link>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/products">Products</Link>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/employees">Employees</Link>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/customers">Customers</Link>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/purchase/customer">My Orders</Link>
            </div>
            <div className="navbar_item active">
                <Link className="navbar_link" to="/login">Logout</Link>
            </div>
        </ul>
    )
}