const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const applyTrainer=async(data)=>{

const res=await fetch(`${baseUrl}/trainer-applications`,{
method:'POST',
headers:{
'Content-Type':'application/json',
},
body:JSON.stringify(data)
});
return await res.json();    
}

// get trainer applications
export const getTrainerApplications=async(data)=>{
const res=await fetch(`${baseUrl}/trainer-applications`);
return await res.json();
}      