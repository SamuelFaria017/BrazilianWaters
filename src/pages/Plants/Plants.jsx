import React from 'react';
import { Header } from '../../components/layout/Header/Header'
import { Footer } from '../../components/layout/Footer/Footer'
import styles from './Plants.module.css';
import { ModeloP } from '../../components/compoBasePlan/modelo';
import dados from './dados.json';

export function Plants(){

        return (
            <>
            <Header /> 
            <div className={styles.orgaCentral}>
                {dados.map((item) => (
                 <ModeloP key={item.id} imageSrc={item.imageSrc} text={item.text}/>))}
            </div>
            <Footer />
            </>
        )
    }