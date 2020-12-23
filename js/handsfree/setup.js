import Handsfree from 'handsfree'

const handsfree = new Handsfree({
  assetsPath: '/handsfree/assets',
  hands: true,
  showDebug: true,
})
window.handsfree = handsfree
