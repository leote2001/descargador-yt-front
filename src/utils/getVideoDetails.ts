import { LogError, LogSuccess } from "./logger";

export default async function getVideoDetails(videoUrl: string): Promise<{}> {
    const apiUrl = "http://descargador-yt.portfolio-ls.online/video/details";
    try {
        const response = await fetch(apiUrl + `?url=${videoUrl}`, {referrerPolicy: "unsafe-url"});
        if (!response.ok) {
            LogError("Error durante la consulta a la api");
            throw new Error("Error durante la consulta a la api");
        }
        const data = await response.json();
        LogSuccess("Éxito al obtener los detalles del video");
        return data;
    } catch (err: any) {
        LogError(err.message);
        throw err;
    }
}