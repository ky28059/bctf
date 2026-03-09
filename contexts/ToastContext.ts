import { createContext, RefObject, useContext } from 'react';


export type ToastPayload = {
    title: string,
    description: string,
    success: boolean,
    duration?: number,
}

type ToastImpl = { // TODO?
    toastElementsMapRef: RefObject<Map<string, HTMLLIElement>>,
    sortToasts: () => void,
}

export const ToastContext = createContext<{ toast: (t: ToastPayload) => void } | null>(null);
export const ToastImplContext = createContext<ToastImpl | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error("useToast must be used within Toasts");
    return context;
}

export function useToastContext() {
    const context = useContext(ToastImplContext);
    if (!context)
        throw new Error("useToast must be used within Toasts");
    return context;
}
