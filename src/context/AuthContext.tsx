import { createContext, useState } from 'react';

type UserContextType = {
    user: any;
    setUser: any;
};

type AuthUser = {
    email: string;
    name: string;
};

const AuthContext = createContext<UserContextType | null>({} as UserContextType);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
