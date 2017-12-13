class Element{
  constructor({ name, acX = 0.5, acY = 0, scale = 1, stage }){
    this.acX = acX
    this.Sprite = PIXI.Sprite.fromImage(name)
    this.Sprite.anchor.set(acX, acY)
    this.Sprite.x = 0
    this.Sprite.y = 0
    this.speed = 0
    this.Sprite.alpha = 1
    this.Sprite.scale.set(scale, scale)
    this.stage = stage
    this.pulse = 0
  }

  hello() {
    console.log(this.Sprite.width, (this.Sprite.width * this.acX))
    console.log('Hello !')
  }

  setPos({ x = 0, y = 0 }) {
    this.Sprite.x = x
    this.Sprite.y = y
    return true
  }

  setScale({ scale = 1 }) {
    this.Sprite.scale.set(scale, scale)
    return true
  }

  setAnchor({ x = 0, y = 0 }) {
    this.Sprite.x += (this.Sprite.width) * (x - this.Sprite.anchor.x)
    this.Sprite.y += (this.Sprite.height) * (y - this.Sprite.anchor.y)
    this.Sprite.anchor.x = x
    this.Sprite.anchor.y = y
    return true
  }

  setOpacity({ value = 0 }) {
    this.Sprite.alpha = value
    return true
  }

  leftToright({
    startPos,
    endPos,
    speed,
    stretch = true,
    slowInOut = true,
    slowFactor = 15,
    slowPos = 8,
    bounce = true,
    bounceValue = 100,
  }) {
    if (this.Sprite.x + speed >= endPos.x) {
      if (bounce) {
        this.bounce = true
        this.Sprite.x -= (speed / slowFactor)
      } else {
        this.Sprite.x = endPos.x
        this.bounce = false
        return true
      }
    }
    if(!this.bounce) {
      if (slowInOut) {
        const endSlowIn = (endPos.x - startPos.x) / slowPos
        const startSlowOut = endPos.x - ((endPos.x - startPos.x) / slowPos)
        if (this.Sprite.x < endSlowIn) {
          this.Sprite.x += (speed / slowFactor)
        }
        else if (this.Sprite.x > startSlowOut) this.Sprite.x += (speed / slowFactor)
        else this.Sprite.x += speed 
      } else {
        this.Sprite.x += speed
      }
    } else {
      if (this.Sprite.x > endPos.x-bounceValue) this.Sprite.x -= (speed / slowFactor)
      else {
        this.Sprite.x = endPos.x-bounceValue
        this.bounce = false
        return true
      }
    }
  }

  moveToY({ endPos, speed }) {
    const dx = endPos.x - this.Sprite.x
    const dy = endPos.y - this.Sprite.y
    const angle = Math.atan2(dy, dx)
    const yVelo = Math.sin(angle) * speed
    if( parseInt(yVelo) <= 0 && this.Sprite.y + yVelo <= endPos.y ) {
      this.Sprite.y = endPos.y
      return true
    }  else {
      // this.Sprite.x += xVelo
      this.Sprite.y += yVelo
    }
  } 

  moveToX({ endPos, speed }) {
    const dx = endPos.x - this.Sprite.x
    const dy = endPos.y - this.Sprite.y
    const angle = Math.atan2(dy, dx)
    const xVelo = Math.cos(angle) * speed
    if( parseInt(xVelo) <= 0 && this.Sprite.x + xVelo <= endPos.x ) {
      this.Sprite.x = endPos.x
      return true
    }  else {
      // this.Sprite.x += xVelo
      this.Sprite.x += xVelo
    }
  } 

  zoomIn({
    scale = 2,
    speed = 0.01,
    ancX = 0,
    ancY = 0,
  }) {
    if (this.Sprite.scale.x < scale) {
      this.Sprite.scale.x += speed
      this.Sprite.scale.y += speed
    } else {
      this.Sprite.scale.x = scale
      this.Sprite.scale.y = scale
      return true
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
    if (this.Sprite.scale.x < scale && !this.zoomBack) {
      this.Sprite.scale.x += speed
      this.Sprite.scale.y += speed
    } else {
      if (this.pulse < pulse) {
        this.zoomBack = true
        this.Sprite.scale.x -= speed
        this.Sprite.scale.y -= speed
        if (this.Sprite.scale.x <= startScale) {
          this.zoomBack = false
          this.pulse += 1
        }
      } else {
        this.pulse = 0
        this.zoomBack = false
        return true
      }
    }
  }

  fadeOut({
    speed = 0.02,
    alpha = 0
  }) {
    if (this.Sprite.alpha > alpha) {
      this.Sprite.alpha -= speed
    } else {
      this.Sprite.alpha = alpha
      return true
    }
  }

  fadeIn({
    speed = 0.02,
    alpha = 1
  }) {
    if (this.Sprite.alpha < alpha) {
      this.Sprite.alpha += speed
    } else {
      this.Sprite.alphs = alpha
      return true
    }
  }

  rotate({
    speed = 0.02
  }) {
    this.Sprite.rotation = 6.28318531
    if(this.Sprite.rotation > 6.28318531) this.Sprite.rotation = 6.28318531
    else this.Sprite.rotation
  }
}