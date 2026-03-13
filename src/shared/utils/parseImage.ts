import { API_URL } from "../lib/api";

const NODE_ENV = import.meta.env.VITE_PUBLIC_NODE_ENV;

export function parseImage(image: string) {
    return NODE_ENV === "production" ? image : `${API_URL}${image}`;
}
