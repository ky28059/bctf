'use client'

import { useContext, useEffect, useRef } from 'react';
import PreferencesContext from '@/contexts/PreferencesContext';


export default function Equalizer() {
    const { preferences } = useContext(PreferencesContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function draw(dt: number) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;

        dt = dt / 1000;
        requestAnimationFrame(draw);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const margin = 10;
        const width = 50;
        const maxHeight = .2 * ctx.canvas.height;
        const minHeight = 20;
        const maxFrequency = 1.0;
        const minFrequency = 0.8;

        let i = 0;
        for (let x = margin; x < canvas.width + width + margin; x += width + margin) {
            const amp = lerp(minHeight, maxHeight, random(i));
            const freq = lerp(minFrequency, maxFrequency, random(i + 100)) * 2 * Math.PI;
            const phase = lerp(0, 2 * Math.PI, random(i + 200));
            const height = amp * (0.5 * Math.sin(freq * dt + phase) + 0.5);

            let col0 = '#ff1e1e';
            col0 = changeHue(col0, lerp(-10, 10, x / ctx.canvas.width));
            ctx.fillStyle = col0;

            ctx.fillRect(x, ctx.canvas.height - height, width, height);
            i += 1;
        }
    }

    useEffect(() => {
        if (!preferences.animations) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Start the animation
        requestAnimationFrame(draw);

        const onResize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.right - rect.left;
            canvas.height = rect.bottom - rect.top;
        }
        onResize();

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [canvasRef, preferences.animations]);

    if (!preferences.animations) return null;

    return (
        <canvas
            className="w-screen h-screen fixed bottom-0 -z-20"
            ref={canvasRef}
        />
    )
}

function lerp(from: number, to: number, f: number) {
    return (1.0 - f) * from + f * to;
}

function fract(x: number) {
    return Math.abs(x) - Math.trunc(Math.abs(x));
}

const seed = Math.random();
function random(s: number) {
    return fract(Math.sin(s + 78.233) * 43758.5453 * (seed + 1));
}

function changeHue(rgb: string, degree: number) {
    const hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    } else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// expects a string and returns an object
function rgbToHSL(rgb: string) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (rgb.length === 3) {
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    const r = parseInt(rgb.slice(0, 2), 16) / 255,
        g = parseInt(rgb.slice(2, 4), 16) / 255,
        b = parseInt(rgb.slice(4, 6), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin;

    let l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    } else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    } else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    } else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    } else {
        s = (delta / (1 - Math.abs(2 * l - 1)));
    }

    return { h, s, l } satisfies HSL
}

// expects an object and returns a string
type HSL = {
    h: number,
    s: number,
    l: number
}

function hslToRGB(hsl: HSL) {
    const { h, s, l } = hsl;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r, g, b;
    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalizeRGBValue(r, m);
    g = normalizeRGBValue(g, m);
    b = normalizeRGBValue(b, m);

    return rgbToHex(r, g, b);
}

function normalizeRGBValue(color: number, m: number) {
    return Math.max(
        Math.floor((color + m) * 255),
        0
    );
}

function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
