import VideoJS from "@/components/dashboard/videoPlayer";

const VideoModal = ({ baseUrl, video }) => {
  return (
    <div className="w-screen min-[300px]:w-[20rem]  min-[400px]:w-[25rem] min-[500px]:w-[30rem] md:w-[35rem]" onClick={(e) => e.stopPropagation()}>
      <VideoJS
        options={{
          autoplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [
            {
              src: baseUrl + video,
              type: "video/mp4",
            },
          ],
        }}
      />
    </div>
  );
};

export default VideoModal;
