import NavLink from '@/app/NavLink';


export default function NavBar() {
    return (
        <nav className="flex justify-center pt-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/">Scoreboard</NavLink>
            <NavLink href="/">Challenges</NavLink>
            <NavLink href="/">Profile</NavLink>
        </nav>
    )
}
