import s from './Button.module.scss';
import cx from 'classnames';

const Button = ({
  type = 'button',
  onClick,
  disabled,
  btnClass = !1,
  className,
  children,
  href,
  target,
  rel,
  style,
  addClass,
  download
}) => {
  if (href) {
    return (
      <a
        style={style}
        className={cx(btnClass && s.btn, s[className], addClass)}
        href={href}
        target={target}
        rel={rel}
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={style}
      className={cx(btnClass && s.btn, s[className], addClass)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
