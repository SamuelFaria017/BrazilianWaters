import styles from './Animals.module.css';

export function Animals() {
    return (
        <div className={styles.outerDiv}>
            <div className={styles.innerDiv}>
                Conteúdo da div interna
            </div>
        </div>
    );
}
