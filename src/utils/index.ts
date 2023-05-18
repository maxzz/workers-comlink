export * from './shared-blocking-call';

// some UI thread functions
export const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// single worker instance
export const workerInstance = new ComlinkWorker<typeof import("../worker")>(
    new URL("../worker", import.meta.url), { type: 'module', }
);
