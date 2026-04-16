import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Backend, createActor } from "../backend";
import type {
  AphorismInput,
  RepertoryEntryInput,
  SourcedRemedyInput,
} from "../backend.d";

function useBE() {
  const { actor, isFetching } = useActor(createActor);
  return { actor: actor as Backend | null, isFetching };
}

// ─── Query hooks ─────────────────────────────────────────────────────────────

export function useIsAdmin() {
  const { actor, isFetching } = useBE();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminList() {
  const { actor, isFetching } = useBE();
  return useQuery<Principal[]>({
    queryKey: ["adminList"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAdminList();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Admin bootstrap / management mutations ──────────────────────────────────

export function useBootstrapAdmin() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<boolean, Error>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bootstrapAdmin();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["isAdmin"] });
      qc.invalidateQueries({ queryKey: ["adminList"] });
    },
  });
}

export function useGrantAdmin() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<boolean, Error, Principal>({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.grantAdmin(principal);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminList"] }),
  });
}

export function useRevokeAdmin() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<boolean, Error, Principal>({
    mutationFn: async (principal) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.revokeAdmin(principal);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminList"] }),
  });
}

// ─── Materia Medica mutations ─────────────────────────────────────────────────

export function useAdminUpsertSourcedRemedy() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<string, Error, SourcedRemedyInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminUpsertSourcedRemedy(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sourcedRemedies"] }),
  });
}

export function useAdminDeleteSourcedRemedy() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminDeleteSourcedRemedy(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sourcedRemedies"] }),
  });
}

export function useAdminBulkImportSourcedRemedies() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<bigint, Error, SourcedRemedyInput[]>({
    mutationFn: async (inputs) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminBulkImportSourcedRemedies(inputs);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sourcedRemedies"] }),
  });
}

// ─── Organon mutations ────────────────────────────────────────────────────────

export function useAdminUpsertAphorism() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<bigint, Error, AphorismInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminUpsertAphorism(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aphorisms"] }),
  });
}

export function useAdminDeleteAphorism() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminDeleteAphorism(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aphorisms"] }),
  });
}

export function useAdminBulkImportAphorisms() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<bigint, Error, AphorismInput[]>({
    mutationFn: async (inputs) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminBulkImportAphorisms(inputs);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aphorisms"] }),
  });
}

// ─── Repertory mutations ──────────────────────────────────────────────────────

export function useAdminUpsertRepertoryEntry() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<string, Error, RepertoryEntryInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminUpsertRepertoryEntry(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["repertoryEntries"] }),
  });
}

export function useAdminDeleteRepertoryEntry() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminDeleteRepertoryEntry(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["repertoryEntries"] }),
  });
}

export function useAdminBulkImportRepertoryEntries() {
  const { actor } = useBE();
  const qc = useQueryClient();
  return useMutation<bigint, Error, RepertoryEntryInput[]>({
    mutationFn: async (inputs) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminBulkImportRepertoryEntries(inputs);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["repertoryEntries"] }),
  });
}

// ─── List queries for admin views ─────────────────────────────────────────────

export function useAdminSourcedRemedies() {
  const { actor, isFetching } = useBE();
  return useQuery({
    queryKey: ["sourcedRemedies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSourcedRemedies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminAphorisms() {
  const { actor, isFetching } = useBE();
  return useQuery({
    queryKey: ["aphorisms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAphorisms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminRepertoryEntries() {
  const { actor, isFetching } = useBE();
  return useQuery({
    queryKey: ["repertoryEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listRepertoryEntries();
    },
    enabled: !!actor && !isFetching,
  });
}
