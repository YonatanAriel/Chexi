import { FaCompressArrowsAlt } from "react-icons/fa";

function VisualizerButtonOff({ handleBackgroundVideo, screenWidth }) {
  return (
    <FaCompressArrowsAlt
      size={24}
      onClick={handleBackgroundVideo}
      style={{ display: screenWidth < 513 && "none", cursor: "pointer" }}
    />
  );
}
export default VisualizerButtonOff;
