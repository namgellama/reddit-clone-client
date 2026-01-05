import { AlertCircle } from "lucide-react";

import { Alert, AlertTitle } from "../ui/alert";

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>{message}</AlertTitle>
        </Alert>
    );
};

export default ErrorMessage;
