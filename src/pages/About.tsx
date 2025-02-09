import React from "react";
import styles from "../styles/pages/About.module.scss";

const About: React.FC = () => {
    return (
        <div className={styles.aboutContainer}>
            <h1>About Us</h1>
            <p>Learn more about our company and values.</p>
        </div>
    );
};

export default About;
