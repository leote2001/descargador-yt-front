/* eslint-disable*/
import { FormEvent, useState, MouseEvent } from "react";
import { downloadWav_Mp3 } from "../utils/downloadWav_Mp3";

export type SelectFormatosProps = {
    videoFormats: any[];
    videoUrl: string;
    videoDetails: any;
}
export function SelectFormatos({ videoFormats, videoUrl, videoDetails }: SelectFormatosProps) {
    let formatsNewArray: any[] = videoFormats.filter((formato, index, self) => {
        return formato.container == "mp4" && self.findIndex(f =>
            f.qualityLabel == formato.qualityLabel) == index
    });
    const [formatoElegido, setFormatoElegido] = useState<string | number>(formatsNewArray[0].itag);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            const formatoFilter = videoFormats.find(formato => formato.itag == formatoElegido);
            const filename = `${videoDetails.title}.${formatoFilter.container}`;
            const video = await fetch(`http://descargador-yt.portfolio-ls.online/video/download?url=${videoUrl}&format=${formatoElegido}`);
            if (!video.ok) {
                throw new Error("Error al descargar video");
            }
            const videoData = await video.blob();
            const urlVideo = URL.createObjectURL(videoData);
            const link = document.createElement("a");
            link.href = urlVideo;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(urlVideo);
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    }
    const wav_mp3 = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            if (e.currentTarget.innerText == "Descargar en formato wav") {
                await downloadWav_Mp3(videoUrl, videoDetails.title, "wav");
            } else {
                await downloadWav_Mp3(videoUrl, videoDetails.title, "mp3");
            }
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>


                <select value={formatoElegido} onChange={(e) => setFormatoElegido(e.target.value)} name="formatos" id="formatos">
                    {formatsNewArray.map((formato) => (
                        <option key={formato.itag} value={formato.itag}>{formato.container} {formato.qualityLabel}</option>
                    ))}
                </select>

                <br />
                <div className="form-buttons-group">
                    <button type="submit">Descargar</button>
                    <button onClick={wav_mp3}>Descargar en formato wav</button>
                    <button onClick={wav_mp3}>Descargar en formato mp3</button>
                </div>
                {loading && <p role="alert">Descargando...</p>}
                {error && <p className="p-error" role="alert">{error}</p>}
            </form>
        </>
    )
}