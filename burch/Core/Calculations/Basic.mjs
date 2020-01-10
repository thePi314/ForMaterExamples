export function round(number, decimal_points) {
    let new_num = Math.round(number * Math.pow(10, decimal_points)) / Math.pow(10, decimal_points);

    number = toString(number);
    if (+number.charAt(decimal_points + 1) >= 5) {
        new_num += 1 / Math.pow(10, decimal_points);
    }

    return new_num;
}