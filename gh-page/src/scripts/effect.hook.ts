// hooks outside the element to avoid unknown closures
import { useEffect, useLayoutEffect } from "react";

type Primitive = boolean | number | string | bigint | null | undefined

type SafeCallback = (...args: Primitive[]) => void
const createSafeEffect = (fn: SafeCallback, destructor?: () => void): SafeCallback => {
    return (...args) => {
        useEffect(() => {
            fn(...args)

            if(!!destructor) return destructor
        }, args)
    }
}
const createSafeLayoutEffect = (fn: SafeCallback, destructor?: () => void): SafeCallback => {
    return (...args) => {
        useLayoutEffect(() => {
            fn(...args)

            if(!!destructor) return destructor
        }, args)
    }
}

type UnSafeCallback = (...args: any[]) => void
const createUnSafeEffect = (fn: UnSafeCallback, destructor?: () => void): UnSafeCallback => {
    return (...args) => {
        useEffect(() => {
            fn(...args)

            if(!!destructor) return destructor
        }, args)
    }
}
const createUnSafeLayoutEffect = (fn: UnSafeCallback, destructor?: () => void): UnSafeCallback => {
    return (...args) => {
        useLayoutEffect(() => {
            fn(...args)

            if(!!destructor) return destructor
        }, args)
    }
}

export {
    createSafeEffect,
    createSafeLayoutEffect,
    createUnSafeEffect,
    createUnSafeLayoutEffect
}