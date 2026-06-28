const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getForums=async(forums)=>{

const res=await fetch(`${baseUrl}/forums`);
return res.json();

}

//delete forums
export const deleteForum= async (id) => {
  const res = await fetch(`${baseUrl}/forums/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log("Delete response:", data);
  return data;
};