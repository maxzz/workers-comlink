import { useState, useCallback, ButtonHTMLAttributes } from "react";
import { blockingCall, fancyTimeFormat, randomIntFromInterval, workerInstance } from "./utils";
import { useSnapshot } from "valtio";
import { appState } from "./store";
import { useInterval } from "./hooks/useInterval";
import { appStateWorker } from "./worker";

function Button({ ...rest }: ButtonHTMLAttributes<HTMLElement>) {
    return (
        <button className="px-2 py-1.5 bg-primary-300 border-primary-600 border rounded shadow active:scale-y-95" {...rest} />
    );
}

function StateDisplay() {
    const { counterStr, counterInt } = useSnapshot(appState);
    useInterval(() => appState.counterInt++, 1000);

    const { counterStr: counterStrWorker } = useSnapshot(appStateWorker);
    return (
        <div className="text-2xl grid grid-cols-[auto,minmax(10ch,1fr)] gap-x-4 gap-y-4 items-center">

            <div className="w-min text-sm">UI thread counter</div>
            <div className="">
                {counterStr}
            </div>

            <div className="w-min text-sm">Worker thread counter</div>
            <div className="">
                {counterStrWorker}
            </div>

            <div className="">Time</div>
            <div className="">
                {fancyTimeFormat(counterInt)}
            </div>
            
        </div>
    );
}

export function App() {
    const [random, setRandom] = useState<number>(0);

    const workerCall = useCallback(async () => {
        await workerInstance.someRPCFunc();
    }, []);

    const normalFuncCall = useCallback(() => {
        blockingCall();
    }, []);

    const randomIntHandler = useCallback(() => {
        setRandom(randomIntFromInterval(1, 100));
    }, []);

    return (
        <div className="h-screen grid grid-rows-[1fr,auto,1fr] place-items-center text-primary-900 bg-primary-500">

            {/* <div className="relative">
                <div className="absolute left-0 top-[10vh]">
                    <StateDisplay />
                </div>
            </div> */}

            <StateDisplay />

            <section className="flex items-center space-x-4">
                <Button onClick={workerCall}>Worker Thread Call</Button>
                <Button onClick={normalFuncCall}>UI Thread Call</Button>
                <Button onClick={randomIntHandler}>Random Int {random}</Button>
            </section>

            <div className=""></div>
        </div>
    );
}
