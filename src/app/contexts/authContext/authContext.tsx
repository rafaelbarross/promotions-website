"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { User, deleteUser } from "firebase/auth";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from 'next/navigation'

interface Props {
  // avisos: AvisoData[];
  // setAvisos: (aviso: AvisoData[]) => void;
  // openLimitReservas: boolean;
  // setOpenLimitReservas: (dialogLimit: true | false) => void;
  // handleOpenLimit: () => void;

  // openDialogSucess: boolean;
  // handleOpenDialogSucess: () => void;
  // setOpenDialogSucess: (dialog: true | false) => void;
  // open: boolean;
  // handleOpen: () => void;
  user: User | null;
  googleSignIn: () => void;
  logOut: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;

  // avisos: AvisoData[] | [];
  // setAvisos: (aviso: AvisoData[] | []) => void;
}

// interface AvisoData {
//   id: string;
//   foto: string;
//   nome: string;
//   data: Timestamp;
//   aviso: string;
//   email: string;
//   dataEdicao: string;
//   dataFormatada: string;
// }

const AuthContext = createContext<Props>({} as Props);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  // const navigate = useNavigate();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Verifica se o email tem o domínio correto
    if (
      result!.user!.email! === "rsb8@aluno.ifal.edu.br" ||
      result!.user!.email! === "gamer17.super@gmail.com"
    ) {
      // console.log('Login bem sucedido');
      setUser(result.user); // Atualiza o estado do usuário aqui
      router.push("/");
    } else {
      // console.log('Email não permitido');
      setIsDialogOpen(true);
      await signOut(auth); // Desconecta o usuário
      await deleteUser(result.user); // Exclui a conta do usuário
    }
  };

  const logOut = () => {
    signOut(auth).then(() => {
     router.push("/");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  const value = {
    setIsDialogOpen,
    user,
    isDialogOpen,
    googleSignIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const useAuth = (): AuthContextData => {
//   return useContext(AuthContext)
// };

// export default AuthContextProvider;

export const UserAuth = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(AuthContext);
};
