import { http } from "./axios";
import { toast } from "react-toastify";

interface dataLogin{
    username: string;
    password: string;
}


interface dataRegiste extends dataLogin{
    phone: string;
}

const register = async(url:string , data:dataRegiste)=>{
    try{
        const response = await http.post(url, data);
        return response;
    }catch(error:any){
    //    alert ("Error : " + error.message)
       toast.error(error.message)
    }
}

const login = async(url:string , data:dataLogin)=>{
    try{
        const response = await http.post(url, data);
        return response;
    }catch(error:any){
        // alert ("Error : " + error.message)
        toast.error(error.message)
    }
}

export {login , register}