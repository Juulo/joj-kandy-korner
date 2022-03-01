import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export const EmployeeForm = () => {
    const [employee, update] = useState({
        name : "",
        locationId: 1,
        manager: false,
        fullTime: false,
        hourlyRate: 17.50
    })

    const [locations, changeLocation] = useState([])

    const history = useHistory()

    const saveEmployee = (event) => {
        event.preventDefault()
        const newEmployee = {
            name : employee.name,
            locationId : employee.locationId,
            manager : employee.manager,
            fullTime : employee.fullTime,
            hourlyRate : employee.hourlyRate
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(newEmployee)
        }

        return fetch("http://localhost:8088/employees?_expand=location", fetchOption)
            .then(
                () => {
                    history.push("/employees")
                }
            )
    }

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then((locationArray) => {
                    changeLocation(locationArray)
                })
        },[]
    )

    return (
        <>
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter your name..."
                        onChange={(event) => {
                            const copy = {...employee}
                            copy.name = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select onChange={(event) => {
                            const copy = {...employee}
                            copy.locationId = parseInt(event.target.value)
                            update(copy)
                        }}>
                            <option value="0">Select a location</option>
                            {
                                locations.map((location) => {
                                    return <option key={`location--${location.id}`} value={location.id}>{location.address}</option>
                                })
                            }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Manager:</label>
                    <input 
                        required autoFocus
                        type="radio"
                        className="form-control"
                        onChange={(event) => {
                            const copy = {...employee}
                            copy.manager = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTime">Full-Time:</label>
                    <input 
                        required autoFocus
                        type="radio"
                        className="form-control"
                        placeholder="Yes"
                        onChange={(event) => {
                            const copy = {...employee}
                            copy.fullTime = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly Rate:</label>
                    <input 
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter your pay"
                        onChange={(event) => {
                            const copy = {...employee}
                            copy.hourlyRate = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveEmployee}>Hire Employee</button>
        </form>
        </>
    )
}