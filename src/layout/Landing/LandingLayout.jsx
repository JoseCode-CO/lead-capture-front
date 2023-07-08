import s from "./LandingLayout.module.scss";

const LandingLayout = ({ children }) => {
  return (
    <div className={s.landingLayoutContainer}>
      <div className={s.landingLayoutContent}>{children}</div>
    </div>
  );
};

export default LandingLayout;
