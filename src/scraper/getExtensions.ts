import dbClient from "../database/client"

export const getExtensions = async () => {
    const extensions = await dbClient.extension.findMany({});
    return extensions;
}