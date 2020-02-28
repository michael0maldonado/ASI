var pathJoin = function (parts) {
    const separator = '/';
    parts = parts.map((part, index) => {
        if (index) {
            part = part.replace(new RegExp('^' + separator), '');
        }
        if (index !== parts.length - 1) {
            part = part.replace(new RegExp(separator + '$'), '');
        }
        return part;
    })
    return parts.join(separator);
}
const requestHandler = (request) => {

    // pull the settings out of the dom
    const data = (document.querySelector("#__ClientContext")).value;
    const appContext = JSON.parse(data);
    appContext.headers = {};
    appContext.headers['RequestVerificationToken'] = (document.querySelector("#__RequestVerificationToken")).value;

    request.url = pathJoin([appContext.baseUrl, request.url]);
    request.headers['RequestVerificationToken'] = appContext.headers['RequestVerificationToken'];
    return request
}

axios.interceptors.request.use(
    request => requestHandler(request)
)
