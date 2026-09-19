import { authClient } from "@/lib/auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const handleResponse = async (response, defaultMessage) => {
  if (!response.ok) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || defaultMessage);
    }
    const text = await response.text().catch(() => "");
    throw new Error(`${defaultMessage}: ${response.status} ${text.slice(0, 200)}`);
  }
  return response.json();
};

const getHeaders = async () => {
  let tokenData = null;
  try {
    tokenData = await authClient.token();
  } catch (error) {
    // Silently ignore auth token failures for unauthenticated users
  }
  
  const token = tokenData?.data?.token;
  
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
  return handleResponse(response, "Failed to fetch AI dashboard summary");
};

export const getAIHistory = async (type = "all", page = 1, limit = 10) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/history?type=${type}&page=${page}&limit=${limit}`, {
    method: "GET",
    headers,
  });
  return handleResponse(response, "Failed to fetch AI history");
};

export const getAIPlan = async (id) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/plans/${id}`, {
    method: "GET",
    headers,
  });
  return handleResponse(response, "Failed to fetch AI plan");
};

export const archiveAIPlan = async (id) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/plans/${id}/archive`, {
    method: "PATCH",
    headers,
  });
  return handleResponse(response, "Failed to archive AI plan");
};

export const sendChatMessage = async (message, conversationId = null, history = []) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({ message, conversationId, history }),
  });
  return handleResponse(response, "Failed to send chat message");
};

export const getChatHistory = async () => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/chat/history`, {
    method: "GET",
    headers,
  });
  return handleResponse(response, "Failed to fetch chat history");
};

export const getChatMessages = async (conversationId) => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/ai/chat/${conversationId}/messages`, {
    method: "GET",
    headers,
  });
  return handleResponse(response, "Failed to fetch chat messages");
};
