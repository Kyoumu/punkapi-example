/**
 * Помещается ли контент в экран
 */
export default () => {
    return document.documentElement.scrollHeight === document.documentElement.clientHeight;
};