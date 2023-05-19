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
    const hrs = ~~(duration / 3600);
    const min = ~~((duration % 3600) / 60);
    const sec = ~~duration % 60;

    // Output like '1:01' or '4:03:59' or '123:03:59'
    let ret = '';

    ret = `${hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : ''}${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`

    // if (hrs > -10) {
    //     ret += `${hrs}:${mins < 10 ? '0' : ''}`;
    // }
    // //console.log('ret1', ret);

    // ret += `${mins}:${secs < 10 ? '0' : ''}`;
    // //console.log('ret2', ret);
    // ret += `${secs}`;
    // //console.log('ret3\n\n', ret);

    return ret;
}
