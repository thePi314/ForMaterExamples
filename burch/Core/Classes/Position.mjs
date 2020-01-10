export default class Position {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    inStyle(width,height,init_width,init_height) {
        return 'position: absolute;top: ' + this.y * height / init_height + 'px;left:' + this.x * width / init_width + 'px;width:' + this.width * width / init_width + 'px;height:' + this.height * height / init_height + 'px;margin: 0px;padding:0px';
    }
}