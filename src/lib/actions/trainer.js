const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const applyTrainer = async (data) => {

       const res = await fetch(`${baseUrl}/trainer-applications`, {
              method: 'POST',
              headers: {
                     'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
       });
       return await res.json();
}

// get trainer applications
export const getTrainerApplications = async (data) => {
       const res = await fetch(`${baseUrl}/trainer-applications`);
       return await res.json();
}

//approve trainer application

export const approveTrainer = async (id) => {

       const res = await fetch(
              `${baseUrl}/trainer-applications/approve/${id}`,
              {
                     method: "PATCH",
              }
       );

       return res.json();

};


// reject trainer

export const rejectTrainer = async (id) => {

       const res = await fetch(
              `${baseUrl}/trainer-applications/reject/${id}`,
              {
                     method: "PATCH",
              }
       );

       return res.json();

};