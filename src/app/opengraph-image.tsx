import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'La Granja Ecológica Lindero'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const photoData = await readFile(
    join(process.cwd(), 'public/images/animales_vacas_comedero.jpg')
  )
  const photoBase64 = `data:image/jpeg;base64,${photoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        <img
          src={photoBase64}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.78) 100%)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '48px 64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Accent tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '3px',
                background: '#86efac',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                color: '#86efac',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
              }}
            >
              Ganadería Ecológica
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              color: '#ffffff',
              fontSize: '68px',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontFamily: 'serif',
            }}
          >
            La Granja Ecológica Lindero
          </div>

          {/* Subtitle */}
          <div
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: '24px',
              fontWeight: 400,
              marginTop: '4px',
              fontFamily: 'sans-serif',
            }}
          >
            Tomaykichwa · Huánuco, Perú
          </div>
        </div>
      </div>
    ),
    size,
  )
}
