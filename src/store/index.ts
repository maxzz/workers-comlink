import { proxy } from "valtio";

export const appState = proxy({
    counter: '0',
});
