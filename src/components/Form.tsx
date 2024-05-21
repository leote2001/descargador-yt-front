import { FormEvent, useState } from "react";
import { LogError, LogSuccess } from "../utils/logger";
import getVideoDetails from "../utils/getVideoDetails";
import getVideoFormats from "../utils/getVideoFormats";
import Video from "./Video";
import { VideoContext } from "../contexts/VideoContext";

export default function Form() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [videoDetails, setVideoDetails] = useState<object>({});
    const [videoFormats, setVideoFormats] = useState<any[]>([]);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setVideoDetails({});
        setVideoFormats([]);
        try {
            setLoading(true);
            const details = await getVideoDetails(url);
            const formats = await getVideoFormats(url, "video");
            setVideoDetails(details);
            setVideoFormats(formats);
            LogSuccess("Éxito al obtener details y formats de video");
            setLoading(false);
        } catch (err: any) {
            LogError(err.message);
            setLoading(false);
            setError(err.message);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-element">
                <label htmlFor="url">URL del video</label>
                
                <input placeholder="Pega aquí la URL del video que quieres descargar" autoFocus onChange={(e) => setUrl(e.target.value)} id="url" name="url" required type="text" value={url} />
                </div>
                <button className="form-button-start">Start</button>
            </form>
            <div>
                <VideoContext.Provider
                    value={{ url: [url, setUrl], videoDetails: [videoDetails, setVideoDetails], videoFormats: [videoFormats, setVideoFormats] }}
                >
                    {loading ? <p role="alert">Loading...</p>
                        :
                        !loading && videoFormats.length > 0 &&
                        <Video />
                    }
                    {error && <p className="p-error" role="alert">{error}</p>}
                </VideoContext.Provider>
            </div>


        </>
    )
}