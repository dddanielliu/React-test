import type React from "react"

type OscarProps = {
    children: React.ReactNode
}

export const Oscar = ({children}: OscarProps) => {
    return <div>{children}</div>
}