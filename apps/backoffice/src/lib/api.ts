const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Copy existing headers if any
  if (fetchOptions.headers) {
    const existingHeaders = fetchOptions.headers as Record<string, string>;
    Object.assign(headers, existingHeaders);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `API Error: ${res.status}`);
  }

  return res.json();
}

// API Functions
export const api = {
  auth: {
    login: (email: string, password: string) =>
      fetchAPI<{ token: string; user: any }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    me: (token: string) => fetchAPI<{ user: any }>("/api/auth/me", { token }),
  },

  events: {
    list: () => fetchAPI<{ events: any[] }>("/api/events"),
    get: (id: string) => fetchAPI<{ event: any }>(`/api/events/${id}`),
  },

  registrations: {
    list: (token: string) =>
      fetchAPI<{ registrations: any[] }>("/api/registrations", { token }),
    checkin: (token: string, id: number) =>
      fetchAPI<{ success: boolean; registration: any }>(
        `/api/registrations/${id}/checkin`,
        {
          method: "POST",
          token,
        }
      ),
  },

  payments: {
    list: (token: string) =>
      fetchAPI<{ payments: any[] }>("/api/payments", { token }),
  },

  users: {
    list: (token: string) =>
      fetchAPI<{ users: any[] }>("/api/backoffice/users", { token }),
    create: (token: string, data: any) =>
      fetchAPI<{ user: any }>("/api/backoffice/users", {
        method: "POST",
        body: JSON.stringify(data),
        token,
      }),
    update: (token: string, id: number, data: any) =>
      fetchAPI<{ user: any }>(`/api/backoffice/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        token,
      }),
    delete: (token: string, id: number) =>
      fetchAPI<{ success: boolean }>(`/api/backoffice/users/${id}`, {
        method: "DELETE",
        token,
      }),
    assignEvents: (token: string, id: number, eventIds: number[]) =>
      fetchAPI<{ success: boolean; count: number }>(
        `/api/backoffice/users/${id}/assignments`,
        {
          method: "POST",
          body: JSON.stringify({ eventIds }),
          token,
        }
      ),
  },

  verifications: {
    list: (token: string) =>
      fetchAPI<{ verifications: any[] }>("/api/backoffice/verifications", { token }),
    approve: (token: string, id: string) =>
      fetchAPI<{ success: boolean; user: any }>(
        `/api/backoffice/verifications/${id}/approve`,
        {
          method: "POST",
          body: JSON.stringify({}),
          token,
        }
      ),
    reject: (token: string, id: string, reason: string) =>
      fetchAPI<{ success: boolean; user: any }>(
        `/api/backoffice/verifications/${id}/reject`,
        {
          method: "POST",
          body: JSON.stringify({ reason }),
          token,
        }
      ),
  },
};
