import { useContext } from "react";
import { SelectFormatos } from "./SelectFormatos";
import { VideoContext} from "../contexts/VideoContext";
export default function Video() {
    const { url } = useContext(VideoContext);
    const { videoDetails } = useContext(VideoContext);
    const { videoFormats } = useContext(VideoContext);
    return (
        <>
                <p><span className="span-titulo">Título:</span> <span className="span-texto-titulo">{videoDetails[0].title}</span></p>
                <p><span className="span-canal">Canal:</span> <span className="span-texto-canal">{videoDetails[0].author.name}</span></p>
                <SelectFormatos videoFormats={videoFormats[0]} videoUrl={url[0]} videoDetails={videoDetails[0]} />
        </>
    )
}