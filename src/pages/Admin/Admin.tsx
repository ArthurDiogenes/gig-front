import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./EditarBanda.module.css";
import { getUser } from "@/services/users";
import EditBandForm from "./EditBandForm";
import EditVenueForm from "./EditVenueForm";
import BandContracts from "./BandContracts";
import VenueContracts from "./VenueContracts";

type SidebarOption = "perfil" | "contratos";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<SidebarOption>("perfil");
  const user = getUser();

  const sidebarOptions = [
    { id: "perfil", label: "Perfil", icon: "👤" },
    { id: "contratos", label: "Contratos", icon: "📋" },
  ];

  const renderPerfilContent = () => {
    if (user?.role === "band") {
      return <EditBandForm />;
    } else {
      return <EditVenueForm />;
    }
  };

  const renderContratosContent = () => {
    if (!user) {
      return <div>Carregando...</div>;
    }

    if (user.role === "band") {
      return <BandContracts id={user.id}/>;
    } else {
      return <VenueContracts id={user.id}/>;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "perfil":
        return renderPerfilContent();
      case "contratos":
        return renderContratosContent();
      default:
        return renderPerfilContent();
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2>{user?.role === 'band' ? 'Painel da Banda' : 'Painel do Estabelecimento'}</h2>
            </div>
            <nav className={styles.sidebarNav}>
              {sidebarOptions.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.sidebarOption} ${
                    activeSection === option.id
                      ? styles.sidebarOptionActive
                      : ""
                  }`}
                  onClick={() => setActiveSection(option.id as SidebarOption)}
                >
                  <span className={styles.sidebarOptionIcon}>
                    {option.icon}
                  </span>
                  <span className={styles.sidebarOptionLabel}>
                    {option.label}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className={styles.content}>{renderContent()}</div>
        </div>
      </main>
    </>
  );
};

export default Admin;
