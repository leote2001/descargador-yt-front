export const downloadWav_Mp3 = async (videoUrl: string, title: string, format: string): Promise<void> => {
    const filename = `${title}.${format}`;
try {
const response = await fetch(`http://descargador-yt.portfolio-ls.online/video/wav-mp3?url=${videoUrl}&format=${format}`);
if (!response.ok) {
    throw new Error("Error al descargar");
}
const responseBlob = await response.blob();
const urlBlob = URL.createObjectURL(responseBlob);
const link = document.createElement("a");
link.href=urlBlob;
link.setAttribute("download", filename);
document.body.appendChild(link);
link.click();
URL.revokeObjectURL(urlBlob);
} catch(err: any) {
    throw err;
}
}