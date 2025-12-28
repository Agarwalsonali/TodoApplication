import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo Application</h1>
      <p style={styles.subtitle}>
        Manage your daily tasks efficiently
      </p>

      <div style={styles.buttons}>
                <Link to="/dashboard" style={styles.primaryBtn}>
        Go to Dashboard
        </Link>
        <Link to="/signup" style={styles.secondaryBtn}>Signup</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  title: {
    fontSize: "3rem",
  },
  subtitle: {
    color: "#555",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    gap: "15px",
  },
  primaryBtn: {
    padding: "10px 20px",
    background: "black",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
  },
  secondaryBtn: {
    padding: "10px 20px",
    border: "1px solid black",
    textDecoration: "none",
    borderRadius: "6px",
  },
};
