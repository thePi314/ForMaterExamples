import parser_normal from './Normal.mjs';

export default function parser_template(objects = [], parse_template, width, height) {
    let tmp_obj = [];

    //determen heights for each row
    let taken_height = 0;
    let auto_height = 0;
    for (let ind_row = 0; ind_row < parse_template.length; ind_row++) {
        if (parse_template[ind_row].height != -1) {
            taken_height += parse_template[ind_row].height;
        }
        else {
            auto_height++;
        }
    }
    for (let ind_row = 0; ind_row < parse_template.length; ind_row++) {
        if (parse_template[ind_row].height == -1) {
            parse_template[ind_row].height = (init_height - taken_height) / auto_height;
        }
    }


    //determen width for each component
    for (let ind_row = 0; ind_row < parse_template.length; ind_row++) {
        let row_components = parse_template[ind_row].components;
        let taken_width = 0;
        let width_auto = 0;

        for (let ind_component = 0; ind_component < row_components.length; ind_component++) {
            let component = row_components[ind_component];

            if (component.width == -1) {
                width_auto++;
            }
            else {
                taken_width += component.width;
            }
        }


        for (let ind_component = 0; ind_component < row_components.length; ind_component++) {
            let component = row_components[ind_component];

            if (component.width == -1) {
                parse_template[ind_row].components[ind_component].width = (init_width - taken_width) / width_auto;
            }
        }

    }


    let tmp_column = [];
    let tmp_pcolumn = null;
    for (let ind_row = 0; ind_row < parse_template.length; ind_row++) {
        let row_data = parse_template[ind_row].components;
        let row_height = parse_template[ind_row].height;

        for (let ind_column = 0; ind_column < row_data.length; ind_column++) {
            let parse_obj = row_data[ind_column].name;
            let component_width = row_data[ind_column].width;

            for (let ind_obj = 0; ind_obj < objects.length; ind_obj++) {
                if (objects[ind_obj].name == parse_obj) {
                    objects[ind_obj].position.width = component_width;
                    objects[ind_obj].position.height = row_height;

                    objects[ind_obj].position.x = (tmp_column.length == 0) ? 0 : tmp_column[tmp_column.length - 1].position.x + tmp_column[tmp_column.length - 1].position.width; // init_width / row_data.length * ind_column;
                    objects[ind_obj].position.y = (tmp_pcolumn == null) ? 0 : (tmp_pcolumn.y + tmp_pcolumn.height);

                    tmp_obj.push(objects[ind_obj]);
                    tmp_column.push(objects[ind_obj]);
                    objects.splice(ind_obj, 1);
                    break;
                }
            }


        }

        tmp_pcolumn = { y: (tmp_column.length == 0) ? 0 : tmp_column[0].position.y, height: ((tmp_column.length == 0) ? 0 : row_height) };
        tmp_column = [];
    }
    
    return parser_normal(tmp_obj);
}