const defaultHeader = {
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json'
};

const getHeader = {
    'Access-Control-Allow-Origin': '*'
};

const changeDataHeader = {
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json'
};

module.exports = {
    defaultHeader: defaultHeader,
    getHeader: getHeader,
    changeDataHeader: changeDataHeader
}