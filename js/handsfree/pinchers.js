/**
 * Adds pinch helpers
 */
const handsfree = window.handsfree

handsfree.use('pinchers', {
  models: 'hands',

  // Number of frames the current element is the same as the last
  numFramesFocused: [[0, 0, 0, 0,], [0, 0, 0, 0]],

  // Whether the fingers are touching
  thresholdMet: [[0, 0, 0, 0,], [0, 0, 0, 0]],

  // The original grab point for each finger
  origPinch: [
    [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}],
    [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]
  ],

  // The tweened scrollTop, used to smoothen out scroll
  // [[leftHand], [rightHand]]
  tween: [
    [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}],
    [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]
  ],

  // Number of frames that has passed since the last grab
  numFramesFocused: [[0, 0, 0, 0,], [0, 0, 0, 0]],

  config: {
    // Number of frames over the same element before activating that element
    framesToFocus: 10,

    // Number of pixels the middle and thumb tips must be near each other to drag
    threshold: 50,

    // Number of frames where a hold is not registered before releasing a drag
    numThresholdErrorFrames: 5
  },

  onUse () {
    this.$target = window
  },

  /**
   * Scroll the page when the cursor goes above/below the threshold
   */
  onFrame ({hands}) {
    if (!hands.multiHandLandmarks) return
    const height = this.handsfree.debug.$canvas.hands.height
    
    // Detect if the threshold for clicking is met with specific morphs
    for (let hand = 0; hand < hands.multiHandLandmarks.length; hand++) {
      for (let finger = 0; finger < 4; finger++) {
        // Check if fingers are touching
        const a = hands.multiHandLandmarks[hand][4].x - hands.multiHandLandmarks[hand][window.fingertipIndex[finger]].x
        const b = hands.multiHandLandmarks[hand][4].y - hands.multiHandLandmarks[hand][window.fingertipIndex[finger]].y
        const c = Math.sqrt(a*a + b*b) * height
        const thresholdMet = this.thresholdMet[hand][finger] = c < this.config.threshold

        if (thresholdMet) {
          console.log(finger)
        }
      }
    }

    // Set the original grab point
    // if (this.thresholdMet) {
    //   if (this.framesSinceLastGrab > this.config.numThresholdErrorFrames) {
    //     this.origScrollTop = this.getTargetScrollTop() + hands.multiHandLandmarks[0][4].y * height * this.config.speed
    //     TweenMax.killTweensOf(this.tweenScroll)
    //   }
    //   this.framesSinceLastGrab = 0
    // }
    // ++this.framesSinceLastGrab
    
    // // Scroll
    // if (this.framesSinceLastGrab < this.config.numThresholdErrorFrames) {
    //   TweenMax.to(this.tweenScroll, 1, {
    //     y: this.origScrollTop - hands.multiHandLandmarks[0][4].y * height * this.config.speed,
    //     overwrite: true,
    //     ease: 'linear.easeNone',
    //     immediateRender: true  
    //   })
      
    //   this.$target.scrollTo(0, this.tweenScroll.y)
    // }
  }
})
