import {NextResponse} from 'next/server';
import {register} from '@/util/users';


// TODO: see todo in login route
export async function POST(req: Request) {
    const {name, email} = await req.json();
    const token = await register(email, name);
    return NextResponse.json(token);
}
