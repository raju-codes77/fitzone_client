"use client";

import ViewForumDetails from "@/components/ViewForumDetails";
import { getForumById } from "@/lib/api/forums";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewDetailsPage = () => {
  const [forum, setForum] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchForum = async () => {
      const data = await getForumById(id);
      setForum(data);
      setLoading(false);
    };

    fetchForum();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!forum || forum.success === false) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Forum post not found.
      </div>
    );
  }

  return (
    <div>
      <ViewForumDetails forum={forum} />
    </div>
  );
};

export default ViewDetailsPage;