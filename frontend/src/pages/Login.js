import React, { useState, useEffect } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig"; 
import { signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !isAuthenticated) {
        console.log("Usuário está autenticado:", user);
        setIsAuthenticated(true);
        navigate("/painel");
      }
    });
    return () => unsubscribe(); // Limpa o observador ao desmontar o componente
  }, [navigate, isAuthenticated]);

  // Função que é chamada ao clicar no botão "Entrar" para login com email e senha
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Tentando fazer login com:", email, password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login bem-sucedido:", userCredential.user);
      setIsAuthenticated(true);
      navigate("/painel");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login: " + error.message);
    }
  };

  // Função para fazer login com Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Login com Google bem-sucedido:", result);
      setIsAuthenticated(true);
      navigate("/painel");
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      alert("Erro ao autenticar com o Google: " + error.message);
    }
  };

  // Função para fazer login com Facebook
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Login com Facebook bem-sucedido:", result);
      setIsAuthenticated(true);
      navigate("/painel");
    } catch (error) {
      console.error("Erro ao fazer login com Facebook:", error);
      alert("Erro ao autenticar com o Facebook: " + error.message);
    }
  };

  return (
    <div className="page-sign">
      <Card className="card-sign">
        <Card.Header>
          <Link to="/" className="header-logo mb-4">DATASAVVY</Link>
          <Card.Title>Área de Acesso</Card.Title>
          <Card.Text>
            Bem-vindo! Para acessar o painel você precisa fazer login. Caso não tenha acesso, solicite ao administrador.
          </Card.Text>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <div className="mb-4">
              <Form.Label>Email de Login</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Digite o seu email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Form.Label className="d-flex justify-content-between">
                Senha <Link to="">Esqueceu a senha?</Link>
              </Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Digite a sua senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="primary" className="btn-sign">Entrar</Button>

            <div className="divider"><span>Entrar com redes sociais</span></div>

            <Row className="gx-2">
              <Col>
                <Button variant="" className="btn-facebook" onClick={handleFacebookLogin}>
                  <i className="ri-facebook-fill"></i> Facebook
                </Button>
              </Col>
              <Col>
                <Button variant="" className="btn-google" onClick={handleGoogleLogin}>
                  <i className="ri-google-fill"></i> Google
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
       
      </Card>
    </div>
  );
}
