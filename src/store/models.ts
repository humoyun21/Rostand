import {create} from "zustand"
import { toast } from "react-toastify";


import { http } from "../plugins/axios";



const useModelStore = create(()=>({
    getModel: async()=>{
        try{
            const response = await http.get("/models");
            return response;
            
        }catch(error:any){
            toast.error(error.message)
        }
    },
    addModel: async(model:any)=>{
        try{
            const response = await http.post("/models" , model);
            return response;
            
        }catch(error:any){
            toast.error(error.message)
        }
    },
    deleteModel: async(id:string|number)=>{
        try{
            const response = await http.delete(`/models/${id}`);
            return response;
        }catch(error:any){
            // console.log(error);

            toast.error(error.message)
        }
    },
    editModel: async(id:string|number|null , data:any)=>{
        try{
            const response = await http.patch(`/models/${id}`, data);
            return response;
        }catch(error:any){
            toast.error(error.message)
        }
    
    }
}))

export default useModelStore;