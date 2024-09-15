import { NextResponse } from "next/server"


export async function POST(request: Request) {

    const { email, password } = await request.json()

    let requestJson = {
        "CODSISTEMA": 0,
        "CODMODULO": 0,
        "CODUSARIO": email,
        "CODPASSWORD": password
    }

    const response = await fetch('http://test.munisanisidro.gob.pe/WSITSE/LogeoUsaurioMSI', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestJson)
    });
    const data = await response.json();

    return NextResponse.json(data)
}