import React, {useState, useEffect} from "react"

export const Locations = () => {
    const [locations, setLocation] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then((locationArray) => {
                    setLocation(locationArray)
                })
        },[]
    )

    return (
        <>
            {locations.map((location) => {
                return <p key={`location--${location.id}`}>{location.address}</p>
            })}
        </>
    )
}