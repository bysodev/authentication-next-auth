import { NextResponse } from 'next/server';
 
export async function GET() {

  const data = {
    nombre: 'Bryan',
    apellido: 'Solórzano',
    edad: 21
  }
 
  return NextResponse.json({ data });
}