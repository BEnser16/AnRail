import store, { RootState } from '../Storage/Redux/store';

export const fetchCurrentPetState = () => {
    const currentState: RootState = store.getState();
    const currentPetState = currentState.currentPetStore.CurrentPetState;

    return currentPetState;
}


