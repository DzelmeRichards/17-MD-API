import { FC } from 'react';
import styles from './button.module.scss';

type ButtonProps = {
  text: string
  onClick?: () => void

}

const Button: FC<ButtonProps> = ({ text, onClick }) => (

  <button className={styles.button} onClick={onClick}>
    {text}
  </button>

);

export default Button;
