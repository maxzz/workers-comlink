import { snapshot } from "valtio";
import { appState } from "../store";

export const blockingCall = () => {
    console.log('blockingCall start');

    appState.counterStr = '0';

    // const a = new Array(100_000_000)
    const a = new Array(100_000);
    const b = [...a].map((item, index) => {
        //console.log('index', index);
        return index;
    })
        .reduce((acc, cur, idx) => {
            if (idx % 10000 === 0) {
                console.log('idx [%d] acc [%d]', idx, acc);
                
                appState.counterStr = acc.toString();
                //console.log('acc', acc);
            }
            return BigInt(acc) + BigInt(cur);
        }, BigInt(0));

    console.log('blockingCall done', b);
    console.log('blockingCall shapshot', snapshot(appState).counterStr);
};
