import React from 'react';
import Logo from '../assets/logo.png'

const NavBar = () => {
    return (
        <nav className=" text-black p-7">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl">
              {/* Insérez votre logo ou élément à gauche ici si nécessaire */}
            </div>
            <div className="text-4xl font-bold ">
              EPIC <img src={Logo} alt="Logo" className="inline h-14"/>

            </div>
            <div className="text-lg">
              {/* Insérez des liens ou éléments à droite ici si nécessaire */}
            </div>
          </div>
        </nav>
      );
    };
export default NavBar;