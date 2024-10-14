import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.
 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
  const imgURL = searchParams.get('img');
  if (!imgURL) {
    return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }
 
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
      >
         <img
          tw="w-fit h-[90%] object-contain"
          src={imgURL}
          alt="Product Image"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}