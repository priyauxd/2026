import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur  = document.getElementById('cur')!
    const ring = document.getElementById('ring')!
    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cur.style.left = mx + 'px'
      cur.style.top  = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    const addHov    = () => document.body.classList.add('hov')
    const removeHov = () => document.body.classList.remove('hov')
    const bindHover = () => {
      document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', addHov)
        el.addEventListener('mouseleave', removeHov)
      })
    }
    bindHover()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cur" aria-hidden="true" />
      <div id="ring" aria-hidden="true" />
    </>
  )
}
