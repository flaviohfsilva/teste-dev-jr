import { CreateUser, ModalProps, Users } from '@/app/interfaces';
import style from './modal-update.module.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '@/app/services/Service';

const ModalUpdate = ({ isOpen, isClose, user, onSuccess }: ModalProps) =>{

    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setNomeCompleto(user.nomeCompleto);
            setEmail(user.email);
        }
    }, [user]);
    
     // ================= ATUALIZAR USUÁRIO =================   
     const updateUser = async (idUser: number, updateUser: CreateUser) => {
        try {
            await baseUrl.put(`users/update/${idUser}`, updateUser);

            // Fecha o modal após a criação do usuário
            isClose();

            // Atualiza a lista de usuários na página principal
            if (onSuccess) onSuccess();
        } catch (error) {
            console.log('Erro ao atualizar usuário', error);
        }
    };

    const formSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (user) {
            updateUser(user.id, { nomeCompleto, email });
        }
    };

    if(isOpen) {
        return(
            <section id="modal" className={style.overlay}>
                {/* <button onClick={isClose}>Fechar</button> */}

                <div className={style.modal_container}>

                    <div className={style.modal_header}>
                        <h1 className={style.modal_title}>Atualizar Usuário</h1>
                    </div>


                    <form action="" onSubmit={formSubmit} className={style.modal_form}>


                        <div className={style.input_field}>
                            <label htmlFor="nome">Nome</label>
                            <input 
                            className={style.form_input} 
                            type="text"
                             placeholder='Informe o seu nome'
                             value={nomeCompleto}
                             onChange={(event) => setNomeCompleto(event.target.value)}
                             />
                        </div>

                        <div className={style.input_field}>
                            <label htmlFor="email">Email</label>
                            <input 
                            className={style.form_input} 
                            type="email" 
                            placeholder='Insira o seu email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className={style.button_area}>
                            <a
                            className={`${style.btn} ${style.btn_cancel}`} 
                            onClick={isClose}
                            >
                                Cancelar
                            </a>
                            <button type='submit' className={style.btn_form}>Atualizar usuário</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export { ModalUpdate };