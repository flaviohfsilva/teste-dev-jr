export interface Users {
    id: number,
    nomeCompleto: string;
    email: string;
    status: string;
}

export interface CreateUser{
    nomeCompleto: string;
    email: string;
}


export interface ModalProps {
    isOpen: boolean;
    isClose: () => void;
    user?: Users | null;
    onSuccess?: () => void;
}