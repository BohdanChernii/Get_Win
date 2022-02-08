import React from "react";
import {menuLinks} from "@assets/helpers/menu.jsx";
import {func, string} from "prop-types";

AppContent.propTypes = {
   menuIdx: string,
   setMenuIdx: func
};

function AppContent({menuIdx, setMenuIdx}) {
   const menuLink = menuLinks.find(link => link.id.toString() === menuIdx.toString())
   const Component = React.createElement(menuLink.component.type, {
      menuIdx,
      setMenuIdx
   })
   return (
      <>
         {Component}
      </>
   
   );
}

export default AppContent;
