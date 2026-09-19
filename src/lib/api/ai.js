import { authClient } from "@/lib/auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const getHeaders = async () => {
  const tokenData = await authClient.token();
  const token = tokenData?.data?.token || (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
  
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const getAIDashboardSummary = async () => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/dashboard-summary`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch AI dashboard summary");
  return response.json();
};

export const getAIHistory = async (type = "all", page = 1, limit = 10) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/history?type=${type}&page=${page}&limit=${limit}`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch AI history");
  return response.json();
};

export const getAIPlan = async (id) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/plans/${id}`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch AI plan");
  return response.json();
};

export const archiveAIPlan = async (id) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/plans/${id}/archive`, {
    method: "PATCH",
    headers,
  });
  if (!response.ok) throw new Error("Failed to archive AI plan");
  return response.json();
};

export const sendChatMessage = async (message, conversationId = null, history = []) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({ message, conversationId, history }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send chat message");
  }
  return response.json();
};

export const getChatHistory = async () => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/chat/history`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch chat history");
  return response.json();
};

export const getChatMessages = async (conversationId) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/chat/${conversationId}/messages`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Failed to fetch chat messages");
  return response.json();
};
