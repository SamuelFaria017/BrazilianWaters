import { Header } from '../../components/layout/Header/Header'
import { Footer } from '../../components/layout/Footer/Footer'
import { Card } from "../../components/layout/CardAnimals/CardAnimals";

import styles from './Animals.module.css';

export function Animals() {
    return (
        <>
            <Header /> 
            <Card />
            <Footer />
        </>                  
    );
}
