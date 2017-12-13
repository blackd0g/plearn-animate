class Circle extends Graphic{
  constructor( props ){
    super(props)
    this.Graphic.drawCircle(props.posX, props.posY, props.width);
    this.Graphic.endFill()   
  }
}