import Image from "next/image";
import styles from "./FreelanceHero.module.css";

export default function FreelanceHero() {
  return (
    <div className={styles.container}>
      {/* Первый блок */}
      <div 
        className={styles.heroBlock}
        style={{ 
          backgroundImage: 'url(/layout/1.svg)',
        }}
      >
        <div className={styles.textContainer}>
          <h1 className={styles.mainTitle}>
            Фриланс-биржа нового поколения
          </h1>
          <p className={styles.subtitle}>
            Найди лучших заказчиков и исполнителей в IT. <br />
            Мы не просто еще одна биржа – мы изменим <br />
            правила игры!
          </p>
        </div>
      </div>

      {/* Второй блок */}
      <div 
        className={styles.secondBlock}
        style={{ 
          backgroundImage: 'url(/layout/2.svg)',
        }}
      >
        <h2 className={styles.secondTitle}>
          Открыт сбор заявок на перенос информации с аккаунтов с других бирж Фриланса
        </h2>
        <p className={styles.description}>
            Будет перенесено: рейтинг / отзывы / кол-во заказов / названия заказов
        </p>
        
        {/* Иконки */}
        <div className={styles.iconsContainer}>
          <Image src="/layout/fl.png" alt="fl" width={40} height={40} />
          <Image src="/layout/kwork.png" alt="kwork" width={40} height={40} />
          <Image src="/layout/habar.png" alt="habar" width={40} height={40} />
          <Image src="/layout/youdo.png" alt="youdo" width={40} height={40} />
        </div>

        {/* Навигационные кнопки */}
        <div className={styles.navigation}>
          <a>
            <Image src="/layout/prev.png" alt="Previous" width={40} height={40} />
          </a>
          <a>
            <Image src="/layout/next.png" alt="Next" width={40} height={40} />
          </a>
        </div>
      </div>
    </div>
  );
}