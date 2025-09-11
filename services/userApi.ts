export type UpsertUserRequest = {
  userId: string;
  email?: string;
  name?: string;
};

export type UpsertUserResponse = {
  ok: boolean;
};

const API_BASE_URL = (import.meta as any).env.VITE_USER_API_BASE_URL as string | undefined;

export async function upsertUser(request: UpsertUserRequest): Promise<UpsertUserResponse> {
  if (!API_BASE_URL) {
    // In dev without backend, no-op to avoid breaking auth flow.
    return { ok: true };
  }
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error(`User API failed: ${response.status}`);
  }
  return response.json();
}



