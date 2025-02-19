import React from 'react';
import InputComponent from '../ui/InputComponent'; 

export default function TelaLogin(){

    const clique= () =>{
        console.log('Clicou')
    }

    return(
        <div>
            <section className="section-img"><img src="" alt="" /></section>
        
            <section className="section-form">
                <h1>login</h1>
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
            </section>
        </div>
    )
}