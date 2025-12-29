"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

export default function NotFound() {
  return (
    <div style={styles.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={styles.card}
      >
        {/* Floating 404 */}
        <motion.h1
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={styles.title}
        >
          404
        </motion.h1>

        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.text}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.button}
        >
          Go Home
        </motion.a>
      </motion.div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "system-ui, sans-serif",
  },

  card: {
    textAlign: "center",
    padding: "3rem",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    maxWidth: "420px",
  },

  title: {
    fontSize: "6rem",
    margin: "0",
    fontWeight: 800,
    letterSpacing: "4px",
  },

  subtitle: {
    marginTop: "0.5rem",
    fontSize: "1.8rem",
  },

  text: {
    marginTop: "1rem",
    opacity: 0.85,
    lineHeight: "1.6",
  },

  button: {
    display: "inline-block",
    marginTop: "2rem",
    padding: "0.8rem 1.8rem",
    borderRadius: "999px",
    background: "#fff",
    color: "#0f2027",
    fontWeight: 600,
    textDecoration: "none",
  },
};
