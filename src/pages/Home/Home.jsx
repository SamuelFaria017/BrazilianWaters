import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

import { Header } from '../../components/layout/Header/Header'
import { Footer } from '../../components/layout/Footer/Footer'

import animals_example from '../../assets/imgs/Animals_example.jpg'
import coral_example from '../../assets/imgs/Coral_example.jpg'

import { BackgroundVideoComponent } from '../../components/layout/BackgroundVideoComponent/BackgroundVideoComponent';
import styles from './Home.module.css'

function ExampleCard({ title, image, description }) {
    return (
        <div className={styles.exampleContainer}>
            <img src={image} alt={title} className={styles.exampleImg} />
            <h1 className={styles.exampleName}>{title}</h1>
            <span className={styles.exampleDescription}>{description}</span>
        </div>
    );
}

export function Home() {
    const [search, setSearch] = useState('');

    const handleSubmit = () => {
        // Ações a serem realizadas na submissão do formulário.
    };

    return (
        <>
            <Header />

            <BackgroundVideoComponent style={styles.background} source='../../../src/assets/videos/Background_home.mp4'>
                <div className={styles.container}>
                    <div className={styles.search_container}>
                        <h1 className={styles.title}>BRAZILIAN WATERS</h1>
                        <h4 className={styles.description}>Os animais, corais, micro-organismos marinhos do Brasil.</h4>
                        <form
                            className={styles.search}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type='text'
                                placeholder='Pesquisar...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles.search_txt}
                            />
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={styles.search_bnt}
                            >
                                <IoSearchOutline size='40' />
                            </button>
                        </form>
                    </div>
                </div>
            </BackgroundVideoComponent>

            <div className={styles.underContainer}>
                <div className={styles.divisionContainer}>
                    <h1 className={styles.divisionTitle}>Mas então, o que é biologia marinha?</h1>
                    <span className={styles.divisionDescription}>A Biologia Marinha é uma área de estudo que abrange a vida nos oceanos,
                        mares, estuários e outras massas de água salgada. Os biólogos marinhos investigam e exploram a vida marinha,
                        desde organismos microscópicos até grandes animais, como tubarões e baleias.
                    </span>
                </div>

                <ExampleCard
                    image={coral_example}
                    title="CORAL-DE-FOGO"
                    description="Conhecido vulgarmente como coral-de-fogo, suas células urticantes, os nematocistos, provocam, em pouco tempo, queimaduras intensas
                        e dores em mergulhadores que os tocam. As colônias têm tonalidades de mostarda a amarronzado e as extremidades dos ramos são esbranquiçadas."
                />
                <ExampleCard
                    image={animals_example}
                    title="PIRARUCU"
                    description="É um peixe encontrado geralmente na bacia Amazônica, nos territórios do Brasil, Peru e Guiana, mais especificamente nas áreas de várzea,
                        onde as águas são mais calmas. Costuma viver em lagos e rios de águas claras e ligeiramente alcalinas, com temperaturas que variam de 24 a 37 °C,
                        não sendo encontrado em zona de fortes correntezas ou em águas ricas em sedimentos."
                />
            </div>

            <Footer />
        </>
    );
}