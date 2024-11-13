import { FaExpandArrowsAlt } from "react-icons/fa";

function VisualizerButtonOn({ handleBackgroundVideo, screenWidth }) {
  return (
    <div>
      <FaExpandArrowsAlt
        size={24}
        onClick={handleBackgroundVideo}
        style={{ display: screenWidth < 513 && "none", pointer: "cursor" }}
      />
    </div>
  );
}
export default VisualizerButtonOn;
