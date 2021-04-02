import React from "react";
import  styles from "./styles.module.scss"

interface PropsType
{
  iconClass:string;
  fill?:string;
  style?: React.CSSProperties;
}
class Index extends React.Component<PropsType>{
  constructor(props: Readonly<PropsType> | any) {
    console.log(props)
    super(props);
    console.log(props)
  }

  render() {
    return (

          <svg className={styles["svg-class"]} >
            <use xlinkHref={"#icon-"+this.props.iconClass} fill={this.props.fill||'white'}/>
          </svg>

    );
  }
}

export default Index;