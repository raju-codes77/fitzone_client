const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

const handleResponse = async (res) => {
  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const error = await res.json();
      throw new Error(error.message || "Request failed");
    }
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${res.statusText} - ${text.slice(0, 200)}`);
  }
  return res.json();
};

export const getForums=async(page)=>{
  if(!page){
    page=1;
  }

const res=await fetch(`${baseUrl}/forums?page=${page}`);
return handleResponse(res);

}
//forums manage
export const manageForums=async(forums)=>{

const res=await fetch(`${baseUrl}/manage/forums`);
return handleResponse(res);

}

//delete forums
export const deleteForum= async (id) => {
  const res = await fetch(`${baseUrl}/forums/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
};

// Get single forum by id
export const getForumById = async (id) => {
  const res = await fetch(`${baseUrl}/forums/${id}`);
  return handleResponse(res);
};