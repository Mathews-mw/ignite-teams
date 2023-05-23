import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Input } from "@components/Input";
import { AppError } from "@utils/AppError";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { groupCreate } from "@storage/group/groupCreate";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, SetGroup] = useState('');

  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Erro ao criar grupo', 'Informe o nome da turma.');
      }
     
      await groupCreate(group);
      navigation.navigate('players', {group});
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Erro ao criar grupo', error.message);
      } else {
        Alert.alert('Erro ao criar grupo', 'Não foi possível criar um novo grupo.')
        console.log(error);
      }
    }
  }
  
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight title="Nova turma" subtitle="Crie uma turma nova para adicionar pessoas" />

        <Input placeholder="Nome da turma" onChangeText={value => SetGroup(value)} />

        <Button title="criar" style={{ marginTop: 20 }} onPress={handleNewGroup} />
      </Content>
    </Container>
  );
}