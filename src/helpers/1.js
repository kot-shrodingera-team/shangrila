const getReactInstance = (element) => {
    if (element) {
        return element[Object.keys(element).find((key) => key.startsWith('__reactInternalInstance'))];
    }
    return null;
};
const getReactInstance2 = (element) => {
    if (element) {
        return element[Object.keys(element).find((key) => key.startsWith('__reactFiber'))];
    }
    return null;
};

localStorage.getItem("language")