import styles from './BackgroundVideoComponent.module.css';

export function BackgroundVideoComponent({style, children, source}) {
  return (
    <div className={styles.backgroundVideoContainer + ' ' + style}>
      <video className={styles.backgroundVideo} autoPlay loop muted>
        <source src={source} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}