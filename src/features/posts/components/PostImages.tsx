import { Card, CardContent } from "@/shared/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/components/ui/carousel";

const PostImages = ({ images }: { images: string[] }) => {
    if (images.length > 1)
        return (
            <Carousel className="w-full h-128">
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image}>
                            <Card>
                                <CardContent className="">
                                    <img
                                        src={image}
                                        alt={`Image ${image}`}
                                        className="w-full h-128 object-contain bg-black/75 rounded-2xl"
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        );

    return (
        <img
            src={images[0]}
            alt={`Image ${images[0]}`}
            className="w-full h-128 object-contain bg-black/75 rounded-2xl"
        />
    );
};

export default PostImages;
