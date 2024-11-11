import styles from './ModeloP.module.css'

export function ModeloP() {
   
   return (
      <>

      <div className={styles.Compac}>

      <img src={imageSrc} className={styles.imgVari} />

      <h2 className={styles.titulo}>{titulo}</h2>
      <p className={styles.txtvari}>{text}</p>

    </div>

      </>
)
}
