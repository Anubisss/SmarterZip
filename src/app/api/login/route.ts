import { NextResponse } from 'next/server';

import calculateLoginToken from './calculateLoginToken';
import getNonceForLogin from './getNonceForLogin';
import login from './login';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  let loginData;
  try {
    const nonce = await getNonceForLogin();
    const token = calculateLoginToken(password, nonce);

    loginData = await login(email, token);
  } catch (ex) {
    console.error('error occured during login', (ex as Error).toString());
    return NextResponse.json({ message: 'Zipato error' }, { status: 500 });
  }

  if (loginData.success) {
    return NextResponse.json({ message: 'Login successful' });
  }
  if (loginData.error) {
    return NextResponse.json({ message: loginData.error }, { status: 401 });
  }
  return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
}
