import React from 'react';
import styles from './EditProfile.module.css'; 

const EditProfile = () => {
  return (
    <div className={styles['edit-profile-container']}>
      <h2 className={styles['edit-profile-title']}>Editar Perfil</h2>

      <form className={styles['edit-profile-form']}>
        <label htmlFor="name" className={styles['edit-profile-label']}>Nome*</label>
        <input id="name" type="text" placeholder="Nome" className={styles['edit-profile-input']} />

        <label htmlFor="email" className={styles['edit-profile-label']}>Email*</label>
        <input id="email" type="email" placeholder="nome@email.com" className={styles['edit-profile-input']} />

        <label htmlFor="desc" className={styles['edit-profile-label']}>Descrição</label>
        <textarea id="desc" rows={4} placeholder="Descrição..." className={styles['edit-profile-textarea']} />

        <h3 className={styles['edit-profile-label']} style={{ marginTop: '30px' }}>Redes Sociais</h3>
        <label htmlFor="social">Link</label>
        <div className={styles['edit-profile-row']}>
          <input id="social" type="url" placeholder="URL" className={styles['edit-profile-input']} />
          <button type="button" className={styles['edit-profile-button-add']}>add</button>
        </div>

        <h3 className={styles['edit-profile-label']} style={{ marginTop: '30px' }}>Localidade</h3>
        <label htmlFor="cidade">Cidade</label>
        <input id="cidade" type="text" placeholder="Cidade" className={styles['edit-profile-input']} />

        <label htmlFor="tipo">Tipo</label>
        <input id="tipo" type="text" placeholder="Ex: restaurante" className={styles['edit-profile-input']} />

        <div className={styles['edit-profile-buttons']}>
          <button type="submit" className={styles['edit-profile-button-save']}>salvar</button>
          <button type="button" className={styles['edit-profile-button-cancel']}>cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;




