export const request = async ({
    url = '',
    method = "GET",
    query = {},
    payload = {}
}) => {
    interface IRequestArgs {
        method?: string
        query?: { [key: string]: any }
        payload?:  { [key: string]: any  } | string
    }
    const requestArgs: IRequestArgs = {
        method, 
        query,
    }
    if (method == "POST") requestArgs.payload = typeof(payload) !== "string" ? JSON.stringify(payload) : payload;
    const res = await fetch(url, requestArgs)

    return {status: res.status, data: res.json()}
}