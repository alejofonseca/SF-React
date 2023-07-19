import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const User = () => {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/" + id)
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setUser(data);
                console.log(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    })

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <div>Email: {user.email}</div>
                <div>Phone: {user.phone}</div>
                <div>Website: {user.website}</div>
                <div>Address: {user.address.street}, {user.address.city}</div>
            </div>
        );
    }
}

export default User;