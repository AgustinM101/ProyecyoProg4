import { Center, Text, Pagination } from "@mantine/core";
import { UserTable } from "../UserTable/UserTable";

export function ClientesTable({ 
  users, 
  filteredUsers, 
  page, 
  setPage, 
  itemsPerPage, 
  onEdit, 
  onDelete 
}) {
  if (filteredUsers.length === 0) {
    return (
      <Center>
        <Text>No hay resultados</Text>
      </Center>
    );
  }

  return (
    <>
      <UserTable
        users={users}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Center mt="md">
        <Pagination
          page={page}
          onChange={setPage}
          total={Math.ceil(filteredUsers.length / itemsPerPage)}
        />
      </Center>
    </>
  );
}
