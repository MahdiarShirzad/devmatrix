import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Collection,
  SavedRequest,
  ExecuteParams,
  ExecuteResult,
  PlaygroundEnv,
} from "@/types/playground.types";
import { api } from "@/lib/apiClient";

const playgroundKeys = {
  collections: ["playground", "collections"] as const,
  collection: (id: string) => ["playground", "collections", id] as const,
};

// ---- Collections ----

export function useCollections() {
  return useQuery({
    queryKey: playgroundKeys.collections,
    queryFn: () =>
      api.get<{ data: { collections: Collection[] } }>(
        "/playground/collections",
      ),
    select: (res) => res.data.collections,
  });
}

export function useCollection(id: string) {
  return useQuery({
    queryKey: playgroundKeys.collection(id),
    queryFn: () =>
      api.get<{ data: { collection: Collection; requests: SavedRequest[] } }>(
        `/playground/collections/${id}`,
      ),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useCreateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      name: string;
      env: PlaygroundEnv;
      baseUrl?: string;
    }) =>
      api.post<{ data: { collection: Collection } }>(
        "/playground/collections",
        payload,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playgroundKeys.collections });
    },
  });
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/playground/collections/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playgroundKeys.collections });
    },
  });
}

// ---- Requests ----

export function useCreateRequest(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<SavedRequest>) =>
      api.post<{ data: { request: SavedRequest } }>(
        `/playground/collections/${collectionId}/requests`,
        payload,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playgroundKeys.collection(collectionId),
      });
    },
  });
}

export function useUpdateRequest(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<SavedRequest> & { id: string }) =>
      api.patch<{ data: { request: SavedRequest } }>(
        `/playground/requests/${id}`,
        payload,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playgroundKeys.collection(collectionId),
      });
    },
  });
}

export function useDeleteRequest(collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/playground/requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playgroundKeys.collection(collectionId),
      });
    },
  });
}

// ---- Execute ----

export function useExecuteRequest() {
  return useMutation({
    mutationFn: (params: ExecuteParams) =>
      api.post<{ data: ExecuteResult }>("/playground/execute", params),
  });
}
