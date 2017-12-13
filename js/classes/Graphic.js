class Graphic{
  constructor({ name, posX = 0, posY = 0, color = 0x000000, radius = 100 }){
    this.Graphic = new PIXI.Graphics()
    this.Graphic.beginFill(color, 1)
    this.Graphic.lineStyle(1, color, 1)
    this.Graphic.alpha = 1
    this.Graphic.drawCircle(0, 0, radius)
    const texture = this.Graphic.generateTexture()

    this.Sprite = new PIXI.Sprite(texture)
    this.Sprite.scale.set(1, 1)
    this.Sprite.position.x = posX
    this.Sprite.position.y = posY
    this.Sprite.anchor.x = 0.5
    this.Sprite.anchor.y = 0.5
    this.pulse = 0
  }

  setOpacity({ value = 0 }) {
    this.Sprite.alpha = value
    return true
  }
  
  drawCircle({ radius }) {
    this.Graphic.drawCircle(0, 0, this.circleRadius)
    texture = box.generateTexture()
    return true
  }

  popInCircle({ posX, posY, endScale, speed }) {
    if(this.Sprite.scale.x + speed >= endScale) {
      this.Sprite.scale.x = endScale
      this.Sprite.scale.y = endScale
      return true
    } else {
      this.Sprite.scale.x += speed
      this.Sprite.scale.y += speed
    }
  }

  moveToAny({ endPos, speed }) {
    const dx = endPos.x - this.Sprite.x
    const dy = endPos.y - this.Sprite.y
    const angle = Math.atan2(dy, dx)
    const xVelo = Math.cos(angle) * speed
    const yVelo = Math.sin(angle) * speed
    if( xVelo <= 0 && this.Sprite.x + xVelo < endPos.x ) {
      this.Sprite.x += 0
      return true
    }
    else {
      this.Sprite.x += xVelo
      this.Sprite.y += yVelo
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
    if( parseInt(xVelo) <= 0 && parseInt(this.Sprite.x) + parseInt(xVelo)  <= endPos.x ) {
      this.Sprite.x = endPos.x
      console.log("dddd")
      return true
    }  else {
      console.log(parseInt(xVelo),this.Sprite.x  )
      // this.Sprite.x += xVelo
      this.Sprite.x += xVelo
    }
  } 

  popAround({center, endRadius, speed, time}) {
    for(let i = 0; i < 6 ; i+= 1) {
      setTimeout( () => {
        if(this.circleRadiusAround[i] + speed >= endRadius) {
          this.Graphic.drawCircle(center + (i * endRadius * 2), center + (i * endRadius), this.circleRadiusAround[i])
          // this.Graphic.alpha -= 0.02
          return true
        } else {
          this.circleRadiusAround[i] += speed
          this.Graphic.drawCircle(center + (i * endRadius * 2), center + (i * endRadius), this.circleRadiusAround[i])
          // this.Graphic.alpha -= 0.02
        }
      }, i * time )
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
      if(this.pulse < pulse) {
      this.Sprite.scale.x += speed
      this.Sprite.scale.y += speed
      }
    } else {
      if (this.pulse < pulse) {
        this.zoomBack = true
        this.Sprite.scale.x -= speed
        this.Sprite.scale.y -= speed
        if (this.Sprite.scale.x <= startScale) {
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