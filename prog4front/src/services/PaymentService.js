import { api } from "./api";


export const PaymentService = {

  createPayment: (data) => api.post("/payment", data)


}
