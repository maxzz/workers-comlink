import { useState, useCallback, ButtonHTMLAttributes } from "react";
import { blockingCall, randomIntFromInterval, workerInstance } from "./utils";
import { useSnapshot } from "valtio";
import { appState } from "./store";

function Button({ ...rest }: ButtonHTMLAttributes<HTMLElement>) {
    return (
        <button className="px-2 py-1.5 bg-primary-300 border-primary-600 border rounded shadow active:scale-y-95" {...rest} />
    );
}

function StateDisplay() {
    const { counter } = useSnapshot(appState);
    return (
        <div className="text-2xl">
            {counter}
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
                <Button onClick={workerCall}>Worker Call</Button>
                <Button onClick={normalFuncCall}>Main Thread Call</Button>
                <Button onClick={randomIntHandler}>Random Int {random}</Button>
            </section>

            <div className=""></div>
        </div>
    );
}
