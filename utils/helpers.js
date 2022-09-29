
const postDate = date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const nameRadioBtn = (value, category) => {
    if (value == undefined) return '';
    return value == category ? 'checked ' : '';
}

const getlike = (likes) => {
    if (likes.length > 0) {
        return 'fa-solid fa-heart fa-xl heart-icon'; 
    } else {
        return 'fa-regular fa-heart fa-xl heart-icon';
    }
}

const getTotal = (total) => {
    if (total.length > 0) {
        return total[0].total;
    }
    return '';
}

module.exports = {
    postDate,
    nameRadioBtn,
    getlike,
    getTotal
};