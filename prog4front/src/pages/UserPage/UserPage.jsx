import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { domainService } from "../../services/domainService";
import { useParams } from "react-router";

export function HomePage() {
    const [domain, setDomain] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        getDomain();

        async function getDomain() {
        const response = await domainService.getDomainById(id);
        if (response.status == 200) setDomain(response.data);
        
    }
    }, [id]);

    

    return <Text>{domain ? {




        
    } : "Cargando..."} </Text>;
}
