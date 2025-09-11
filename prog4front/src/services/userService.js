import { api } from "./api";


export const userService = {

getCurrentUser: () => api.get('/user')


}