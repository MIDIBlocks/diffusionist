/**
 * Simple plugin for updating the mouse
 */
import {TweenMax} from 'gsap'

window.handsfree.use('mousemove', {
  tween: {
    x: 0,
    y: 0
  },
  
  onFrame ({hands}) {
    if (!hands.multiHandLandmarks) return
    const hand = hands.multiHandedness.find(hand => hand.label === 'Left')

    if (typeof hand !== 'undefined') {
      let x = window.outerWidth - hands.multiHandLandmarks[hand.index][9].x * window.outerWidth
      let y = hands.multiHandLandmarks[hand.index][9].y * window.outerHeight

      TweenMax.to(this.tween, 1, {
        x,
        y,
        overwrite: true,
        ease: 'linear.easeNone',
        immediateRender: true
      })
  
      window.$canvas.dispatchEvent(new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: this.tween.x,
        clientY: this.tween.y
      }))
    }
  }
})