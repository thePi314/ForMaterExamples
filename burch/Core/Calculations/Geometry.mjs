import { Object } from '../Classes/Object.mjs' ;

/* object functions */
export function getClosestObject(x, y, objects_check = null, proc_x = 0, proc_y = 0) {
    let closest_object = null;
    if (objects_check != null) {
        for (let ind_obj = 0; ind_obj < objects_check.length; ind_obj++) {
            if (closest_object == null) {
                closest_object = objects_check[ind_obj];
                continue;
            }

            let len1 = pointToPointDistance(x, y, closest_object.position.x + closest_object.position.width * proc_x, closest_object.position.y + closest_object.position.height * proc_y);
            let len2 = pointToPointDistance(x, y, objects_check[ind_obj].position.x + objects_check[ind_obj].position.width * proc_x, objects_check[ind_obj].position.y + objects_check[ind_obj].position.height * proc_y);
            if (len2 < len1) {
                closest_object = objects_check[ind_obj];
            }
        }
    }

    return closest_object;
}

/* square functions */
export function squareOverlap(square1, square2) {
    if ((square1.x > square2.x + square2.width) || (square2.x > square1.x + square1.width)) {
        return false;
    }

    if ((square1.y > square2.y + square2.height) || (square2.y > square1.y + square1.height)) {
        return false;
    }

    return true;
}

export function objectToSquare(object) {
    return {
        x: object.position.x,
        y: object.position.y,
        width: object.position.width,
        height: object.position.height
    }
}

export function closestSquare(x, y, squares = null, width_proc, height_proc) {
    let closest_square = null;

    if (squares != null) {
        for (let ind = 0; ind < squares.length; ind++) {
            if (closest_square == null) {
                closest_square = squares[ind];
            }
            else {
                if (pointToPointDistance(closest_square.x + closest_square.width * width_proc, closest_square.y + closest_square.height * height_proc, x, y) > pointToPointDistance(x, y, squares[ind].x + squares[ind].width * width_proc, squares[ind].y + squares[ind].height * height_proc)) {
                    closest_square = squares[ind];
                }
            }
        }
    }

    return closest_square;
}

/* point functions */
export function pointToPointDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}