export default (expenses) => {
    let total = 0;
    if(Array.isArray(expenses)) {
        const amount = (item) => item.amount;
        const sum = (prev, next) => prev + next;
        total = expenses.map(amount).reduce(sum, 0);
    }
    return total;
}