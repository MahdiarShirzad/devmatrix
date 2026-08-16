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
  collections: (projectId: string) =>
    ["playground", "collections", projectId] as const,
  collection: (projectId: string, id: string) =>
    ["playground", "collections", projectId, id] as const,
};

// ---- Collections ----

export function useCollections(projectId: string) {
  return useQuery({
    queryKey: playgroundKeys.collections(projectId),
    queryFn: () =>
      api.get<{ data: { collections: Collection[] } }>(
        `/projects/${projectId}/playground/collections`,
      ),
    select: (res) => res.data.collections,
    enabled: !!projectId,
  });
}

export function useCollection(projectId: string, id: string) {
  return useQuery({
    queryKey: playgroundKeys.collection(projectId, id),
    queryFn: () =>
      api.get<{ data: { collection: Collection; requests: SavedRequest[] } }>(
        `/projects/${projectId}/playground/collections/${id}`,
      ),
    select: (res) => res.data,
    enabled: !!projectId && !!id,
  });
}

export function useCreateCollection(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      name: string;
      env: PlaygroundEnv;
      baseUrl?: string;
    }) =>
      api.post<{ data: { collection: Collection } }>(
        `/projects/${projectId}/playground/collections`,
        payload,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playgroundKeys.collections(projectId),
      });
    },
  });
}

export function useDeleteCollection(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/projects/${projectId}/playground/collections/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playgroundKeys.collections(projectId),
      });
    },
  });
}

// ---- Requests ----

export function useCreateRequest(projectId: string, collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<SavedRequest>) =>
      api.post<{ data: { request: SavedRequest } }>(
        `/projects/${projectId}/playground/collections/${collectionId}/requests`,
        payload,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playgroundKeys.collection(projectId, collectionId),
      });
    },
  });
}

export function useUpdateRequest(projectId: string, collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }: Partial<SavedRequest> & { id: string }) =>
      api.patch<{ data: { request: SavedRequest } }>(
        `/projects/${projectId}/playground/requests/${id}`,
        payload,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playgroundKeys.collection(projectId, collectionId),
      });
    },
  });
}

export function useDeleteRequest(projectId: string, collectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/projects/${projectId}/playground/requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: playgroundKeys.collection(projectId, collectionId),
      });
    },
  });
}

// ---- Execute ----

export function useExecuteRequest(projectId: string, collectionId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ExecuteParams) =>
      api.post<{ data: ExecuteResult }>(
        `/projects/${projectId}/playground/execute`,
        params,
      ),
    onSuccess: () => {
      // The server may have persisted this onto a SavedRequest —
      // refetch so lastResponse shows up after switching requests.
      if (collectionId) {
        queryClient.invalidateQueries({
          queryKey: playgroundKeys.collection(projectId, collectionId),
        });
      }
    },
  });
}
