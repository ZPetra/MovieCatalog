import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <MainNavigation paths={props.paths}></MainNavigation>
      <div className={classes.layoutContent}>{props.children}</div>
    </div>
  );
};

export default Layout;
