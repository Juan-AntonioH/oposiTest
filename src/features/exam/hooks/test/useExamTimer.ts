import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

interface UseExamTimerParams {

    initialMinutes: number;

    autoStart?: boolean;

}

export function useExamTimer({
    initialMinutes,
    autoStart = true,
}: UseExamTimerParams) {

    const initialSeconds = initialMinutes * 60;

    const intervalRef =
        useRef<ReturnType<typeof setInterval> | null>(null);

    const [timeLeft, setTimeLeft] =
        useState(initialSeconds);

    const [isRunning, setIsRunning] =
        useState(autoStart);

    const stop = useCallback(() => {

        if (intervalRef.current) {

            clearInterval(intervalRef.current);

            intervalRef.current = null;

        }

        setIsRunning(false);

    }, []);

    const start = useCallback(() => {

        setTimeLeft(initialSeconds);

        setIsRunning(true);

    }, [initialSeconds]);

    const pause = useCallback(() => {

        setIsRunning(false);

    }, []);

    const resume = useCallback(() => {

        setIsRunning(true);

    }, []);

    const reset = useCallback((
        minutes?: number,
    ) => {

        stop();

        setTimeLeft(
            (minutes ?? initialMinutes) * 60,
        );

        setIsRunning(true);

    }, [
        initialMinutes,
        stop,
    ]);

    useEffect(() => {

        reset(initialMinutes);

    }, [
        initialMinutes,
        reset,
    ]);

    useEffect(() => {

        console.log('TIMER EFFECT', isRunning);

        if (!isRunning) {
            return;
        }

        intervalRef.current = setInterval(() => {

            setTimeLeft(previous => {

                if (previous <= 1) {

                    stop();

                    return 0;

                }

                return previous - 1;

            });

        }, 1000);

        return () => {

            if (intervalRef.current) {

                clearInterval(intervalRef.current);

                intervalRef.current = null;

            }

        };

    }, [
        isRunning,
        stop,
    ]);

    const formattedTime = useMemo(() => {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;

        return `${minutes
            .toString()
            .padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`;

    }, [timeLeft]);

    return {

        timeLeft,

        formattedTime,

        isRunning,

        start,

        pause,

        resume,

        stop,

        reset,

    };

}