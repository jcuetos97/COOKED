
const postDate = date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const nameRadioBtn = (value, category) => {
    if (value == undefined) return '';
    return value == category ? 'checked ' : '';
}

module.exports = {
    postDate,
    nameRadioBtn
};