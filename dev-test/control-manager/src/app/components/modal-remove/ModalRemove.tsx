import { useState } from 'react';

import style from './modal_remove.module.css';

import { ModalProps } from '@/app/interfaces';
import { baseUrl } from '@/app/services/Service';


const ModalRemove = ({ isOpen, isClose, user, onSuccess }: ModalProps) => {

     // ================= REMOVER USUÁRIO =================   
     const deleteUser = async (idUser: number) => {
        try {
            await baseUrl.delete(`users/delete/${idUser}`);

            // Atualiza a lista de usuários na página principal
            if (onSuccess) onSuccess();


            // Fecha o modal após a exclusão
            isClose();
        } catch (error) {
            console.log('Erro ao excluir usuário', error);
        }
    }

    if (!isOpen || !user) return null;

    return (
        <section id="modal" className={style.overlay}>
            <div className={style.modal_container}>
                <div className={style.modal_header}>
                    <h1 className={style.modal_title}>Remover Usuário</h1>
                </div>

                <div className={style.modal_info}>
                    <h2 className={style.text_alert}>Você deseja excluir o usuário <span className={style.username}>{user.nomeCompleto}</span>?</h2>
                </div>

                <div className={style.button_area}>
                    <button
                        className={`${style.btn} ${style.btn_cancel}`}
                        onClick={isClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className={style.btn_form}
                        onClick={() => user && deleteUser(user.id)}
                    >
                        Excluir usuário
                    </button>
                </div>
            </div>
        </section>
    );
}

export { ModalRemove };