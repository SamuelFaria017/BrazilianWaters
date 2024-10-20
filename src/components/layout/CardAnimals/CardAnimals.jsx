import styles from './CardAnimals.module.css'

export function Animals() {
    return Card(
        <>
            <div className={styles.container}>
                <h1 className={styles.teste}>Dados do bicho</h1>
            </div>
        </>                  
    );
}