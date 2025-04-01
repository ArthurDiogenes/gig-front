import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TermosCondicoes.module.css";

const TermosCondicoes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate("/cadastro")}>⬅ Voltar </button>
      <h1>Termos e Condições de Uso do Gig</h1>
      
      <section>
        <h2>1. Introdução</h2>
        <p>
          Bem-vindo ao Gig! Estes Termos e Condições de Uso ("Termos") estabelecem as regras e diretrizes para o uso da plataforma Gig, um sistema online voltado para a intermediação entre bandas musicais e contratantes, tais como indivíduos, estabelecimentos e organizadores de eventos. Ao utilizar o Gig, o usuário concorda integralmente com estes Termos. Caso não concorde, recomenda-se que cesse imediatamente o uso da plataforma.
        </p>
      </section>
      
      <section>
        <h2>2. Definições</h2>
        <p>
          Para melhor compreensão destes Termos, consideram-se as seguintes definições:
        </p>
        <ul>
          <li><strong>Gig</strong>: Plataforma digital para contratação de bandas.</li>
          <li><strong>Usuário</strong>: Qualquer pessoa que utilize a plataforma.</li>
          <li><strong>Contratante</strong>: Pessoa física ou jurídica que deseja contratar um artista ou banda musical.</li>
          <li><strong>Banda</strong>: Grupo musical ou artista individual que oferece seus serviços por meio da plataforma.</li>
          <li><strong>Evento</strong>: Qualquer atividade na qual uma banda seja contratada por meio do Gig.</li>
        </ul>
      </section>
      
      <section>
        <h2>3. Cadastro e Elegibilidade</h2>
        <p>
          3.1. Para utilizar o Gig, o usuário deve se cadastrar, fornecendo informações verdadeiras e atualizadas.
        </p>
        <p>
          3.2. O usuário deve ter pelo menos 18 anos ou estar devidamente autorizado por um responsável legal.
        </p>
        <p>
          3.3. O Gig pode suspender ou cancelar contas que forneçam informações falsas ou que violem estes Termos.
        </p>
      </section>
      
      <section>
        <h2>4. Funcionamento da Plataforma</h2>
        <p>
          4.1. O Gig atua apenas como intermediador entre bandas e contratantes, facilitando a comunicação e negociação entre as partes.
        </p>
        <p>
          4.2. O Gig não se responsabiliza pela qualidade das apresentações, pelo cumprimento de acordos ou por qualquer evento que ocorra fora da plataforma.
        </p>
      </section>
      
      <section>
        <h2>5. Obrigações dos Usuários</h2>
        <p>
          5.1. Os contratantes devem fornecer informações claras sobre o evento, incluindo data, local e demais requisitos.
        </p>
        <p>
          5.2. As bandas devem garantir a veracidade das informações prestadas em seus perfis, incluindo disponibilidade, repertório e valores.
        </p>
      </section>
      
      <section>
        <h2>6. Limitação de Responsabilidade</h2>
        <p>
          6.1. O Gig não é responsável por quaisquer danos, perdas ou conflitos decorrentes de negociações feitas na plataforma.
        </p>
        <p>
          6.2. A plataforma não garante a disponibilidade contínua do serviço e pode ser desativada a qualquer momento sem aviso prévio.
        </p>
      </section>
      
      <section>
        <h2>7. Privacidade e Dados Pessoais</h2>
        <p>
          7.1. O Gig coleta e processa dados conforme sua Política de Privacidade.
        </p>
      </section>
      
      <section>
        <h2>8. Alterações nos Termos</h2>
        <p>
          8.1. O Gig pode modificar estes Termos a qualquer momento, sendo responsabilidade do usuário verificar atualizações.
        </p>
      </section>
      
      <section>
        <h2>9. Disposições Finais</h2>
        <p>
          9.1. Qualquer questão não prevista nestes Termos será resolvida conforme a legislação vigente.
        </p>
      </section>
    </div>
  );
};

export default TermosCondicoes;
