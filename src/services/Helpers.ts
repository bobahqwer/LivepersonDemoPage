export class Helpers {

    // sort array of Jsons by property name (string)
    static SortArrayByProperty(property: string) {
        return function (a, b) {
            if (a[property] > b[property])
                return 1;
            else if (a[property] < b[property])
                return -1;

            return 0;
        }
    }

    // merge between multiple arrays
    static ConcatMultiArrays(...args) {
        return args.reduce((acc, val) => [...acc, ...val]);
    }

    // merge between multiple arrays with a distinct logic
    static ConcatMultiArraysDistinct = (arrays: any[][]) => {
        const _output: any[] = [];

        arrays.forEach(array => {
            array.forEach(item => {
                if (_output.findIndex(o => o.name === item.name) == -1) _output.push(item);
            });
        })

        return _output;
    };
}