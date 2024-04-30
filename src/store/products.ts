import {create} from "zustand"
import { toast } from "react-toastify";


import { http } from "../plugins/axios";

const useProductStore = create(()=>({
    getProducts: async()=>{
        try{
            const response = await http.get("/products");
            return response;
            
        }catch(error:any){
            toast.error(error.message)
        }
    },
    addProducts: async( data:any)=>{
        try{
            const response = await http.post("/products", data);
            return response;
        }catch(error:any){
            toast.error(error.message)
        }
    },
    editProducts: async(id:string|number|null, data:any)=>{
        try{
            const response = await http.patch(`/products/${id}`, data);
            return response;
        }catch(error:any){
            toast.error(error.message)
        }
    },
    deleteProducts: async(id:string|number)=>{
        try{
            const response = await http.delete(`/products/${id}`);
            return response;
        }catch(error:any){
            toast.error(error.message)
        }
    }
}));

export default useProductStore;