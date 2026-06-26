const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getUsers=async(Users)=>{

const res=await fetch(`${baseUrl}/users`);
return res.json();

}

export const allUsers=getUsers.filter(user=>user.role==="user");