import * as React from "react";
import {RouteComponentProps} from "react-router";

export interface MenuConfigType {
  path:string;
  component?:React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  title:string|undefined;
  icon?:string;
  permission?:boolean;
  children?:MenuConfigType[];
}

