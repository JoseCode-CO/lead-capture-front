import { useState } from "react";
import { motion } from "framer-motion";
import s from "./Landing.module.scss";
import LandingLayout from "../../layout/Landing/LandingLayout";
import DisplayLottie from "../../components/UIElements/DisplayLottie/DisplayLottie";
import FormLanding from '../../components/FormLanding/FormLanding';

import Christmas from "../../assets/lottie/christmas.json";
import dogChristmas from "../../assets/KV.png";
import kvMquery1 from "../../assets/KV-mquery1.png";
import kvMquery2 from "../../assets/KV-mquery2.png";

function Landing() {
  const [stateThanks, setStateThanks] = useState(!1);

  return (
    <LandingLayout>
      <div className={`${s.flex} ${s.landingContainer}`}>
        <motion.div
          initial={{ top: "-100%" }}
          whileInView={{ top: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={s.dogChristmas}
        >
          <img src={dogChristmas} alt="Dog christmas" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          viewport={{ once: true }}
          className={s.kvMquery1}
        >
          <img src={kvMquery1} alt="Welcome message" />
        </motion.div>
        <div className={`${s.flex} ${s.formLandingContainer}`}>
          {!stateThanks ? (
            <div className={s.formLandingContent}>
              <h1>
                <span className={s.numberOne}>1.</span>Inscripción punto de
                venta
              </h1>
              <FormLanding callbackApi={(e) => {
                setStateThanks(e);
              }}/>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className={s.thanksContainer}
            >
              <DisplayLottie
                lottieId="christmas-svg"
                addClass={s.christmasSvg}
                animation={Christmas}
              />
              <span>¡Muchas gracias!</span>
            </motion.div>
          )}
        </div>
        <motion.div
          initial={{ bottom: -200, right: -80 }}
          whileInView={{ bottom: -50, right: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className={s.kvMquery2}
        >
          <img src={kvMquery2} alt="Dog christmas" />
        </motion.div>
      </div>
    </LandingLayout>
  );
}

export default Landing;
