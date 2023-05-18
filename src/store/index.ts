import { proxy } from "valtio";

export const appState = proxy({
    counterStr: '0', // to fit BigInt
    counterInt: 0,
});
