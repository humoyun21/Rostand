
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import { TextField , Button } from "@mui/material";


import useBrandStore from "@brands"
function index() {

  // Interface data {}------------------
  interface dataInterfas {
    name: string;
    id: number;
  }

  interface theader{
    title : string;
    value : string;
  }

  const {getBrand , addBrand , deleteBrand , editBrand} = useBrandStore()

  const [data, setData] = useState([]);

  const [editBrandId, setEditBrandId] = useState<number | null>(null);
  
 const theader :theader[] = [
  { title : "T/R", value :"id"},
  { title : "Name", value :"name"},
  { title : "Action", value :"action"}
 ]
  


  // get brands function -----------------------------------------------
  const getBrands = async()=>{
    try{
      const res = await getBrand();
      setData(res?.data);
    }catch(err){
      console.log(err)
    }
  }
  //====================================================================


  // Function useEffects ---------------------------
  useEffect(() => {
    getBrands();
  }, []);
  //================================================



  // add brands function ----------------------------------
  const addBrands = async (e: any) => {
    e.preventDefault();

    if (!e.target[0].value.trim().length) {
      toast.error("Brand name is required");
      e.target[0].value = "";
      return;
    }
    const brand = {
      name: e.target[0].value,
    };
    try {
      const res = await addBrand(brand);
       console.log(res);
      if (res?.status == 201) {
        toast.success("Brand Added Successfully");
        //  data.push(res?.data);
        //  setData([...data]);
        getBrands();
        e.target[0].value = "";
      }
    } catch (err: any) {
      //  console.log(err)
      if (err?.response?.status == 409) {
        toast.error("Brand Already Exists");
        e.target[0].value = "";
      }
    }
  };
  //=======================================================



  // delete brands function ----------------------------------
  const deleteBrands = async (id: number | string) => {
    try {
      const res = await deleteBrand(id);
      // console.log(res);
      if (res?.status == 200) {
        toast.success("Brand Deleted Successfully");
        let newData = data.filter((itim: dataInterfas) => itim?.id !== id);
        setData(newData);
      }
    } catch (err: any) {
      //  console.log(err)
      if (err?.response?.status == 404) {
        toast.error("Brand Not Found");
      }
    }
  };
  //=======================================================

  

  // Edit Brand Name ------------------------------------
  const editbrandName= async(e:any)=>{
    e.preventDefault();
    if (!e.target[0].value.trim().length) {
      toast.error("Brand name is required");
      e.target[0].value = "";
      return;
    }
    const brand = {
      name: e.target[0].value,
    };

    try {
      const res = await editBrand(editBrandId, brand);
      //  console.log(res);
      //  setEditBrandId(null);

      if (res?.status == 200) {
        toast.success("Brand Edited Successfully");
        setTimeout(() => {
          setEditBrandId(null)
          getBrands()
        }, 2000);
        
      }
    } catch (err: any) {
      //  console.log(err)
      //  setEditBrandId(null);  
      if (err?.response?.status == 404) {
        toast.error("Brand Not Found");
      }
    }
  }
  //============================================================


  
  return (
    <>
      <h1 className="text-[24px] mb-3 text-center">Brands page</h1>

      <form onSubmit={addBrands} className="flex items-center flex-col my-3">
        <h1 className="text-[24px] mb-3 text-center">Form add brands</h1>
        <TextField id="outlined-basic" label="Brand name" variant="outlined" className="w-[300px] mb-3" />
        <Button variant="contained" color="success" type="submit" className="px-5 py-2" sx={{bgcolor:"lime", color:"white"}}> add brand</Button>
        
      </form>

      {
        editBrandId ? <div className=" fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center  bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
        <form onSubmit={editbrandName} className="flex items-center flex-col my-3 border p-5 rounded-lg shadow-md shadow-slate-300 ">
          <h1 className="text-[24px] text-white mb-3 text-center">Form edit brands</h1>
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
            List of brands
          </h1>
          <Table striped bordered hover className=" max-w-[1200px] mx-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Brand name</th>
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
          There are currently no brands listed{" "}
        </h1>
      )}
    </>
  );
}

export default index;
