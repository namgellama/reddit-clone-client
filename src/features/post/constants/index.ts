export const postCache = {
    all: ["posts"] as const,
    details: (id: string) => ["posts", id] as const,
};
