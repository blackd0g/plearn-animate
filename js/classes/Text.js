class Text {
  constructor({ size = 20, fontName = 'title', color = '#000000', text = '' }) {
    const style = { font:`${size}px ${fontName}`, fill: color }
    this.Text = new PIXI.Text(text, style)
    this.pulse = 0
    console.log(this.Text)
  }

  setPos({ x = 0, y = 0 }) {
    this.Text.x = x
    this.Text.y = y
    return true
  }

  setAnchor({ x = 0, y = 0 }) {
    this.Text.x += (this.Text.width) * (x - this.Text.anchor.x)
    this.Text.y += (this.Text.height) * (y - this.Text.anchor.y)
    this.Text.anchor.x = x
    this.Text.anchor.y = y
    return true
  }

  setOpacity({ value = 0 }) {
    this.Text.alpha = value
    return true
  }
  
  setScale({ scale = 1 }) {
    this.Text.scale.set(scale, scale)
    return true
  }
  
  zoomIn({
    scale = 2,
    speed = 0.01,
    ancX = 0,
    ancY = 0,
  }) {
    if (this.Text.scale.x < scale) {
      this.Text.scale.x += speed
      this.Text.scale.y += speed
    } else {
      this.Text.scale.x = scale
      this.Text.scale.y = scale
      return true
    }
  }

  fadeOut({
    speed = 0.02
  }) {
    if (this.Text.alpha > 0) {
      this.Text.alpha -= speed
    } else {
      this.Text.alphs = 0
      return true
    }
  }

  fadeIn({
    speed = 0.02
  }) {
    if (this.Text.alpha < 1) {
      this.Text.alpha += speed
    } else {
      this.Text.alphs = 1
      return true
    }
  }

  moveToAny({ endPos, speed }) {
    const dx = endPos.x - this.Text.x
    const dy = endPos.y - this.Text.y
    const angle = Math.atan2(dy, dx)
    const xVelo = Math.cos(angle) * speed
    const yVelo = Math.sin(angle) * speed
    if( xVelo <= 0 && this.Text.x + xVelo < endPos.x ) {
      this.Text.x += 0
      return true
    } else {
      this.Text.x += xVelo
      this.Text.y += yVelo
    }
  } 

  zoomPulse({
    startScale = 1,
    scale = 2,
    speed = 0.02,
    ancX = 0,
    ancY = 0,
    pulse = 3
  }) {
    if (this.Text.scale.x < scale && !this.zoomBack) {
      this.Text.scale.x += speed
      this.Text.scale.y += speed
    } else {
      if (this.pulse < pulse) {
        this.zoomBack = true
        this.Text.scale.x -= speed
        this.Text.scale.y -= speed
        if (this.Text.scale.x <= startScale) {
          this.zoomBack = false
          this.pulse += 1
          if(this.pulse >= pulse) {
            return true
          }
        }
      } else {
        this.zoomBack = false
      }
    }
  }
}