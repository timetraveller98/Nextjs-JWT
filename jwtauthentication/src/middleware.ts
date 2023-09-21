
import { NextResponse } from 'next/server';

const jwtKey: any = process.env.JWT_SECRET;

export function middleware(req: any) {
  const data = req.cookies.get('token')?.value;
  const url = req.nextUrl.pathname === '/signup' || req.nextUrl.pathname === '/login';
  if(url){
    if(data){
      return  NextResponse.redirect(new URL('/', req.url))
    }}
    else{
        if(!data){
            return  NextResponse.redirect(new URL('/signup', req.url))  
        
    }
    }
}

export const config = {
    matcher: ['/', '/login', '/signup'],
  }

