import { useEffect, useState } from 'react';

import Image from 'next/image'
import style from './sidenav.module.css';
import 'material-symbols';
import Link from 'next/link';

const Sidenav = () =>{

    const [activeLink, setActiveLink] = useState<string | null>(null);

    const selectLink = (link: string) => {
        setActiveLink(link);
    };

    useEffect(() => {
        // Verifique a URL da página atual e defina o link ativo
        const path = window.location.pathname;
        if (path === '/') {
            setActiveLink('home');
        } else if (path === '/pages/users') {
            setActiveLink('usuarios');
        } else {
            setActiveLink(null);
        }
    }, []);
    
    return (
        <section id={style.sidenav}>

            <div className={style.sidenav_container}>
                {/* =========== LOGO AREA =========== */}
                <a href="#" className={style.logo}>
                    <span>Control Manager</span>
                </a>

                {/* =========== SIDE-MENU TOP AREA =========== */}
                <ul className={style.sideMenu}>
                    {/* =========== MENU LINKS AREA =========== */}
                    <li className={`${style.menuItens} ${activeLink === 'home' ? style.menuItens_active : ''}`}>
                        <Link href="/" 
                        className={`${style.menuLinks} ${activeLink === 'home' ? style.menuLinks_active : ''}`}
                        onClick={() => selectLink('home')}
                        >
                            <span className={`material-symbols-outlined ${style.icon} 
                            ${activeLink === 'home' ? style.icon_active : ''}`}>
                                dashboard
                            </span>
                            <span className="text">Home</span>
                        </Link>
                    </li>
                    <li className={`${style.menuItens} ${activeLink === 'usuarios' ? style.menuItens_active : ''}`}>
                        <Link href="/pages/users" 
                        className={`${style.menuLinks} 
                        ${activeLink === 'usuarios' ? style.menuLinks_active : ''}`}
                        onClick={() => selectLink('usuarios')}>
                            <span className={`material-symbols-outlined ${style.icon} 
                            ${activeLink === 'usuarios' ? style.icon_active : ''}`}>
                                supervisor_account
                            </span>
                            <span className="text">Usuários</span>
                        </Link>
                    </li>
                </ul>

                {/* =========== SIDE-MENU AREA =========== */}
                <ul className={style.sideMenu_down}>
                    {/* =========== MENU LINKS AREA =========== */}
                    <li className={`${style.menuItens} ${activeLink === 'configuracao' ? style.menuItens_active : ''}`}>
                        <a href="#" 
                        className={`${style.menuLinks} 
                        ${activeLink === 'configuracao' ? style.menuLinks_active : ''}`}
                        onClick={() => selectLink('configuracao')}>
                            <span className={`material-symbols-outlined ${style.icon} 
                            ${activeLink === 'configuracao' ? style.icon_active : ''}`}>
                                settings
                            </span>
                            <span className="text">Configurações</span>
                        </a>
                    </li>
                    <li className={`${style.menuItens} ${activeLink === 'sair' ? style.menuItens_active : ''}`}>
                        <a href="#"  className={`${style.menuLinks} 
                        ${activeLink === 'sair' ? style.menuLinks_active : ''}`}
                        onClick={() => selectLink('sair')}>
                            <span className={`material-symbols-outlined ${style.icon} 
                            ${activeLink === 'sair' ? style.icon_active_logout : ''}`}>
                                logout
                            </span>
                            <span className="text">Sair</span>
                        </a>
                    </li>
                </ul>

                <div className={style.side_footer}>
                    <div className={style.side_footer_content}>
                        <p className={style.title_footer}>
                            Controle fácil e eficiente dos usuários!
                        </p>
                    </div>
                </div>
            </div>
           
          
        </section>

    )

}

export { Sidenav }