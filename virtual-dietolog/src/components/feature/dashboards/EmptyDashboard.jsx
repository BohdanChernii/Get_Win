import React from 'react';
import Board from "@img/icons/board.svg";
import {string} from "prop-types";

EmptyDashboard.propTypes = {
   text: string
};

function EmptyDashboard({text}) {
   return (
      <div className="board">
         <div className="board__info">
            <div className="board__img"><img src={Board} alt="board"/></div>
            <h4 className="board__title">{text}</h4>
         </div>
      </div>
   );
}

export default EmptyDashboard;