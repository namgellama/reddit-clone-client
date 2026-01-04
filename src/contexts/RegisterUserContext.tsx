import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";

interface RegisterFields {
    email: string;
    username: string;
    password: string;
}

interface RegisterUserContextType {
    fields: RegisterFields;
    setFields: Dispatch<SetStateAction<RegisterFields>>;
}

const RegisterUserContext = createContext<RegisterUserContextType>(
    {} as RegisterUserContextType
);

export const RegisterUserProvider = ({ children }: { children: ReactNode }) => {
    const [fields, setFields] = useState<RegisterFields>({
        email: "",
        username: "",
        password: "",
    });

    return (
        <RegisterUserContext.Provider value={{ fields, setFields }}>
            {children}
        </RegisterUserContext.Provider>
    );
};

export const useRegisterUser = () => {
    const context = useContext(RegisterUserContext);

    if (!context)
        throw new Error(
            "useRegisterUser must be used within a RegisterUserProvider"
        );

    return context;
};
