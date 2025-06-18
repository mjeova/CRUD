import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-word;
`;

const Thead = styled.thead``;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: start;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.$onlyWeb && "display: none;"}
  }
`;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.$alignCenter ? "center" : "start")};
  width: ${(props) => (props.$width ? props.$width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.$onlyWeb && "display: none;"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    setOnEdit(null);
  };

  if (!users.length) {
    return <p>Nenhum usuário cadastrado.</p>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th $onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>

      <tbody>
        {users.map((item) => (
          <Tr key={item.id}>
            <Td $width="30%">{item.nome}</Td>
            <Td $width="30%">{item.email}</Td>
            <Td $width="20%" $onlyWeb>
              {item.fone}
            </Td>
            <Td $alignCenter $width="5%">
              <FaEdit onClick={() => handleEdit(item)} style={{ cursor: "pointer" }} />
            </Td>
            <Td $alignCenter $width="5%">
              <FaTrash
                onClick={() => handleDelete(item.id)}
                style={{ cursor: "pointer", color: "red" }}
              />
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Grid;
