'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export function NoiseFilter() {
  useEffect(() => {
    const tur = document.querySelector('feTurbulence')
    const tl = gsap.timeline({
      onUpdate: () => {
        tur?.setAttribute('baseFrequency', `0 ${val.freg}`)
      }
    });
    const val = { freg: 0.00001 }
    
    tl.to(val, {
      freg: 0.2,
      duration: 0.2,
      ease: "linear.inOut"
    }).to(val, {
      freg: 0.00001,
      duration: 0.2,
      ease: "linear.inOut"
    });

    const timer = setInterval(() => tl.restart(), 3000);
    return () => {
      clearInterval(timer)
      tur?.setAttribute('baseFrequency', '0 0.00001')
    }
  }, []);

  return (
    <svg style={{ display: "none" }}>
      <filter id="noise" colorInterpolationFilters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
        <feTurbulence type="turbulence" baseFrequency="0 0.00001" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0.15%" width="100%" height="100%" result="turbulence1"/>
        <feDisplacementMap in="SourceGraphic" in2="turbulence1" scale="10" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" result="displacementMap1"/>
      </filter>
    </svg>
  )
}