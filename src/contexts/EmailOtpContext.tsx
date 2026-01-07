import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";

interface Data {
    email: string;
    otp: string;
}

interface EmailOtpContextType {
    data: Data;
    setData: Dispatch<SetStateAction<Data>>;
    isEmailSet: boolean;
    isOtpSet: boolean;
    resetData: () => void;
}

const EmailOtpContext = createContext<EmailOtpContextType>(
    {} as EmailOtpContextType
);

export const EmailOtpProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<Data>({
        email: "",
        otp: "",
    });

    const isEmailSet = !!data.email;
    const isOtpSet = !!data.email && !!data.otp;

    const resetData = () => {
        setData({ email: "", otp: "" });
    };

    return (
        <EmailOtpContext.Provider
            value={{ data, setData, isEmailSet, isOtpSet, resetData }}
        >
            {children}
        </EmailOtpContext.Provider>
    );
};

export const useEmailOtp = () => {
    const context = useContext(EmailOtpContext);

    if (!context)
        throw new Error("useEmailOtp must be used within a EmailOtpProvider");

    return context;
};
