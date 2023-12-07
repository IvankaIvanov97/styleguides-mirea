```jsx
const form = [
        {
            value: 1,
            desc: "ООО",
            option: {
                value: 0,
                desc: "Введите количество SKU",
            },
        },
        {
            value: 2,
            desc: "ИП",
        },
        {
            value: 3,
            desc: "АО",
        },
    ];
function test() {

}
<BlockSelect type="checkbox" data={form} name="form" onClick={test} />
```
