import { useCallback, useState  } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import { Container } from './styles';


export function Groups() {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handlerNewGroup() {
    navigation.navigate('new');
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();
      setGroups(data);

      setIsLoading(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as turmas');
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []))
  
  return (
    <Container>
      <Header />

      <Highlight
        title='Turmas'
        subtitle='Jogue com sua turma'
      />

      {isLoading ? <Loading /> : (  
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => <ListEmpty message='Cadastre as turmas' />}
        />
      )}

      <Button title='Criar nova turma' onPress={handlerNewGroup} />
    </Container>
  );
}


