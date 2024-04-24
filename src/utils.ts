export const checkParams = (param: string | number, type: "number" | "string" | "email"): boolean => {
    if(!param) return false;
    switch(type) {
        case "number":
            if(+param < 0 || isNaN(+param)) return false;
            return true;
        case "string":
            return true;
        case "email":
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(param.toString())
        default:
            return false;
    }
}