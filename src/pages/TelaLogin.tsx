import InputComponent from '../ui/InputComponent';
import ImgCapa from '/images/img-login.png'

import styles from './TelaLogin.module.css';
import Button from '../ui/Button';

export default function TelaLogin(){

    const clique= () =>{
        console.log('Clicou')
    }

    return(
        <div className={styles.container}>
            <section className={styles.sectionImg}><img className={styles.img} src={ImgCapa} alt="" /></section> 
                   
            <section className={styles.sectionForm}>
                <div className={styles.login}>
                    <h1 className={styles.title}>login</h1>
                    <form action="">
                        <InputComponent 
                        type='email'
                        name='email'
                        placeholder='Digite seu email'
                        onClick={clique}
                        />
                        <InputComponent
                        type='password'
                        name='password'
                        placeholder='Digite sua senha'
                        onClick={clique}
                        />
                    </form>
                    <Button type='submit'>Entrar</Button>
                    <h4 className={styles.esqueceu_senha}>Esqueceu a senha?</h4>
                    <h3 className={styles.cadastro}>Não tem conta? <a href="">Cadastre-se</a></h3>
                </div>
            </section>
        </div>
    )
}