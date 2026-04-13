import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: keep-all;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  padding-right: 20px;
  white-space: nowrap;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  padding-right: 20px;
  white-space: nowrap;
  text-align: ${(props) => (props.aligncenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

const Grid = ({ users, setUsers, setOnEdit, getUsers }) => { 

  const handleEdit = (item) => { 
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        toast.success(data);
        getUsers();
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>User</Th>
          <Th onlyWeb>Data de Nascimento</Th>
          <Th onlyWeb>Password</Th>
          <Th>Editar</Th>
          <Th>Excluir</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="15%">{item.nome}</Td>
            <Td width="25%">{item.email}</Td>
            <Td width="15%">{item.user}</Td>
            <Td width="15%" onlyWeb>{formatDate(item.data_nascimento)}</Td>
            <Td width="15%" onlyWeb>{item.password}</Td>
            <Td aligncenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} /> 
            </Td>
            <Td aligncenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;