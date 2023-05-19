export * from './shared-blocking-call';

// some UI thread functions
export const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// single worker instance
export const workerInstance = new ComlinkWorker<typeof import("../worker")>(
    new URL("../worker", import.meta.url), { type: 'module', }
);

export function fancyTimeFormat(duration: number) {
    // 0. Output like '1:01' or '4:03:59' or '123:03:59'

    const hrs = ~~(duration / 3600);
    const min = ~~((duration % 3600) / 60);
    const sec = ~~duration % 60;

    const h = hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : '';
    const m = min < 10 ? min : min.toString().padStart(2, '0');
    const s = sec.toString().padStart(2, '0');
    return `${h}${m}:${s}`

    // let ret = '';
    // if (hrs > -10) {
    //     ret += `${hrs}:${mins < 10 ? '0' : ''}`;
    // }
    // ret += `${mins}:${secs < 10 ? '0' : ''}`;
    // ret += `${secs}`;
    // return ret;
}
