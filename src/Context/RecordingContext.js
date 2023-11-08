import { useState } from 'react'
import { createContext } from 'react';

const RecordingContext = createContext();

const RecordingProvider = ({ children }) => {
    const [recording, setRecording] = useState(true)
    const [room, setRoom] = useState("");

    const startRecording = () => {
        setRecording(!recording);
    }

    const stopRecording = () => {
        setRecording(!recording);
    }

    // const handleChange = (e) => {
    //     setRoom(e.target.value)
    // }
    return (
        <RecordingContext.Provider value={{ recording, startRecording, stopRecording, setRoom, room }}>
            {children}
        </RecordingContext.Provider>
    )
}


export default RecordingProvider;
