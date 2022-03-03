import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllEmployees } from "../ApiManager";

export const Employees = () => {
    const [employees, updateEmployee] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllEmployees()
                .then(
                    (employeeArray) => {
                        updateEmployee(employeeArray)
                    }
                )
        },[]
    )

    const fireEmployee = (id) => {
        fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
            .then(
                () => {
                    fetch("http://localhost:8088/employees?_expand=location")
                        .then(res => res.json())
                        .then(
                            (employeeArray) => {
                                updateEmployee(employeeArray)
                            }
                        )
                }
            )
            
    }

    return(
        <>  
            <div>
                <button onClick={() => history.push("/employee/create")}>Hire Employee</button>
            </div>
            {employees.map((employee) => {
                return <p key={`employee--${employee.id}`}>{employee.name} works at {employee.location.address}
                <button onClick={() => {fireEmployee(employee.id)}}>Fire Employee</button></p>
            })}
        </>
    )
}