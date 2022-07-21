import React from "react";
// import dynamic from "next/dynamic";
// import Axios from "axios";
// import ReactPlayer from "react-player";
import ReactHlsPlayer from "react-hls-player/dist";
// const ReactHlsPlayer =
//   global?.window && dynamic(() => import("react-hls-player/dist"), { ssr: false });

const Player = (props) => {
  console.log(props);
  const playerRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [url, setUrl] = React.useState(props.url);

  React.useEffect(() => {
    console.log(playerRef);
    console.log(props.url);
    function fireOnVideoEnd() {
      console.log("ended");
      // forceUpdate();
      setUrl("");
      setTimeout(() => {
        setUrl(props.url);
        // setUrl(
        //   "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
        // );
      }, 1000);
      // setUrl(props.url);
    }
    playerRef.current.addEventListener("ended", fireOnVideoEnd, true);
    console.log(playerRef);
    return playerRef.current.removeEventListener("ended", fireOnVideoEnd);
  }, []);

  console.log(url);
  return (
    <>
      <ReactHlsPlayer
        playerRef={playerRef}
        src={url}
        // src="https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
        autoPlay={true}
        // controls={true}
        // width="100%"
        width="auto"
        height="100%"
        style={{ borderRadius: "9px" }}
        hlsConfig={{
          // autoStartLoad: true,
          // // enableWorker: true,
          // liveBackBufferLength: 10,
          // liveSyncDuration: 2,
          // liveMaxLatencyDuration: 3,
          // // liveDurationInfinity: true,
          // // highBufferWatchdogPeriod: 1,
          // hlsConfig={{
          autoStartLoad: true,
          enableWorker: true,
          // liveBackBufferLength: 5,
          maxBufferLength: 5,
          lowLatencyMode: true,
          liveSyncDuration: 1,
          liveMaxLatencyDuration: 4,
          // liveDurationInfinity: true,
          highBufferWatchdogPeriod: 2,
          // }}
        }}
        muted
      />
    </>
  );
};

export default React.memo(Player);
