/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;

export { appState as appStateWorker } from "../store";

//import { blockingFunc } from "../utils"; // <- this call will cause endless loading loop
import { blockingCall } from "../utils/shared-blocking-call";

export const someRPCFunc = () => {
    console.log('worker blockingCall: start');
    blockingCall();
    console.log('worker blockingCall: done');
};
