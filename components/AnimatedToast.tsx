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
            className="ToastRoot"
            onOpenChange={props.onOpenChange}
        >
            <div className="ToastInner">
                {/* <ToastStatusIcon status={toast.status} /> */}
                <ToastPrimitive.Title className="ToastTitle">
                    {props.toast.title}
                </ToastPrimitive.Title>
                <ToastPrimitive.Description className="ToastDescription">
                    {props.toast.description}
                </ToastPrimitive.Description>
                <ToastPrimitive.Action
                    className="ToastAction Button small green"
                    altText="Goto schedule to undo"
                >
                    Undo
                </ToastPrimitive.Action>
                <ToastPrimitive.Close aria-label="Close" className="ToastClose">
                    x
                </ToastPrimitive.Close>
            </div>
        </ToastPrimitive.Root>
    );
}
