import { useLayoutEffect, useRef } from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';

// Utils
import { ToastPayload, useToastContext } from '@/contexts/ToastContext';


type ToastProps = {
    id: string,
    toast: ToastPayload,
    onOpenChange: (open: boolean) => void
}

export default function AnimatedToast(props: ToastProps) {
    const ref = useRef<HTMLLIElement>(null);
    const { sortToasts, toastElementsMapRef } = useToastContext();
    const toastElementsMap = toastElementsMapRef.current;

    useLayoutEffect(() => {
        if (!ref.current) return;
        toastElementsMap.set(props.id, ref.current);
        sortToasts();
    }, [props.id, sortToasts, toastElementsMap]);

    return (
        <ToastPrimitive.Root
            // {...toastProps}
            ref={ref}
            // type={props.toast.type}
            duration={props.toast.duration}
            className="absolute bottom-4 right-4 left-4 transition duration-400 rounded-sm ToastRoot"
            onOpenChange={props.onOpenChange}
        >
            <div className={'group relative bg-background rounded-sm shadow-xl px-4 py-3 border-l-4 ' + (props.toast.success ? 'border-success' : 'border-theme')}>
                <ToastPrimitive.Title className="">
                    {props.toast.title}
                </ToastPrimitive.Title>
                <ToastPrimitive.Description className="text-sm text-secondary">
                    {props.toast.description}
                </ToastPrimitive.Description>
                <ToastPrimitive.Close aria-label="Close" className="absolute -top-1.5 -left-3 bg-black rounded-full size-5 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-75">
                    ×
                </ToastPrimitive.Close>
            </div>
        </ToastPrimitive.Root>
    );
}
