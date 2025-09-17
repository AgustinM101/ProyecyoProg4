import { api } from "./api";


export const userService = {

getUsers: () => api.get('/users')


}