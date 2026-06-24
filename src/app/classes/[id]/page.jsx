"use client"
import ViewDetails from '@/components/ViewDetails';
import { getClasses } from '@/lib/api/classes';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ViewDetailsPage = () => {
       const [viewClass,setViewClass]=useState();
       const params=useParams();
       useEffect(() => {
                     const loadClasses = async () => {
                            const data = await getClasses();
                            // Only keep classes with an "Approved" status
                            const classData= data.find(cls => cls._id === params.id);
                            setViewClass(classData);
                     };
                     loadClasses();
              }, [params.id]);
       return (
              <div>
                   <ViewDetails viewClass={viewClass}/>  
              </div>
       );
};

export default ViewDetailsPage;