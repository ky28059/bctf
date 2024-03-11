import {cookies} from 'next/headers';

// Components
import NavLink from '@/app/NavLink';
import NavWrapper from '@/app/NavWrapper';


export default function NavBar() {
    const authed = cookies().has('ctf_clearance');

    return (
        <NavWrapper>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/scoreboard">Scoreboard</NavLink>

            {authed ? (
                <>
                    <NavLink href="/challenges">Challenges</NavLink>
                    <NavLink href="/profile">Profile</NavLink>
                </>
            ) : (
                <>
                    <NavLink href="/register">Register</NavLink>
                </>
            )}
        </NavWrapper>
    )
}
