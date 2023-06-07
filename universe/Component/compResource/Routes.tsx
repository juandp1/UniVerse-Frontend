import React from "react";
import * as Faicon from 'react-icons/fa';
import * as Aiicon from 'react-icons/ai';
import  style from "/styles/NavBarsStyles.module.css";

const sizeIcon="25px"
const colorIcon="#1D3752"
const className=style.button_Lateral_NavBar

export const Routes =[

    {
        title:'Inicio',
        path:'/HomeComunidad',
        icon: <Aiicon.AiFillHome size={"45px"} color={colorIcon}/>,
        cName:className
    },
    {
        title:'Enciclopedia',
        path:'/Enciclopedia',
        icon: <Faicon.FaBookOpen size={sizeIcon} color={colorIcon}/>,
        cName:className
    },
    {
        title:'Foro',
        path:'/Foro',
        icon: <Faicon.FaQuestionCircle size={sizeIcon} color={colorIcon}/>,
        cName:className
    },
    {
        title:'Reuniones',
        path:'/Reuniones',
        icon: <Aiicon.AiFillSchedule size={sizeIcon} color={colorIcon}/>,
        cName:className
    },
]