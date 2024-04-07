import {Dispatch, SetStateAction} from "react";

interface AuthOpts {
    middleware?: 'auth' | 'guest';
    redirectIfAuthenticated?: string;
}

interface Register {
    setErrors: (errors: any) => void;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface Login {
    setErrors?: (errors: any) => void;
    setStatus?: Dispatch<SetStateAction<null>>;
    email: string;
    password: string;
    remember?: boolean | undefined;
}

interface ForgotPassword {
    setErrors: (errors: any) => void;
    setStatus: (status: string|null) => void;
    email: string;
}

interface ResetPassword {
    setErrors: (errors: any) => void;
    setStatus: (status: string|null) => void;
    password: string;
    password_confirmation: string;
}

interface ResendEmailVerification {
    setStatus: (status: string|null) => void;
}

interface Logout {
    error: any;
}

export type {
    AuthOpts,
    Register,
    Login,
    ForgotPassword,
    ResetPassword,
    ResendEmailVerification,
    Logout,
};
