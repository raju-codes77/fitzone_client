const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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

export const getClasses = async () => {
  const res = await fetch(`${baseUrl}/classes`);
  return handleResponse(res);
};
//pagination
export const paginationClasses=async(page)=>{
  if(!page){
    page=1;
  }

const res=await fetch(`${baseUrl}/pagination/classes?page=${page}`);
return handleResponse(res);

}
// Approve class
export const approveClass = async (id) => {
  const res = await fetch(`${baseUrl}/classes/approve/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Approved" }),
  });
  return handleResponse(res);
};

// Reject class
export const rejectClass = async (id) => {
  const res = await fetch(`${baseUrl}/classes/reject/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Rejected" }),
  });
  return handleResponse(res);
};

// Delete class
export const deleteClass = async (id) => {
  const res = await fetch(`${baseUrl}/classes/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
};