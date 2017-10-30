export class CommonValidator {
    static dateValidator(input: string, isRequired: boolean) {
        if (!isRequired && (input == null || input.length === 0)) {
            return true;
        }
        var matches = input.match(/^(\d{1,2})[/](\d{1,2})[/](\d{4})$/);
        if (!matches) {
            return false;
        }
        var day = parseInt(matches[1], 10);
        var month = parseInt(matches[2], 10);
        var year = parseInt(matches[3], 10);
        if ((year < 1900) || (month > 12) || (month < 1)) {
            return false;
        }
        var output = new Date(year, month - 1, day);
        if (!output.getTime()) {
            return false;
        }
        if (output.getDate() !== day) {
            return false;
        }
        return true;
    }
}