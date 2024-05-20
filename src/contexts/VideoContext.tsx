import {createContext} from "react";
export type VideoContextType = {
    url: [any, React.Dispatch<React.SetStateAction<string>>],
    videoDetails: [any, React.Dispatch<React.SetStateAction<{}>>],
    videoFormats: [any, React.Dispatch<React.SetStateAction<any[]>>]
}
export const VideoContext = createContext<VideoContextType>(null!);