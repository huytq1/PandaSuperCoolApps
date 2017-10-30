export class Utils {
    static convertToDate(input: string) {
        if (input === null || input === '') {
            return;
        }
        var matches = input.match(/^(\d{1,2})[- /.](\d{1,2})[- /.](\d{4})$/);
        let day = parseInt(matches[1], 10);
        let month = parseInt(matches[2], 10);
        let year = parseInt(matches[3], 10);
        let output = new Date(year, month - 1, day);
        return output;
    }

    static convertDateStringToISO(input: string) {
        if (input == undefined || input == '') {
            return '';
        }
        let dateValue = this.convertToDate(input);
        return this.toISODate(dateValue);
    }

    static toISODate(input: Date) {
        if (input == undefined) { return ""; }
        let pad = (num: any) => {
            let norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
        return input.getFullYear() + '-' + pad(input.getMonth() + 1) + '-' + pad(input.getDate())
            + 'T' + pad(input.getHours())
            + ':' + pad(input.getMinutes())
            + ':' + pad(input.getSeconds())
            + '.000Z';
    }
}