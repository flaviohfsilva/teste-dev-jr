import { CreateUser, ModalProps, Users } from '@/app/interfaces';
import style from './modal.module.css';
import { baseUrl } from '@/app/services/Service';
import { useState } from 'react';

const Modal = ({ isOpen, isClose, onSuccess }: ModalProps) => {

    const [users, setUsers] = useState<Users[]>([]);
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');

    // ================= CRIAR USUÁRIO =================   
    const createUser = async (user: CreateUser) => {
        try {
            const { data: newUser } = await baseUrl.post('users/create', user);

            setUsers(currentUsers => [
                ...currentUsers,
                newUser
            ]);

            // Limpa os campos do formulário após a criação do usuário
            setNomeCompleto('');
            setEmail('');
            
            // Fecha o modal após a criação do usuário
            isClose();

            // Atualiza a lista de usuários na página principal
            if (onSuccess) onSuccess();
        } catch (error) {
            console.log('Erro ao criar um novo usuário', error);
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createUser({ nomeCompleto, email });
    }

    if (!isOpen) return null;

    return (
        <section id="modal" className={style.overlay}>
            <div className={style.modal_container}>
                <div className={style.modal_header}>
                    <h1 className={style.modal_title}>Cadastrar Usuário</h1>
                    <a href="#" 
                        className={style.btn_close}
                        onClick={isClose}
                    >
                        <span className={`material-symbols-outlined ${style.icon_close}`}>close</span>
                    </a>
                </div>

                <form onSubmit={handleSubmit} className={style.modal_form}>
                    <div className={style.input_field}>
                        <label htmlFor="nome">Nome</label>
                        <input 
                            className={style.form_input} 
                            type="text" 
                            placeholder='Informe o seu nome'
                            value={nomeCompleto}
                            onChange={(e) => setNomeCompleto(e.target.value)}
                            required
                        />
                    </div>

                    <div className={style.input_field}>
                        <label htmlFor="email">Email</label>
                        <input 
                            className={style.form_input} 
                            type="email" 
                            placeholder='Insira o seu email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type='submit' className={style.btn_form}>Criar usuário</button>
                </form>
            </div>
        </section>
    );
}

export { Modal };
