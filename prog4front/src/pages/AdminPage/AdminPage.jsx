import { useEffect, useState, useMemo } from "react";
import {
  Table,
  Container,
  Loader,
  Center,
  Text,
  Pagination,
  TextInput,
  Group,
} from "@mantine/core";
import { userService } from "../../services/userService";
import { UserTable } from "../../components/UserTable/UserTable";


export function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error al traer usuarios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

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
        <Text size="xl" weight={700}>
          Admin - Usuarios
        </Text>
        <TextInput
          placeholder="Buscar por nombre o email"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Group>

      {filteredUsers.length === 0 ? (
        <Center>
          <Text>No hay usuarios que coincidan</Text>
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

