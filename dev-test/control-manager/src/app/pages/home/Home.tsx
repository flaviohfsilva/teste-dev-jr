import { useEffect, useState } from 'react';
import Link from 'next/link';

import 'material-symbols';
import style from './home.module.css';

import { Modal } from '@/app/components/modal/Modal';
import { Sidenav } from "../../components/sidenav/Sidenav";

import { baseUrl } from '@/app/services/Service';
import { Users } from "../../interfaces";



const HomePage = () => {

  const [openModal, setOpenModal] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);


  const [users, setUsers] = useState<Users[]>([]);
  const [usersDeleted, setUsersDeleted] = useState<Users[]>([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersUpdated, setUpdatedUsersCount] = useState(0);
  const [totalUsersDeleted, setTotalUsersDeleted] = useState(0);

  const [message, setMessage] = useState<string | null>(null);



  const findAll = async () => {
     const { data = []} = await baseUrl.get('users');

     setUsers([
        ...data,
     ]);

     
     setTotalUsers(data.length);

    const updatedUsers = data.filter((user: Users) => user.status === 'Updated');
    setUpdatedUsersCount(updatedUsers.length);
  };

  const findAllDelted = async () => {
    const { data = [] } = await baseUrl.get('users/findDeleted');

    setUsersDeleted([
      ...data
    ]);

    setTotalUsersDeleted(data.length);

  };

  const handleModal = (modalName: string | null, user: Users | null = null) => {
    setSelectedUser(user);
    setOpenModal(modalName);
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


  useEffect(() => {
      findAll();
      findAllDelted();
  }, []);

    return(
      
      <main>
        {/* <Sidenav></Sidenav> */}

          {/* ========== HOME SECTION AREA ==========  */}
           <section id={style.home}>
            {/* ========== HOME CONTAINER AREA ==========  */}
            <div className={style.home_container}>

              {/* ========== HOME HEADER AREA ========== */}
              <div className={style.home_header}>
                <div className={style.title_area}>
                  <p className={style.subtitle}>Olá Admin,</p>
                  <h1 className={style.title}>Bem-vindo ao Control Manager!</h1>
                </div>

                <div className={style.search_bar}>
                  <a href="#" className={style.search}>
                    <span className={`material-symbols-outlined ${style.icon_search}`}>search</span>
                  </a>
                  <input type="text" className={style.form_input} placeholder="Pesquisar"/>
                </div>
              </div>
              
                 {/* ========== SNACKBAR VALIDATION ==========  */}
                 {message && (
                        <div className={style.message}>
                            <span className={`material-symbols-outlined`}>check</span>
                            {message}
                        </div>
                    )}

              {/* ========== HOME DASHBOARD AREA 1 ========== */}
              <div className="home-dash">
                {/* ========== HOME DASHBOARD CONTENT ========== */}
                <div className={style.dash_content}>

                  {/* ========== CARD DASH 1 ========== */}
                  <div className={style.card_dash}>
                    <h1 className={style.title_dash}>Usuários Cadastrados</h1>
                    <h2 className={style.number_user}>{totalUsers}</h2>
                  </div>

                  {/* ========== CARD DASH 2 ========== */}
                  <div className={style.card_dash}>
                    <h1 className={style.title_dash}>Usuários Atualizados</h1>
                    <h2 className={style.number_user}>{totalUsersUpdated}</h2>
                  </div>

                  {/* ========== CARD DASH 3 ========== */}
                  <div className={style.card_dash}>
                    <h1 className={style.title_dash}>Usuários Excluídos</h1>
                    <h2 className={style.number_user}>{totalUsersDeleted}</h2>
                  </div>

                  {/* ========== CARD DASH 4 ========== */}
                  <div className={style.card_dash}>
                    
                  {/* ========== CARD CONTENT DASH 4 ========== */}
                    <div className={style.card_content}>

                      {/* ========== CARD TITLE DASH 4 ========== */}
                      <div className={style.card_title}>
                        <span className={`material-symbols-outlined ${style.icon_dash}`}>person</span>
                        <p className={style.title_dash}>Cadastrar Usuário</p>
                      </div>

                      {/* ========== BTN DASH 4 ========== */}
                      <a href="#" 
                      className={`${style.btn} ${style.btn_new}`}
                      onClick={ () => handleModal('add') }
                      >Cadastrar</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========== HOME USER DASHBOARD AREA ========== */}
              <div className="home-dash">

                {/* ========== HOME USER DASHBOARD CONTENT ========== */}
                <div className={style.dash_content_user}>

                  {/* ========== USER DELETED DASHBOARD AREA ========== */}
                  <div className={style.dash_user_deleted}>
                    
                    {/* ========== USER DELETED DASHBOARD CONTENT AREA ========== */}
                    <div className="user-content">
                      <h2 className={style.title_user_deleted}>Usuários Excluídos</h2>

                        {/* ========== PERFIL USER AREA ========== */}
                        <div className={style.perfil_user_deleted}>
                            {/* ========== PERFIL USER AREA ========== */}
                            {usersDeleted.map((user, index) => (
                              <div key={index} className="perfil-user">
                                {/* ========== PERFIL INFO AREA ========== */}
                                <div className={style.perfil_info_deleted}>
                                  {/* ========== PERFIL PHOTO AREA ========== */}
                                  <span className={`material-symbols-outlined ${style.icon_dash}`}>person</span>
                                  
                                  {/* ========== PERFIL TEXT AREA ========== */}
                                  <div className={style.perfil_texts}>
                                    <h3 className={style.perfil_title}>{user.nomeCompleto}</h3>
                                    <p className={style.perfil_subtitle}>{user.email}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                    </div>
                  </div>

                  {/* ========== USER DASHBOARD AREA ========== */}
                  <div className={style.dash_user}>
                    {/* ========== USER DASHBOARD CONTENT AREA ========== */}
                    <div className={style.user_content}>
                      <h2 className={style.title_user}>Seus Usuários</h2>

                        {/* ========== PERFIL USER AREA ========== */}
                        {users.slice(0, 3).map((user, index) => (
                          <div key={index} className="perfil-user">
                            {/* ========== PERFIL INFO AREA ========== */}
                            <div className={style.perfil_info}>
                              {/* ========== PERFIL PHOTO AREA ========== */}
                              <span className={`material-symbols-outlined ${style.icon_dash}`}>person</span>
                              
                              {/* ========== PERFIL TEXT AREA ========== */}
                              <div className={style.perfil_texts}>
                                <h3 className={style.perfil_title}>{user.nomeCompleto}</h3>
                                <p className={style.perfil_subtitle}>{user.email}</p>
                              </div>
                            </div>
                          </div>
                        ))}
  
                        {/* ========== PERFIL BTN AREA ========== */}
                        <Link href="/pages/users" className={style.btn_view_more}>
                          Veja todos
                          <span className="material-symbols-outlined">chevron_right</span>
                        </Link>
                    
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
        </section>
      </main>
     
    );
}

export { HomePage };