import styles from './style.module.scss';

const Example = ({ children }) => (
  <button className={styles.example} type="button">
    {children}
  </button>
);

export default Example;
