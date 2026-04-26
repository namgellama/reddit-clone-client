export const postCache = {
    all: (skip: number, limit: number) => ["posts", skip, limit] as const,
    details: (id: string) => ["posts", id] as const,
};
