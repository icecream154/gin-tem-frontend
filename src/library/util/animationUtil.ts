export function updateValByStep(initVal: number, endVal: number, updateValFunc: (newVal: number) => void,
                                stepCount: number, duration: number, leftStepCount: number) {
    setTimeout(() => {
        let doneStepCount = stepCount - leftStepCount;
        let cV = initVal + doneStepCount * (endVal - initVal) / stepCount;
        console.log("stepCount: " + stepCount + " leftStepCount: " + leftStepCount +
            " doneStepCount: " + doneStepCount + " cV: " + cV);
        updateValFunc(cV)
        if (leftStepCount === 0) return;
        updateValByStep(initVal, endVal, updateValFunc, stepCount, duration, leftStepCount - 1);
    }, duration / stepCount)
}