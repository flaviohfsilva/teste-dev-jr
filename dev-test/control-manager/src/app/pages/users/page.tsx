"use client"

import { useEffect, useState } from 'react';

import style from './usuario.module.css';

import { Users } from '@/app/interfaces';
import { baseUrl } from '@/app/services/Service';

import { Sidenav } from '@/app/components/sidenav/Sidenav';
import { Modal } from '@/app/components/modal/Modal';
import { ModalUpdate } from '@/app/components/modal-update/ModalUpdate';
import { ModalRemove } from '@/app/components/modal-remove/ModalRemove';

export default function Usuarios(){

    const [openModal, setOpenModal] = useState<string | null>(null);

    const [users, setUsers] = useState<Users[]>([]);
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);
    const [message, setMessage] = useState<string | null>(null);



    const handleModal = (modalName: string | null, user: Users | null = null) => {
        setSelectedUser(user);
        setOpenModal(modalName);
    };

    const findAll = async () => {
        const { data = []} = await baseUrl.get('users');
   
        setUsers([
           ...data,
        ]);
     };

     const showMessage = (message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, 3000); // 3 segundos
    };

     const updateUsersList = (successMessage: string) => {
        findAll();
        showMessage(successMessage);
     }

     const exportUserToExcel = async (user: Users) => {
        console.log(user.id)
        try {
            const response = await baseUrl.get(`users/export/${user.id}`, {
                responseType: 'blob', // Especifica que a resposta é um blob (arquivo)
            });

            // Criar um URL para o blob e criar um link para o download
            const url = window.URL.createObjectURL(new Blob([response.data]));
           
            // Cria um elemento <a></a> e atribui a ele uma url temporária
            const link = document.createElement('a');
            link.href = url;

            // Define o download com o nome do usuário
            link.setAttribute('download', `${user.nomeCompleto}.xlsx`); // Nome do arquivo
            
            // Anexa ele em um corpo no DOM, simula um click e depois remove. 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Erro ao exportar o usuário:', error);
        }
     };

     useEffect(() => {
        findAll();

    }, []);

    return(

        <main>
            <Sidenav></Sidenav>

            {/* ========== USERS SECTION AREA ==========  */}        
            <section id={style.usuarios}>
                <div className={style.user_container}>

                    <div className={style.user_header}>
                        <h1 className={style.title}>Painel de Controle</h1>

                        <a href="#" 
                        className={`${style.btn} ${style.btn_user}`}
                        onClick={ () => handleModal('add') }
                        >
                            Cadastrar Usuário
                        </a>
                    </div>

                    {/* ========== SNACKBAR VALIDATION ==========  */}
                    {message && (
                        <div className={style.message}>
                            <span className={`material-symbols-outlined`}>check</span>
                            {message}
                        </div>
                    )}

                    <div className="home-dash">

                         {/* ========== HOME USER DASHBOARD CONTENT ========== */}
                        <div className={style.dash_content_user}>

                            {/* ========== USER DELETED DASHBOARD AREA ========== */}
                            <div className={style.dash_user_deleted}>
                                
                                {/* ========== USER DELETED DASHBOARD CONTENT AREA ========== */}
                                <div className="user-content">
                                <h2 className={style.title_user_deleted}>Usuários Cadastrados</h2>

                                    {/* ========== PERFIL USER AREA ========== */}
                                    <div className={style.perfil_user_deleted}>
                                        {/* ========== PERFIL USER AREA ========== */}
                                        {users.map((user, index) => (
                                        <div key={index} className="perfil-user">

                                            {/* ========== PERFIL INFO AREA ========== */}
                                            <div className={style.perfil_info_deleted}>

                                                {/* ========== PERFIL TEXT AREA ========== */}
                                                <div className={style.perfil_texts}>

                                                    {/* ========== PERFIL HEADER AREA ========== */}
                                                    <div className={style.perfil_header}>
                                                        {/* ========== PERFIL PHOTO AREA ========== */}
                                                        <span className={`material-symbols-outlined ${style.icon_dash}`}>person</span>
                                                    
                                                        <div className={style.perfil_user_section}>
                                                            <h3 className={style.perfil_title}>{user.nomeCompleto}</h3>
                                                            <p className={style.perfil_subtitle}>{user.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ========== BUTTONS AREA ========== */}
                                                <div className={style.buttons_area}>
                                                    <a href="#" 
                                                     className={style.btn_edit}
                                                     onClick={ () => handleModal('update', user) }
                                                     >
                                                        <span className={`material-symbols-outlined`}>edit</span>
                                                    </a>

                                                    <a href="#" 
                                                    className={style.btn_remove}
                                                    onClick={ () => handleModal('remove', user) }
                                                    >
                                                        <span className={`material-symbols-outlined`}>delete</span>
                                                    </a>

                                                    <a href="#" 
                                                    className={style.btn_export}
                                                    onClick={() => exportUserToExcel(user)}
                                                    >
                                                        <span className={`material-symbols-outlined`}>download</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    
                </div>
                {openModal === 'add' && (
                    <Modal 
                    isOpen={true} 
                    isClose={() => handleModal(null)} 
                    onSuccess={() => updateUsersList('Usuário criado com sucesso!')}
                    />
                )}
                
                {openModal === 'update' && selectedUser && (
                    <ModalUpdate 
                    isOpen={true} 
                    isClose={() => handleModal(null)}
                    user={selectedUser}
                    onSuccess={() => updateUsersList('Usuário atualizado com sucesso!')}
                    />
                )}

                {openModal === 'remove' && selectedUser && (
                    <ModalRemove 
                    isOpen={true} 
                    isClose={() => handleModal(null)} 
                    user={selectedUser}
                    onSuccess={() => updateUsersList('Usuário removido com sucesso!')}
                    />
                )}
            </section>
        </main>
        
     

    );
}