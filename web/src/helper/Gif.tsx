import gif from "../assets/loading.gif";

const Gif = () => {
  return (
    <img
      src={gif}
      style={{
        height: "15vh",
        width: "20vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    />
  );
};

export default Gif;
