"use client"
import { useSearchParams } from "next/navigation"

export const page = () => {
    const searchParams = useSearchParams()
    const page = searchParams.get("page")
    const p = page ? parseInt(page) : 1
    console.log(p)
    return (p)
}


export const Total = page()