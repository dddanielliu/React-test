import { useState } from "react"

export const LogggedIn = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true)
    }
    const handleLogout = () => {
        setIsLoggedIn(false)
    }
    return (
        <div>
            <button onClick={handleLogin}></button>
            <button onClick={handleLogout}></button>
            <div>User is { isLoggedIn ? 'logged in': 'logged out' }</div>
        </div>
    )
}
