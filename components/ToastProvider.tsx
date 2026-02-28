'use client'

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Toast as ToastPrimitive } from "radix-ui";

// Components
import AnimatedToast from '@/components/AnimatedToast';
import { ToastContext, ToastImplContext, ToastPayload } from '@/contexts/ToastContext';


const ANIMATION_OUT_DURATION = 350;

export default function ToastProvider(props: { children: ReactNode }) {
    const [toasts, setToasts] = useState(new Map<string, ToastPayload>());
    const toastElementsMapRef = useRef(new Map<string, HTMLLIElement>());
    const viewportRef = useRef<HTMLOListElement>(null);

    const sortToasts = useCallback(() => {
        const toastElements = Array.from(toastElementsMapRef.current).reverse();
        const heights: number[] = [];

        toastElements.forEach(([, toast], index) => {
            if (!toast) return;
            const height = toast.clientHeight;
            heights.push(height);
            const frontToastHeight = heights[0];
            toast.setAttribute("data-front", String(index === 0));
            toast.setAttribute("data-hidden", String(index > 2));
            toast.style.setProperty("--index", index.toString());
            toast.style.setProperty("--height", `${height}px`);
            toast.style.setProperty("--front-height", `${frontToastHeight}px`);
            const hoverOffsetY = heights
                .slice(0, index)
                .reduce((res, next) => res + next, 0);
            toast.style.setProperty("--hover-offset-y", `-${hoverOffsetY}px`);
        });
    }, []);

    const handleAddToast = useCallback((toast: ToastPayload) => {
        setToasts((currentToasts) => {
            const m = new Map(currentToasts);
            m.set(String(Date.now()), toast);
            return m;
        });
    }, []);

    const handleRemoveToast = useCallback((key: string) => {
        setToasts((currentToasts) => {
            const m = new Map(currentToasts);
            m.delete(key);
            return m;
        });
    }, []);

    useEffect(() => {
        const viewport = viewportRef.current;

        if (viewport) {
            const handleFocus = () => {
                toastElementsMapRef.current.forEach((toast) => {
                    toast.setAttribute("data-hovering", "true");
                });
            };

            const handleBlur = (event: PointerEvent | FocusEvent) => {
                if (!viewport.contains(event.target as Node | null) || viewport === event.target) {
                    toastElementsMapRef.current.forEach((toast) => {
                        toast.setAttribute("data-hovering", "false");
                    });
                }
            };

            viewport.addEventListener("pointermove", handleFocus);
            viewport.addEventListener("pointerleave", handleBlur);
            viewport.addEventListener("focusin", handleFocus);
            viewport.addEventListener("focusout", handleBlur);
            return () => {
                viewport.removeEventListener("pointermove", handleFocus);
                viewport.removeEventListener("pointerleave", handleBlur);
                viewport.removeEventListener("focusin", handleFocus);
                viewport.removeEventListener("focusout", handleBlur);
            };
        }
    }, []);

    return (
        <ToastContext.Provider value={{ toast: handleAddToast }}>
            <ToastImplContext.Provider value={{ toastElementsMapRef, sortToasts }}>
                <ToastPrimitive.Provider {...props}>
                    {props.children}

                    {Array.from(toasts).map(([key, toast]) => (
                        <AnimatedToast
                            key={key}
                            id={key}
                            toast={toast}
                            onOpenChange={(open) => {
                                if (!open) {
                                    toastElementsMapRef.current.delete(key);
                                    sortToasts();
                                    if (!open) {
                                        setTimeout(() => {
                                            handleRemoveToast(key);
                                        }, ANIMATION_OUT_DURATION);
                                    }
                                }
                            }}
                        />
                    ))}
                    <ToastPrimitive.Viewport
                        ref={viewportRef}
                        className="ToastViewport"
                    />
                </ToastPrimitive.Provider>
            </ToastImplContext.Provider>
        </ToastContext.Provider>
    );
}
