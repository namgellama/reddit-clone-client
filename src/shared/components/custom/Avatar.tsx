import {
    AvatarFallback,
    Avatar as ShadAvatar,
} from "@/shared/components/ui/avatar";

const Avatar = ({ label }: { label: string }) => {
    return (
        <ShadAvatar>
            <AvatarFallback className="bg-gray-500 text-background uppercase">
                {label.charAt(0)}
            </AvatarFallback>
        </ShadAvatar>
    );
};

export default Avatar;
