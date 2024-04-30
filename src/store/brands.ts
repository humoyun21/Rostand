import {create} from "zustand"
import { toast } from "react-toastify";


import { http } from "../plugins/axios";



const useBrandStore = create(()=>({
    getBrand: async()=>{
        try{
            const response = await http.get("/brands");
            return response;
            
        }catch(error:any){
            toast.error(error.message)
        }
    },
    addBrand: async(brand:any)=>{
        try{
            const response = await http.post("/brands" , brand);
            return response;
            
        }catch(error:any){
            toast.error(error.message)
        }
    },

    deleteBrand: async(id:string|number)=>{
        try{
            const response = await http.delete(`/brands/${id}`);
            return response;
        }catch(error:any){
            // console.log(error);

            toast.error(error.message)
        }
    },
    editBrand: async(id:string|number|null , data:any)=>{
        try{
            const response = await http.patch(`/brands/${id}`, data);
            return response;
        }catch(error:any){
            toast.error(error.message)
        }
    
    }
}))

export default useBrandStore;