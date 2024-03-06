import NavLink from '@/app/NavLink';


export default function NavBar() {
    return (
        <nav className="flex justify-center pt-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/scoreboard">Scoreboard</NavLink>
            <NavLink href="/challenges">Challenges</NavLink>
            <NavLink href="/profile">Profile</NavLink>
        </nav>
    )
}
