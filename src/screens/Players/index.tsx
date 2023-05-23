import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Input } from "@components/Input";
import { Button } from '@components/Button';
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Loading } from '@components/Loading';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from '@components/PlayerCard';

import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { PlayersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';

import { Container, Form, HeaderList, PlayersAmount } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adiconar a um time.')
    }

    const newPlayer = {
      name: newPlayerName,
      team: team
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerInputRef.current?.blur();
      
      setNewPlayerName('');
      await fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message);
      } else {
        Alert.alert('Nova Pessoa', 'Erro ao tentar adicionar.')
      }
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);

      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível remover essa pessoa.');
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Erro ao tentar remover o grupo.');
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remover Grupo',
      'Deseja remover o grupo?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()}
      ]
    );
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTeam = await PlayersGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível listar as pessoas do time.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team])
  
  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione os participantes e separe os times" />

      <Form>
        <Input 
          inputRef={newPlayerInputRef} 
          placeholder="Nome da pessoa" 
          autoCorrect={false} 
          value={newPlayerName} 
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer} // Permite executar a função de adicionar os player através do teclado do celular;
          returnKeyType='done' // informa qual a tecla que irá executar a função onSubmitEditing;
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
      </Form>

      <HeaderList>
        <FlatList
          horizontal
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item} 
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <PlayersAmount>{players.length}</PlayersAmount>
      </HeaderList>

      {isLoading ? <Loading /> : (
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard name={item.name} onRemove={() => handlePlayerRemove(item.name)} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message='Não há jogadores nesse time' />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
        />
      )}

      <Button title='Remover turma' type='SECONDARY' onPress={handleRemoveGroup}/>
      
    </Container>
  )
}