// app/api/pyth-price/route.ts
//
// Rota de servidor (não vai pro navegador) que busca o preço do BTC/USD
// na Pyth usando a chave de API guardada em segredo, e devolve só o
// número simples pro site usar.
import { NextResponse } from "next/server";

const BTC_USD_FEED_ID =
  "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43";

export async function GET() {
  try {
    const res = await fetch(
      `https://hermes.pyth.network/v2/updates/price/latest?ids[]=${BTC_USD_FEED_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PYTH_API_KEY}`,
        },
        // não guarda cache — sempre busca o preço mais recente
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Pyth request failed" }, { status: 502 });
    }

    const data = await res.json();
    const priceData = data?.parsed?.[0]?.price;

    if (!priceData) {
      return NextResponse.json({ error: "No price data" }, { status: 502 });
    }

    // Pyth manda o preço como inteiro + expoente (ex: price=8084212345678, expo=-8)
    const price = Number(priceData.price) * 10 ** priceData.expo;

    return NextResponse.json({ price, publishTime: priceData.publish_time });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
