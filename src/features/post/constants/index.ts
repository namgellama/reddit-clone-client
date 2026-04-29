export const postCache = {
    all: (skip: number, limit: number) =>
        ["posts", "list", skip, limit] as const,
    details: (id: string) => ["posts", "details", id] as const,
};
