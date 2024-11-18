import { cookies } from 'next/headers';

// Components
import NavLink from '@/app/NavLink';
import NavWrapper from '@/app/NavWrapper';
import LogoutButton from '@/app/LogoutButton';

// Utils
import { AUTH_COOKIE_NAME } from '@/util/config';


export default async function NavBar() {
    const c = await cookies();
    const authed = c.has(AUTH_COOKIE_NAME);

    return (
        <NavWrapper>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/scoreboard">Scoreboard</NavLink>

            {authed ? (
                <>
                    <NavLink href="/challenges">Challenges</NavLink>
                    <NavLink href="/profile">Profile</NavLink>
                    <LogoutButton />
                </>
            ) : (
                <>
                    <NavLink href="/register">Register</NavLink>
                    <NavLink href="/login">Login</NavLink>
                </>
            )}
        </NavWrapper>
    )
}
