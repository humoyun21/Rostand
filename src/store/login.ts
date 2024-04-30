import {create} from "zustand";
import { toast } from "react-toastify";

import { http } from "../plugins/axios";

interface dataLogin{
    username: string;
    password: string;
}

const useLoginStore = create(() => ({
    login : async(url:string, data:dataLogin) => {
        try{
            const response = await http.post(url, data);
            return response;
        }catch(error:any){
        //    alert ("Error : " + error.message)
           toast.error(error.message)
        }
    }
}));

export default useLoginStore;