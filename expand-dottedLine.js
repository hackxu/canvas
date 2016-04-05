/**
 * Created by bluexu on 16/4/5.
 */
function expandDottedLine(id) {
    var context = document.getElementById(id).getContext('2d'),
        moveToFunction = CanvasRenderingContext2D.prototype.moveTo;
    CanvasRenderingContext2D.prototype.lastMoveToLocation = {};

    CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
        moveToFunction.apply(context, [x, y]);
        this.lastMoveToLocation.x = x;
        this.lastMoveToLocation.y = y;
    };
    CanvasRenderingContext2D.prototype.dashedLineTo = function (x, y, dashLenth) {
        dashLenth = dashLenth === undefined ? 5 : dashLenth;
        var startX = this.lastMoveToLocation.x;
        var startY = this.lastMoveToLocation.y;

        var deltaX = x - startX;
        var deltaY = y - startY;
        var numDashes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLenth);

        for (var i = 0; i < numDashes; ++i) {
            this[i % 2 === 0 ? 'moveTo' : 'lineTo'](startX + (deltaX / numDashes) * i, startY + (deltaY / numDashes) * i);
        }
        this.moveTo(x, y)
    };
}