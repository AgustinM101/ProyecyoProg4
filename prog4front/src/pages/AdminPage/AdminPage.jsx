import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Loader,
  Center,
  Text,
  Pagination,
  TextInput,
  Group,
} from "@mantine/core";
import { plansUserService } from "../../services/plansUserService";
import { UserTable } from "../../components/UserTable/UserTable";

export function AdminPage() {
  const [plansUsers, setPlansUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchPlansUsers() {
      try {
        const response = await plansUserService.getPlansUsers();
        setPlansUsers(response.data);
      } catch (error) {
        console.error("Error al traer usuarios con planes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlansUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return plansUsers.filter(
      (pu) =>
        pu.user.name.toLowerCase().includes(search.toLowerCase()) ||
        pu.user.email.toLowerCase().includes(search.toLowerCase()) ||
        pu.plan.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [plansUsers, search]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, page]);

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="lg" py="md">
      <Group position="apart" mb="md">
        <Text size="xl" fw={700}>
          Admin - Usuarios con Planes
        </Text>
        <TextInput
          placeholder="Buscar por usuario o plan"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Group>

      {filteredUsers.length === 0 ? (
        <Center>
          <Text>No hay resultados</Text>
        </Center>
      ) : (
        <>
          <UserTable users={paginatedUsers} />
          <Center mt="md">
            <Pagination
              page={page}
              onChange={setPage}
              total={Math.ceil(filteredUsers.length / itemsPerPage)}
            />
          </Center>
        </>
      )}
    </Container>
  );
}
