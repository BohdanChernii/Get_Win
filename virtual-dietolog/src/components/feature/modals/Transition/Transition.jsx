import React from "react";
import {Grow} from "@material-ui/core";

export const  Transition = React.forwardRef(function Transition(props, ref) {
   return <Grow in={props.open} ref={ref}  {...props} />;
});