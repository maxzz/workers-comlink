/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;

//import { blockingFunc } from "../utils"; // <- this call will cause endless loading loop
import { blockingCall } from "../utils/shared-blocking-call";

export const someRPCFunc = () => {
    console.log('worker blockingCall: start');
    blockingCall();
    console.log('worker blockingCall: done');
};

/////////////

//export { appState as appStateWorker } from "../store";

import { appState as appStateWorkerProxy } from "../store";
import { snapshot } from "valtio";

export const appStateWorker = snapshot(appStateWorkerProxy);
//export const appStateWorker = appStateWorkerProxy;
