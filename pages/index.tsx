import { NextPage } from 'next';
import styles from '@styles/Home.module.scss';
import GameOfLife from '@components/GameOfLife';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <GameOfLife />
    </div>
  );
};

export default Home;
