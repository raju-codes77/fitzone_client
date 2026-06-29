const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getForums=async(page)=>{
  if(!page){
    page=1;
  }

const res=await fetch(`${baseUrl}/forums?page=${page}`);
return res.json();

}
//forums manage
export const manageForums=async(forums)=>{

const res=await fetch(`${baseUrl}/manage/forums`);
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

// Get single forum by id
export const getForumById = async (id) => {
  const res = await fetch(`${baseUrl}/forums/${id}`);
  return res.json();
};