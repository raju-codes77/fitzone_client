'use server'


const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;
export const  createForums=async(newForum)=>{
       const res=await fetch(`${baseUrl}/forums`,{

              method:'POST',
              headers:{
                     'Content-Type':'application/json',
              },
              body:JSON.stringify(newForum)

       })
       return await res.json();
}