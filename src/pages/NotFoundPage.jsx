const NotFoundPage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
      }}
    >
      <h2
        style={{
          color: "#191a15",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "16px",
          margin: "0 0 16px 0",
        }}
      >
        🧐 Hmmm... It appears this page does not exist.
      </h2>
      <p
        style={{
          color: "#8a8a89",
          fontSize: "16px",
          lineHeight: "1.5",
          margin: "0",
        }}
      >
        Please return to a valid page using the navigation bar above.
      </p>
    </div>
  );
};

export default NotFoundPage;
