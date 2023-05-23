import AsyncStorage from "@react-native-async-storage/async-storage";

import { playersGetBygroup } from "./playersGetByGroup";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetBygroup(group);

    const filterd = storage.filter(player => player.name !== playerName);

    const players = JSON.stringify(filterd);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    throw error;
  }
}