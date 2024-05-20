import { LogSuccess, LogError } from "./logger";

export default async function getVideoFormats(videoUrl: string, format: string): Promise<[]> {
    const apiUrl = "http://descargador-yt.portfolio-ls.online/video/formats";
    try {
const response = await fetch(apiUrl+`?url=${videoUrl}&format=${format}`);
if (!response.ok) {
    LogError("Error al tratar de obtener los formatos del video");
    throw new Error("Error al tratar de obtener los formatos del video");
}
const data = await response.json();
LogSuccess("Éxito al obtener los formatos del video");
return data;
    } catch (err: any) {
        LogError(err.message);
        throw err;
    }
}