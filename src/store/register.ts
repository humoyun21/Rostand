import {create} from "zustand";
import { toast } from "react-toastify";

import { http } from "../plugins/axios";

interface dataRegiste{
    username: string;
    password: string;
    phone: string;
}

const useRegisterStore = create(()=>({
    register: async(url : string , data:dataRegiste)=>{
        try{
            const response = await http.post(url, data);
            return response;
        }catch(error:any){
            toast.error(error.message)
        }
    }
}))

export default useRegisterStore;