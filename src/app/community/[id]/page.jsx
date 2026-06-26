"use client";

import ViewForumDetails from "@/components/ViewForumDetails";
import { createForums } from "@/lib/actions/forums";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewDetailsPage = () => {
  const [viewForum, setViewForum] = useState(null);

  const params = useParams();

  
  return (
    <div>
      
    </div>
  );
};

export default ViewDetailsPage;