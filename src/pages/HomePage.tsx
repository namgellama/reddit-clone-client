import { useGetAllPosts } from "@/features/posts/api";

import { Button } from "@/shared/components/ui/button";

const HomePage = () => {
    const { posts } = useGetAllPosts();
    console.log("🚀 ~ HomePage ~ posts:", posts);

    return (
        <div>
            <Button>Click me</Button>
        </div>
    );
};

export default HomePage;
