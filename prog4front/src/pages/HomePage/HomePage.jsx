import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function HomePage() {
    const navigate = useNavigate()

    const [domain, setDomain] = useState(undefined)

    async function getDomain() {
        const response = await fetch("http://localhost:9091/domains/1", {
            headers: {
                "x-api-key": localStorage.getItem("token")
            }
        })

        if (response.ok) {
            const data = await response.json()
            setDomain(data)
        }
        else if (response.status == 401) {
            localStorage.removeItem("token")
            navigate("/login")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login")
        else getDomain()
    }, []);

    return <Text>{domain ? domain.code : "Cargando..."} </Text>
}