import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { domainService } from "../../services/domainService";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";

export function HomePage() {
	const [domain, setDomain] = useState(undefined);

	async function getDomain() {
		const response = await domainService.getDomainById(1);
		if (response.status == 200) setDomain(response.data);
	}

	useEffect(() => {
		getDomain();
	}, []);

	return <>
		<HeaderMenu />

		
		
		
		 </>;
}
