import { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { BiUserCircle } from "react-icons/bi";

import { Input } from "../Input";

import { updateUser } from "../../services/user-services";

import { Container } from "./styles";

const User = () => {
  const [user, setUser] = useState({});

  const [nome, setNome] = useState();
  const [senha, setSenha] = useState();
  const [sexo, setSexo] = useState();
  const [dataNasc, setDataNasc] = useState();
  const [endereco, setEndereco] = useState();
  const [email, setEmail] = useState();
  const [organizacao, setOrganizacao] = useState();

  const [visible, setVisible] = useState(false);

  const { handleSubmit } = useForm();

  function getUser() {
    const data = JSON.parse(sessionStorage.getItem("$gestao_policial$gestor"));

    setUser(data);
  }

  async function saveUser() {
    try {
      await updateUser({
        id: user.id,
        nome: nome || user.nome,
        senha,
        sexo: sexo || user.sexo,
        data_nasc: dataNasc || user.data_nasc,
        endereco: endereco || user.endereco,
        email: email || user.email,
        organizacao: organizacao || user.organizacao,
      });

      getUser();
      setVisible(false);
      toast.success("Usuario salvo com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao salvar usuário");
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container onClick={() => setVisible(true)}>
      <BiUserCircle size={32} color="white" />

      <Modal show={visible} onHide={() => setVisible(false)}>
        <Modal.Header>
          <Modal.Title>Editar usuário</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={handleSubmit(saveUser)}>
          <Modal.Body>
            <Col>
              <Input
                className="mb-2"
                label="nome"
                type="text"
                placeholder="Insira seu nome"
                required={true}
                name="nome"
                // defaultValue={user.nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                className="mb-2"
                label="sexo"
                type="text"
                placeholder="Insira seu sexo"
                required={true}
                name="sexo"
                // defaultValue={user.sexo}
                onChange={(e) => setSexo(e.target.value)}
              />
              <Input
                className="mb-2"
                label="data de nascimento"
                type="date"
                required={true}
                name="data_nasc"
                // defaultValue={user?.data_nasc?.split("T")[0]}
                onChange={(e) => setDataNasc(e.target.value)}
              />
              <Input
                className="mb-2"
                label="endereco"
                type="text"
                placeholder="Insira seu endereço"
                required={true}
                name="endereco"
                // defaultValue={user.endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <Input
                className="mb-2"
                label="Organização"
                type="text"
                placeholder="Insira sua organização"
                required={true}
                name="organizacao"
                // defaultValue={user.organizacao}
                onChange={(e) => setOrganizacao(e.target.value)}
              />
              <Input
                className="mb-2"
                label="E-mail"
                type="email"
                placeholder="Insira seu e-mail"
                required={true}
                name="email"
                // defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="mb-2"
                label="Senha"
                type="password"
                placeholder="Insira sua senha"
                required={true}
                name="senha"
                // defaultValue={user.senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={saveUser}>
              Salvar
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setVisible(false)}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default User;
