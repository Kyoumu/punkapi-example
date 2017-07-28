/**
 * Возвращает высоту всего документа
 * @returns {number} Высота документа
 */
const getDocumentHeight = () => {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
};

/**
 * Помещается ли контент в экран
 */
export default () => {
    return getDocumentHeight() === document.documentElement.clientHeight;
};