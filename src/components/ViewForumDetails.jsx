"use client";

import { useSession } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaThumbsUp, FaThumbsDown, FaReply, FaEdit, FaTrash } from "react-icons/fa";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ViewForumDetails({ forum }) {
  const { data: session } = useSession();
  const user = session?.user;
  const isBlocked = user?.blocked === true;

  const [likes, setLikes] = useState(forum?.likes || []);
  const [dislikes, setDislikes] = useState(forum?.dislikes || []);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${baseUrl}/forums/${forum._id}/comments`);
        const data = await res.json();
        setComments(data || []);
      } catch {
        setComments([]);
      } finally {
        setLoadingComments(false);
      }
    };
    if (forum?._id) fetchComments();
  }, [forum._id]);

  const hasLiked = user && likes.includes(user.id);
  const hasDisliked = user && dislikes.includes(user.id);

  // Like
  const handleLike = async () => {
    if (!user) return toast.error("Please login to like");
    if (isBlocked) return toast.error("You are blocked from interactions");

    const res = await fetch(`${baseUrl}/forums/${forum._id}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    const data = await res.json();
    if (data.likes) setLikes(data.likes);
    if (data.dislikes) setDislikes(data.dislikes);
  };

  // Dislike
  const handleDislike = async () => {
    if (!user) return toast.error("Please login to dislike");
    if (isBlocked) return toast.error("You are blocked from interactions");

    const res = await fetch(`${baseUrl}/forums/${forum._id}/dislike`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    const data = await res.json();
    if (data.likes) setLikes(data.likes);
    if (data.dislikes) setDislikes(data.dislikes);
  };

  // Post comment
  const handlePostComment = async () => {
    if (!user) return toast.error("Please login to comment");
    if (isBlocked) return toast.error("You are blocked from commenting");
    if (!commentText.trim()) return toast.error("Comment cannot be empty");

    const res = await fetch(`${baseUrl}/forums/${forum._id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        userName: user.name,
        userImage: user.image || null,
        text: commentText.trim(),
        replies: [],
        createdAt: new Date().toISOString(),
      }),
    });
    const data = await res.json();
    if (data.success) {
      setComments((prev) => [
        ...prev,
        {
          _id: data.insertedId,
          userId: user.id,
          userName: user.name,
          userImage: user.image || null,
          text: commentText.trim(),
          replies: [],
          createdAt: new Date().toISOString(),
        },
      ]);
      setCommentText("");
      toast.success("Comment posted");
    }
  };

  // Edit comment
  const handleEditComment = async (commentId) => {
    if (!editText.trim()) return toast.error("Comment cannot be empty");

    const res = await fetch(
      `${baseUrl}/forums/${forum._id}/comments/${commentId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText.trim() }),
      }
    );
    const data = await res.json();
    if (data.success) {
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, text: editText.trim() } : c
        )
      );
      setEditingComment(null);
      setEditText("");
      toast.success("Comment updated");
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    const res = await fetch(
      `${baseUrl}/forums/${forum._id}/comments/${commentId}`,
      { method: "DELETE" }
    );
    const data = await res.json();
    if (data.success) {
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    }
  };

  // Post reply
  const handlePostReply = async (commentId) => {
    if (!user) return toast.error("Please login to reply");
    if (isBlocked) return toast.error("You are blocked from commenting");
    const text = replyText[commentId]?.trim();
    if (!text) return toast.error("Reply cannot be empty");

    const reply = {
      userId: user.id,
      userName: user.name,
      userImage: user.image || null,
      text,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch(
      `${baseUrl}/forums/${forum._id}/comments/${commentId}/reply`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reply),
      }
    );
    const data = await res.json();
    if (data.success) {
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, replies: [...(c.replies || []), reply] }
            : c
        )
      );
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      setReplyingTo(null);
      toast.success("Reply posted");
    }
  };

  const Avatar = ({ name, image, size = "8" }) => (
    <div
      className={`w-${size} h-${size} rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm overflow-hidden flex-shrink-0`}
    >
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        name?.charAt(0)?.toUpperCase()
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-white">

      {/* Image */}
      {forum.imageUrl && (
        <div className="w-full rounded-2xl overflow-hidden mb-6 border border-zinc-800">
          <img
            src={forum.imageUrl}
            alt={forum.title}
            className="w-full h-72 object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl font-bold text-white mb-3">{forum.title}</h1>

      {/* Meta */}
      <p className="text-xs text-zinc-500 mb-4">
        {new Date(forum.timestamp).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Description */}
      <p className="text-zinc-300 leading-relaxed mb-8">{forum.description}</p>

      {/* Like / Dislike */}
      <div className="flex items-center gap-4 mb-10 border-t border-b border-zinc-800 py-4">

        <button
          onClick={handleLike}
          disabled={!user || isBlocked}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${hasLiked
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
              : "bg-zinc-900 text-zinc-400 border border-zinc-700 hover:text-cyan-400 hover:border-cyan-500/40"
            }
            disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <FaThumbsUp />
          <span>{likes.length}</span>
        </button>

        <button
          onClick={handleDislike}
          disabled={!user || isBlocked}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${hasDisliked
              ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
              : "bg-zinc-900 text-zinc-400 border border-zinc-700 hover:text-rose-400 hover:border-rose-500/40"
            }
            disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <FaThumbsDown />
          <span>{dislikes.length}</span>
        </button>

        {isBlocked && (
          <span className="text-xs text-rose-400 ml-2">
            Your account is restricted from interactions.
          </span>
        )}
      </div>

      {/* Comments Section */}
      <div>
        <h2 className="text-lg font-semibold mb-6">
          Comments{" "}
          <span className="text-zinc-500 text-sm font-normal">
            ({comments.length})
          </span>
        </h2>

        {/* Post Comment */}
        {user && !isBlocked ? (
          <div className="flex gap-3 mb-8">
            <Avatar name={user.name} image={user.image} />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 resize-none"
              />
              <button
                onClick={handlePostComment}
                className="mt-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-all"
              >
                Post Comment
              </button>
            </div>
          </div>
        ) : !user ? (
          <p className="text-sm text-zinc-500 mb-6">
            Please login to comment.
          </p>
        ) : (
          <p className="text-sm text-rose-400 mb-6">
            Your account is restricted from commenting.
          </p>
        )}

        {/* Comments List */}
        {loadingComments ? (
          <p className="text-zinc-500 text-sm">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-zinc-500 text-sm">
            No comments yet. Be the first!
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                <Avatar name={comment.userName} image={comment.userImage} />

                <div className="flex-1">
                  {/* Comment bubble */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">
                        {comment.userName}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Edit mode */}
                    {editingComment === comment._id ? (
                      <div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={2}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs hover:bg-cyan-500/30"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingComment(null)}
                            className="px-3 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-lg text-xs hover:bg-zinc-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-zinc-300">{comment.text}</p>
                    )}
                  </div>

                  {/* Comment actions */}
                  <div className="flex items-center gap-3 mt-1 px-1">
                    {user && !isBlocked && (
                      <button
                        onClick={() =>
                          setReplyingTo(
                            replyingTo === comment._id ? null : comment._id
                          )
                        }
                        className="flex items-center gap-1 text-xs text-zinc-500 hover:text-cyan-400 transition-colors"
                      >
                        <FaReply className="text-[10px]" />
                        Reply
                      </button>
                    )}

                    {user?.id === comment.userId && (
                      <>
                        <button
                          onClick={() => {
                            setEditingComment(comment._id);
                            setEditText(comment.text);
                          }}
                          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-yellow-400 transition-colors"
                        >
                          <FaEdit className="text-[10px]" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-rose-400 transition-colors"
                        >
                          <FaTrash className="text-[10px]" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>

                  {/* Reply input */}
                  {replyingTo === comment._id && (
                    <div className="flex gap-2 mt-3">
                      <Avatar name={user?.name} image={user?.image} size="7" />
                      <div className="flex-1">
                        <textarea
                          value={replyText[comment._id] || ""}
                          onChange={(e) =>
                            setReplyText((prev) => ({
                              ...prev,
                              [comment._id]: e.target.value,
                            }))
                          }
                          placeholder={`Reply to ${comment.userName}...`}
                          rows={2}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 resize-none"
                        />
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => handlePostReply(comment._id)}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs hover:bg-cyan-500/30"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-lg text-xs hover:bg-zinc-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies?.length > 0 && (
                    <div className="mt-3 flex flex-col gap-3 pl-3 border-l-2 border-zinc-800">
                      {comment.replies.map((reply, i) => (
                        <div key={i} className="flex gap-2">
                          <Avatar
                            name={reply.userName}
                            image={reply.userImage}
                            size="7"
                          />
                          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-white">
                                {reply.userName}
                              </span>
                              <span className="text-xs text-zinc-500">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-300">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}