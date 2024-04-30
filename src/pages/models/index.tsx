
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { TextField , Button } from "@mui/material";

import useModelStore from "@models"
function index() {

  const { getModel , addModel , deleteModel , editModel} = useModelStore();
  const [data, setData] = useState([]);

  const [editBrandId, setEditBrandId] = useState<number | null>(null);
  

  // Interface data {}------------------
  interface dataInterfas {
    name: string;
    id: number;
  }


  // get brands function -----------------------------------------------
  const getModels = async() => {
       try{
         const res = await getModel()
         setData(res?.data);
       }catch(err){
        console.log(err);
        
       }
  };
  //====================================================================


  // Function useEffects ---------------------------
  useEffect(() => {
    getModels();
  }, []);
  //================================================



  // add brands function ----------------------------------
  const addBrands = async (e: any) => {
    e.preventDefault();

    if (!e.target[0].value.trim().length) {
      toast.error("Model name is required");
      e.target[0].value = "";
      return;
    }
    const brand = {
      name: e.target[0].value,
    };
    try {
      const res = await addModel(brand);
      //  console.log(res);
      if (res?.status == 201) {
        toast.success("Model Added Successfully");
        //  data.push(res?.data);
        //  setData([...data]);
        getModels();
        e.target[0].value = "";
      }
    } catch (err: any) {
      //  console.log(err)
      if (err?.response?.status == 409) {
        toast.error("Model Already Exists");
        e.target[0].value = "";
      }
    }
  };
  //=======================================================



  // delete brands function ----------------------------------
  const deleteBrands = async (id: number | string) => {
    try {
      const res = await deleteModel(id);
      //  console.log(res);
      if (res?.status == 200) {
        toast.success("Model Deleted Successfully");
        let newData = data.filter((itim: dataInterfas) => itim?.id !== id);
        setData(newData);
      }
    } catch (err: any) {
      //  console.log(err)
      if (err?.response?.status == 404) {
        toast.error("Model Not Found");
      }
    }
  };
  //=======================================================

  

  // Edit Brand Name ------------------------------------
  const editbrandName= async(e:any)=>{
    e.preventDefault();
    if (!e.target[0].value.trim().length) {
      toast.error("Model name is required");
      e.target[0].value = "";
      return;
    }
    const brand = {
      name: e.target[0].value,
    };

    try {
      const res = await editModel(editBrandId, brand);
      //  console.log(res);
      //  setEditBrandId(null);

      if (res?.status == 200) {
        toast.success("Model Edited Successfully");
        setTimeout(() => {
          getModels();
          setEditBrandId(null);
        },2000);
      }
    } catch (err: any) {
      //  console.log(err)
      //  setEditBrandId(null);  
      if (err?.response?.status == 404) {
        toast.error("Model Not Found");
      }
    }
  }
  //============================================================

  return (
    <>
      <h1 className="text-[24px] mb-3 text-center">Models page</h1>

      <form onSubmit={addBrands} className="flex items-center flex-col my-3">
        <h1 className="text-[24px] mb-3 text-center">Form add models</h1>
        <TextField id="outlined-basic" label="Model name" variant="outlined" className="w-[300px] mb-3" />
        <Button variant="contained" color="success" type="submit" className="px-5 py-2" sx={{bgcolor:"lime", color:"white"}}> add model</Button>
        
      </form>

      {
        editBrandId ? <div className=" fixed top-0 left-0 w-full h-full z-99  flex items-center justify-center  bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
        <form onSubmit={editbrandName} className="flex items-center flex-col my-3 border p-5 rounded-lg shadow-md shadow-slate-300 ">
          <h1 className="text-[24px] text-white mb-3 text-center">Form edit models</h1>
          <input
            type="text"
            placeholder=" Edit brand name"
            className="border bg-transparent text-white outline-none rounded-md py-2 px-3 mb-3 w-[300px]"
          />
          <button className="py-2 px-3 bg-orange-500 hover:bg-orange-700 duration-200 active:bg-orange-500 border text-white rounded-md">
            <i className="bi bi-pencil-square mr-2"></i>Edit
          </button>
        </form>
      </div>:""
      }
      {data.length ? (
        <>
          <h1 className="text-[24px] text-lime-500 text-center mb-3 font-semibold mt-4 pt-2 border-t-2">
            List of models
          </h1>
          <Table striped bordered hover className=" max-w-[1200px] mx-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Model name</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el: dataInterfas, index) => {
                return (
                  <tr key={index} className="">
                    <td>{index}</td>
                    <td>
                      <p className="text-[18px] font-semibold">{el?.name}</p>
                    </td>
                    <td className="flex items-center justify-center">
                      <button
                        onClick={() => setEditBrandId(el?.id)}
                        className=" text-white text-center bg-orange-500 hover:bg-orange-700 duration-200 active:bg-orange-500 px-3 py-2 rounded-lg"
                      >
                        <i className="bi bi-pencil-square mr-2"></i>Edit
                      </button>
                    </td>
                    <td className="">
                      <button
                        onClick={() => deleteBrands(el?.id)}
                        className=" text-white text-center bg-red-500 hover:bg-red-700 duration-200 active:bg-red-500  px-3 py-2 rounded-lg"
                      >
                        <i className="bi bi-person-fill-dash mr-2"></i>Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <ToastContainer />
        </>
      ) : (
        <h1 className="text-[26px] text-center  font-semibold mt-4 text-red-500 ">
          There are currently no models listed{" "}
        </h1>
      )}
    </>
  );
}

export default index;
