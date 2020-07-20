import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pipeChaps'
})
export class PipeChapitalLetters implements PipeTransform {

    transform(value, optiondata) {
        if (value) {
            return value.toUpperCase();
        }
        return '';
    }
}
