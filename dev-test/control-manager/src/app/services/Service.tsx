import axios from "axios";
import { useEffect, useState } from "react";

export const baseUrl = axios.create({
    baseURL:"http://localhost:3001/"
}) 

export const Service = () => {
    const [users, setUsers] = useState([]);

    const findAll = async () => {
       const response = await baseUrl.get('users');
       console.log(response);
    }

    useEffect(() => {
        findAll();
    }, []);
}
