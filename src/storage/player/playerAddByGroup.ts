import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetBygroup } from "./playersGetByGroup";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await playersGetBygroup(group);

    const playerAlredyExists = storedPlayers.filter(player => player.name === newPlayer.name);
    
    if (playerAlredyExists.length > 0) {
      throw new AppError('Essa pessoa já foi cadastrada em um time.');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);
    
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw (error);
  }
}