import { Route, Routes } from "react-router";
import TelaLogin from "../pages/TelaLogin/TelaLogin";
import TelaCadastro from "../pages/TelaCadastroBanda/TelaCadastroBanda";
import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha";
import RecuperarSenha from "../pages/RecuperarSenha/RecuperarSenha";
import Home from "../pages/Home/Home";
import Mensagens from "../pages/Mensagens/Mensagens";
import ProtectedRoute from "./ProtectedRoute";
import TelaGenero from "../pages/TelaGenero/TelaGenero";
import BandProfile from "../pages/BandProfile/BandProfile";
import PerfilEstabelecimento from "../pages/PerfilEstabelecimento/PerfilEstabelecimento";
import Termos from "../pages/TermosCondicoes/TermosCondicoes";
import TelaCadastroEstabelecimento from "../pages/TelaCadastroEstabelecimento/TelaCadastroEstabelecimento";
import EditarBanda from "../pages/EditarBanda/EditarBanda";
import Pesquisa from "../pages/Pesquisa/Pesquisa";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<TelaLogin />} />
      <Route path="/cadastro" element={<TelaCadastro/>}/>
      <Route path="/cadastro-estabelecimento" element={<TelaCadastroEstabelecimento/>}/> 
      <Route path="/redefinirSenha" element={<RedefinirSenha/>}/>
      <Route path="/recuperarSenha" element={<RecuperarSenha/>}/>
      <Route path="/genero/:genero" element={<TelaGenero/>}/>
      <Route path="/pesquisa" element={<Pesquisa/>}/>

      <Route path="/bandas/:id" element={<BandProfile/>}/>
      <Route path="/perfil-estabelecimento" element={<PerfilEstabelecimento/>}/>
      <Route path="/termos" element={<Termos/>}/>
      <Route path="/meu-perfil" element={<EditarBanda/>}/>

      <Route path="/mensagens" element={<Mensagens/>}/>

      <Route element={<ProtectedRoute/>}>
      </Route>
    </Routes>
  );
}