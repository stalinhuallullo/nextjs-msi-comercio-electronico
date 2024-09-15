import { NextResponse } from "next/server"


export async function POST(request: Request) {

    const { CODSISTEMA, CODMODULO, CODUSARIO, CODPASSWORD } = await request.json()

    let requestJson = {
        "CODSISTEMA": CODSISTEMA,
        "CODMODULO": CODMODULO,
        "CODUSARIO": CODUSARIO,
        "CODPASSWORD": CODPASSWORD
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