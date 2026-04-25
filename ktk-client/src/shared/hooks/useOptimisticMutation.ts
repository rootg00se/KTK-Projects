import { useMutation, type MutationKey, type QueryFilters, type QueryKey } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/query-client";

type QueryKeyResolver<TVariables> = QueryKey | ((variables: TVariables) => QueryKey);
type QueryFilterResolver<TVariables> = QueryFilters | ((variables: TVariables) => QueryFilters);

type SingleQueryTarget<TVariables> = {
    queryKey: QueryKeyResolver<TVariables>;
    updater: (previousData: unknown, variables: TVariables) => unknown;
};

type ManyQueriesTarget<TVariables> = {
    queryFilters: QueryFilterResolver<TVariables>;
    updater: (previousData: unknown, variables: TVariables) => unknown;
};

type OptimisticTarget<TVariables> = SingleQueryTarget<TVariables> | ManyQueriesTarget<TVariables>;

type Snapshot = {
    queryKey: QueryKey;
    data: unknown;
};

interface IUseOptimisticMutationProps<TVariables, TData, TError> {
    mutationKey: MutationKey;
    mutationFn: (variables: TVariables) => Promise<TData>;
    optimisticTargets: OptimisticTarget<TVariables>[];
    cancelQueryKeys?: QueryKeyResolver<TVariables>[];
    onError?: (error: TError, variables: TVariables) => void;
    onSuccess?: (data: TData, variables: TVariables) => void;
    onSettled?: () => void;
}

export const useOptimisticMutation = <TVariables, TData = unknown, TError = unknown>({
    mutationKey,
    mutationFn,
    optimisticTargets,
    cancelQueryKeys,
    onError,
    onSuccess,
    onSettled,
}: IUseOptimisticMutationProps<TVariables, TData, TError>) => {
    return useMutation<TData, TError, TVariables, { snapshots: Snapshot[] }>({
        mutationKey,
        mutationFn,
        onMutate: async (variables) => {
            const keysToCancel =
                cancelQueryKeys?.map((queryKey) => (typeof queryKey === "function" ? queryKey(variables) : queryKey)) ??
                [];

            await Promise.all(keysToCancel.map((queryKey) => queryClient.cancelQueries({ queryKey })));

            const snapshots: Snapshot[] = [];

            optimisticTargets.forEach((target) => {
                if ("queryKey" in target) {
                    const queryKey = typeof target.queryKey === "function" ? target.queryKey(variables) : target.queryKey;
                    const previousData = queryClient.getQueryData(queryKey);

                    snapshots.push({ queryKey, data: previousData });
                    queryClient.setQueryData(queryKey, (currentData: unknown) => target.updater(currentData, variables));
                    return;
                }

                const queryFilters =
                    typeof target.queryFilters === "function" ? target.queryFilters(variables) : target.queryFilters;

                const queries = queryClient.getQueriesData(queryFilters);

                queries.forEach(([queryKey, previousData]) => {
                    snapshots.push({ queryKey, data: previousData });
                    queryClient.setQueryData(queryKey, (currentData: unknown) => target.updater(currentData, variables));
                });
            });

            return { snapshots };
        },
        onError: (error, variables, context) => {
            context?.snapshots.forEach(({ queryKey, data }) => {
                queryClient.setQueryData(queryKey, data);
            });

            onError?.(error, variables);
        },
        onSuccess: (data, variables) => {
            onSuccess?.(data, variables);
        },
        onSettled: () => {
            onSettled?.();
        },
    });
};
